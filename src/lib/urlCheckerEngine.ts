import { UrlCheckResult, RiskClassification, Indicator } from './types';
import { generateReferenceId } from './utils';

// High-profile targeted brands frequently spoofed in phishing scams
const BRAND_TARGETS: Record<string, string[]> = {
  sbi: ['sbi', 'statebank', 'onlinesbi'],
  hdfc: ['hdfc', 'hdfcbank'],
  icici: ['icici', 'icicibank'],
  paytm: ['paytm'],
  phonepe: ['phonepe'],
  googlepay: ['gpay', 'googlepay'],
  amazon: ['amazon', 'amzn'],
  paypal: ['paypal'],
  netflix: ['netflix'],
  microsoft: ['microsoft', 'office365', 'outlook'],
  apple: ['apple', 'icloud', 'applestore'],
  fedex: ['fedex'],
  india_post: ['indiapost', 'indiapostgov'],
  discom: ['electricity', 'bijlibill', 'powerbill'],
};

// Known high-risk, low-cost TLDs frequently abused by phishing kits
const HIGH_RISK_TLDS = new Set([
  'xyz',
  'top',
  'click',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
  'buzz',
  'surf',
  'rest',
  'icu',
  'work',
  'bar',
  'fit',
  'skin',
  'live',
  'cam',
  'quest',
  'download',
  'racing',
  'loan',
]);

// Homoglyph map: Latin lookalikes from Cyrillic / Greek
const HOMOGLYPH_MAP: Record<string, string> = {
  'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'ѕ': 's', 'х': 'x', 'у': 'y',
  'і': 'i', 'ј': 'j', 'ӏ': 'l', 'α': 'a', 'ο': 'o', 'ν': 'v', 'ω': 'w',
};

// Calculate Shannon entropy of domain string to detect algorithmically generated domains (DGA)
function calculateEntropy(str: string): number {
  if (!str) return 0;
  const len = str.length;
  const freqs: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const c = str[i];
    freqs[c] = (freqs[c] || 0) + 1;
  }
  let entropy = 0;
  for (const c in freqs) {
    const p = freqs[c] / len;
    entropy -= p * Math.log2(p);
  }
  return parseFloat(entropy.toFixed(2));
}

// Check for Private IP (SSRF protection test)
function isPrivateOrReservedIP(hostname: string): boolean {
  // IPv4 Private & Reserved Ranges:
  // 127.0.0.0/8 (Loopback)
  // 10.0.0.0/8
  // 172.16.0.0/12
  // 192.168.0.0/16
  // 169.254.0.0/16 (Link Local / Cloud Metadata)
  // 0.0.0.0, localhost
  if (hostname === 'localhost' || hostname === '::1' || hostname === '0.0.0.0') {
    return true;
  }
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = hostname.match(ipv4Regex);
  if (!match) return false;

  const [_, a, b, _c, _d] = match.map(Number);
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 169 && b === 254) return true; // AWS/GCP metadata address
  return false;
}

export function analyzeUrl(inputUrl: string): UrlCheckResult {
  const trimmed = (inputUrl || '').trim();

  // Normalize URL schema for parsing
  let parsedUrl: URL | null = null;
  let hasHttps = false;
  let normalizedInput = trimmed;

  if (!/^https?:\/\//i.test(normalizedInput)) {
    // If user entered bare domain or ip, default to http for structural parsing
    normalizedInput = 'http://' + normalizedInput;
  }

  try {
    parsedUrl = new URL(normalizedInput);
    hasHttps = parsedUrl.protocol.toLowerCase() === 'https:';
  } catch {
    // Fallback if URL constructor fails
    return {
      id: generateReferenceId(),
      created_at: new Date().toISOString(),
      submitted_url: trimmed,
      extracted_domain: 'Invalid URL Format',
      risk_level: 'UNABLE_TO_DETERMINE',
      risk_score: 5,
      domain_details: {
        has_https: false,
        is_ip_address: false,
        has_punycode: false,
        suspicious_tld: false,
        subdomain_depth: 0,
        entropy: 0,
      },
      indicators: [
        {
          name: 'Malformed URL Syntax',
          description:
            'The provided string could not be parsed as a standard web URI or domain.',
          severity: 'low',
        },
      ],
      explanation:
        'The input does not conform to standard URL format. Please paste a full web address (e.g., https://example.com/path).',
      precautions: ['Verify the link spelling carefully before interacting with it.'],
      provider_coverage: 'Structural URI Parser (Offline)',
      verification_limitations: [
        'Could not evaluate malformed address.',
        'Never click corrupted or obfuscated links.',
      ],
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const pathname = parsedUrl.pathname;
  const indicators: Indicator[] = [];
  let score = 0;

  // 1. SSRF & Internal IP Check
  const isPrivate = isPrivateOrReservedIP(hostname);
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

  if (isPrivate) {
    indicators.push({
      name: 'Internal Network / Private Resource Address',
      description: `Target resolves to a loopback or local private subnet address (${hostname}). This is typical of Server-Side Request Forgery (SSRF) testing or private intranets. CyberShield strictly refuses to query internal networks.`,
      severity: 'high',
      matchedText: hostname,
    });
    score += 65;
  } else if (isIp) {
    indicators.push({
      name: 'Raw IP Address in URL',
      description:
        'Legitimate public services use branded domain names. Attackers often use direct IP addresses to evade domain-based reputation filters and blocklists.',
      severity: 'high',
      matchedText: hostname,
    });
    score += 45;
  }

  // 2. Punycode & Homoglyph Lookalike Attack Check
  const hasPunycode = hostname.startsWith('xn--') || hostname.includes('.xn--');
  let hasHomoglyph = false;
  let normalizedHomoglyphs = '';

  for (let i = 0; i < hostname.length; i++) {
    const ch = hostname[i];
    if (HOMOGLYPH_MAP[ch]) {
      hasHomoglyph = true;
      normalizedHomoglyphs += HOMOGLYPH_MAP[ch];
    } else {
      normalizedHomoglyphs += ch;
    }
  }

  if (hasPunycode) {
    indicators.push({
      name: 'Punycode Internationalized Domain (IDN)',
      description:
        'Domain contains Punycode ("xn--"). While IDN allows non-Latin scripts, it is commonly weaponized in Internationalized Domain Name (IDN) homograph attacks to impersonate famous brands with visually identical characters.',
      severity: 'high',
      matchedText: hostname,
    });
    score += 40;
  }

  if (hasHomoglyph) {
    indicators.push({
      name: 'Deceptive Lookalike Characters (Homoglyphs)',
      description: `Domain contains non-Latin Unicode characters that visually imitate standard Latin letters (e.g. Cyrillic "а" or "о"). Canonical equivalent: ${normalizedHomoglyphs}`,
      severity: 'high',
      matchedText: hostname,
    });
    score += 45;
  }

  // 3. Subdomain Depth & Masking
  const domainParts = hostname.split('.');
  const subdomainDepth = domainParts.length;
  if (subdomainDepth > 4) {
    indicators.push({
      name: 'Excessive Subdomain Stacking',
      description: `Domain has ${subdomainDepth} levels of subdomains. Scammers frequently stack names (e.g., "bank.login.verify.account.xyz.com") so on mobile screens only the trusted first words appear visible.`,
      severity: 'medium',
      matchedText: hostname,
    });
    score += 25;
  }

  // 4. Suspicious / Abused TLD
  const tld = domainParts[domainParts.length - 1];
  const isSuspiciousTld = HIGH_RISK_TLDS.has(tld);
  if (isSuspiciousTld) {
    indicators.push({
      name: `High-Risk Top-Level Domain (.${tld})`,
      description: `The top-level domain .${tld} has a statistically elevated frequency of phishing and malware registrations due to low registration barriers and lax registrar vetting.`,
      severity: 'medium',
      matchedText: `.${tld}`,
    });
    score += 25;
  }

  // 5. Brand Impersonation / Keyword Squatting
  let lookalikeTarget: string | undefined;
  for (const [brand, keywords] of Object.entries(BRAND_TARGETS)) {
    for (const kw of keywords) {
      if (hostname.includes(kw)) {
        // Check if it's the genuine domain or a squatting attempt
        const isOfficial =
          hostname === `${kw}.com` ||
          hostname === `${kw}.in` ||
          hostname === `${kw}.org` ||
          hostname === `www.${kw}.com` ||
          hostname === `www.${kw}.in`;

        if (!isOfficial) {
          lookalikeTarget = brand;
          indicators.push({
            name: `Brand Name Targeted: ${brand.toUpperCase()}`,
            description: `The URL contains the brand keyword "${kw}" embedded inside an unofficial domain structure (${hostname}). This is a classic hallmark of credential harvesting phishing portals.`,
            severity: 'high',
            matchedText: kw,
          });
          score += 45;
          break;
        }
      }
    }
    if (lookalikeTarget) break;
  }

  // 6. Entropy Check
  const entropy = calculateEntropy(domainParts[0] || '');
  if (entropy > 3.8 && domainParts[0].length > 10) {
    indicators.push({
      name: 'High Entropy Domain Name (DGA Signature)',
      description: `The domain name exhibits abnormally high character randomness (Shannon entropy: ${entropy}). This often indicates Domain Generation Algorithms (DGA) used by malicious command & control or disposable phishing infrastructure.`,
      severity: 'medium',
      matchedText: domainParts[0],
    });
    score += 20;
  }

  // 7. HTTP vs HTTPS
  if (!hasHttps && !isPrivate) {
    indicators.push({
      name: 'Unencrypted HTTP Connection',
      description:
        'The link uses unencrypted plain-text HTTP. Any credentials or personal data entered can be intercepted in transit by attackers on the same network.',
      severity: 'low',
      matchedText: 'http://',
    });
    score += 15;
  }

  // 8. Path-based Red Flags
  const suspiciousPathPatterns = [
    /login/i,
    /signin/i,
    /verify/i,
    /kyc/i,
    /banking/i,
    /update-pan/i,
    /wallet/i,
    /\.apk$/i,
    /\.exe$/i,
  ];
  for (const pat of suspiciousPathPatterns) {
    if (pat.test(pathname)) {
      indicators.push({
        name: `High-Risk Action Path: "${pathname}"`,
        description:
          'Path targets sensitive actions (login, KYC, APK download) on an unverified domain.',
        severity: 'medium',
        matchedText: pathname,
      });
      score += 20;
      break;
    }
  }

  // Final score clamping
  const finalScore = Math.min(Math.max(score, 5), 100);

  // Classification
  let riskLevel: RiskClassification = 'LOW_RISK';
  if (finalScore >= 60) {
    riskLevel = 'HIGH_RISK';
  } else if (finalScore >= 25) {
    riskLevel = 'MEDIUM_RISK';
  } else {
    riskLevel = 'LOW_RISK';
  }

  // Explanations and Precautions
  let explanation = '';
  const precautions: string[] = [];

  if (riskLevel === 'HIGH_RISK') {
    explanation = `High risk detected. This URL displays deceptive domain patterns, brand impersonation (${lookalikeTarget || 'targeted service'}), lookalike characters, or raw IP routing typical of phishing campaigns.`;
    precautions.push('DO NOT open this link or enter passwords, phone numbers, or credit card details.');
    precautions.push('Never download executable files (.apk, .exe, .zip) hosted at this address.');
    precautions.push('If you received this link via SMS or email, report the message as spam.');
  } else if (riskLevel === 'MEDIUM_RISK') {
    explanation = `Moderate risk. While no definitive active blocklist hit was recorded, structural anomalies (unusual TLD, deep subdomain nesting, or lack of HTTPS) suggest exercising significant caution.`;
    precautions.push('Verify the domain spelling character-by-character before proceeding.');
    precautions.push('Access the service via its known official portal or app store rather than clicking this link.');
  } else {
    explanation = `Low structural risk identified. The domain structure does not exhibit blatant lookalike homoglyphs, IP literal masking, or excessive subdomain manipulation.`;
    precautions.push('Always check that your browser displays a valid SSL padlock.');
    precautions.push('Verify that you are on the authentic brand domain before typing passwords.');
  }

  const verificationLimitations = [
    'Static structural analysis checks domain composition, homoglyphs, entropy, and protocol flags without navigating the target.',
    'For strict security against Server-Side Request Forgery (SSRF) and malicious exploits, CyberShield does not execute remote JavaScript or trigger backend page downloads.',
    'A newly registered domain may not yet have reputation telemetry. The absence of red flags is not proof of absolute safety.',
  ];

  return {
    id: generateReferenceId(),
    created_at: new Date().toISOString(),
    submitted_url: trimmed,
    extracted_domain: hostname,
    risk_level: riskLevel,
    risk_score: finalScore,
    domain_details: {
      has_https: hasHttps,
      is_ip_address: isIp,
      has_punycode: hasPunycode,
      suspicious_tld: isSuspiciousTld,
      subdomain_depth: subdomainDepth,
      lookalike_target: lookalikeTarget,
      entropy: entropy,
    },
    indicators: indicators,
    explanation,
    precautions,
    provider_coverage:
      'Punycode Homoglyph Engine • RFC1918 SSRF Guard • Structural Lexical Analysis (Zero-Visit Backend)',
    verification_limitations: verificationLimitations,
  };
}
