import {
  ScamAnalysisResult,
  RiskClassification,
  ScamCategory,
  ConfidenceLevel,
  Indicator,
} from './types';
import { generateReferenceId } from './utils';

interface RuleDefinition {
  id: string;
  name: string;
  category: ScamCategory;
  severity: 'low' | 'medium' | 'high';
  weight: number;
  patterns: RegExp[];
  description: string;
  evidenceExtract: (text: string) => string | null;
}

const DETECTION_RULES: RuleDefinition[] = [
  // 1. UPI FRAUD RULES
  {
    id: 'upi-pin-to-receive',
    name: 'Reverse-Charge UPI PIN Deception',
    category: 'upi_fraud',
    severity: 'high',
    weight: 45,
    patterns: [
      /(enter|type|input|fill).*(pin|upi\s*pin).*(receive|credit|accept|get\s*money)/i,
      /(scan|open).*(qr|qr\s*code).*(receive|accept|credit|get\s*money)/i,
      /(approve|accept).*(request|collect).*(receive|get\s*payment)/i,
      /canteen.*portal.*upi/i,
    ],
    description:
      'Crucial UPI Rule: Entering your UPI PIN is ONLY used to SEND money from your bank, NEVER to receive money. Any person asking you to enter a PIN or scan a QR code to "receive" funds is attempting fraud.',
    evidenceExtract: (text) => {
      const match = text.match(/(enter|scan|approve)[^.!?\n]*(pin|qr|collect)[^.!?\n]*(receive|credit|payment|money)?/i);
      return match ? match[0].trim() : null;
    },
  },

  // 2. DIGITAL ARREST / COERCIVE IMPERSONATION
  {
    id: 'digital-arrest-coercion',
    name: 'Digital Arrest & Law Enforcement Hoax',
    category: 'impersonation',
    severity: 'high',
    weight: 50,
    patterns: [
      /digital\s*arrest/i,
      /(cbi|crime\s*branch|customs|narcotics|police).*(seized|arrest|warrant|interrogation)/i,
      /(parcel|courier).*(customs|drugs|mdma|narcotics|contraband|taiwan)/i,
      /(locked\s*room|stay\s*on\s*(video|call)|do\s*not\s*disconnect)/i,
      /(escrow\s*account|rbi\s*verification\s*account|safe\s*government\s*account)/i,
    ],
    description:
      'The Indian Supreme Court, Police, CBI, and Customs have repeatedly confirmed that there is NO legal provision called "Digital Arrest". No official agency will ever interrogate you over Skype/WhatsApp video or demand money transfers to "verify" your funds.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(digital\s*arrest|cbi|narcotics|escrow|locked\s*room)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 3. URGENT UTILITY / POWER DISCONNECTION
  {
    id: 'utility-disconnection',
    name: 'Urgent Utility / Electricity Disconnection Threat',
    category: 'urgent_payment',
    severity: 'high',
    weight: 40,
    patterns: [
      /electricity.*(disconnected|suspended|cut\s*off).*(tonight|today|9:30|immediate|hours)/i,
      /call.*(electricity\s*officer|discom|power\s*station)/i,
      /(bill\s*not\s*updated|previous\s*month\s*bill).*(disconnect)/i,
    ],
    description:
      'Utility providers (Discoms) never send disconnection threats demanding calls to personal 10-digit mobile numbers or urgent APK downloads. Formal notice by post or registered billing accounts is always required.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(electricity|disconnected|power\s*station|officer)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 4. FAKE JOB / TELEGRAM TASK FRAUD
  {
    id: 'job-task-scam',
    name: 'Part-Time Task & Telegram Recruitment Trap',
    category: 'fake_job',
    severity: 'high',
    weight: 38,
    patterns: [
      /(like\s*youtube\s*videos|like\s*videos|hotel\s*reviews|google\s*map\s*reviews)/i,
      /(daily\s*(income|salary|earnings)).*(2000|3000|5000|8000|10000)/i,
      /(work\s*from\s*(home|mobile)).*(telegram|whatsapp)/i,
      /(refundable\s*deposit|security\s*deposit|registration\s*fee).*(joining|portal|credential)/i,
      /vip\s*(group|task|order)/i,
    ],
    description:
      'Legitimate employers never hire candidates via anonymous Telegram channels to "like videos" or require upfront deposits/registration fees to unlock pay.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(like\s*youtube|telegram|security\s*deposit|daily\s*(salary|earning))[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 5. BANK KYC & ACCOUNT SUSPENSION PHISHING
  {
    id: 'bank-kyc-phishing',
    name: 'Urgent KYC Suspension & Fake Verification Link',
    category: 'phishing',
    severity: 'high',
    weight: 42,
    patterns: [
      /(kyc|pan\s*card|aadhaar).*(blocked|suspended|deactivated|expire|24\s*hours|12\s*hours)/i,
      /(netbanking|debit\s*card|atm\s*card).*(blocked|suspended).*(click|verify|update)/i,
      /(http:\/\/|https:\/\/)[^\s]+(\.xyz|\.top|\.tk|\.info|\.me|\.online|\.site)[^\s]*/i,
    ],
    description:
      'Banks will never send links asking you to input passwords, OTPs, or PAN numbers via SMS or unofficial domains. Authentic banks only update KYC in-branch or inside official mobile banking apps.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(kyc|pan|blocked|suspended|netbanking)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 6. FAKE INTERNSHIP WITH MANDATORY KIT / FEE
  {
    id: 'fake-internship-kit',
    name: 'Internship Placement with Mandatory Fees',
    category: 'fake_internship',
    severity: 'medium',
    weight: 28,
    patterns: [
      /(virtual|remote)\s*internship.*(shortlisted|selected)/i,
      /(purchase|buy|pay).*(mandatory|certificate|workstation|kit|seat).*(confirm|fee)/i,
    ],
    description:
      'Reputable internships pay you a stipend; they never demand candidate fees or workstation purchases as a prerequisite for selection.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(internship|shortlisted|mandatory|workstation|kit)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 7. REMOTE DESKTOP / FAKE TECH SUPPORT
  {
    id: 'remote-desktop-trap',
    name: 'Remote Access / Screen Sharing Tool Request',
    category: 'fake_support',
    severity: 'high',
    weight: 42,
    patterns: [
      /(install|download).*(anydesk|teamviewer|rustdesk|quicksupport|zoho\s*assist)/i,
      /(share\s*screen|remote\s*access).*(bank|refund|kyc|support)/i,
    ],
    description:
      'Scammers instruct victims to install remote desktop tools like AnyDesk or RustDesk to secretly view OTPs and bank credentials entered on your device.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(anydesk|teamviewer|rustdesk|quicksupport|share\s*screen)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 8. LOTTERY & CONTEST PRIZES
  {
    id: 'lottery-prize-fee',
    name: 'Unsolicited Prize / Lucky Draw Advance Fee',
    category: 'lottery_prize',
    severity: 'high',
    weight: 35,
    patterns: [
      /(congratulations|lucky\s*draw|kbc|cheque).*(won|winner|lakhs|crore)/i,
      /(claim\s*prize|processing\s*fee|clearance\s*charge|tax\s*amount).*(deposit|transfer)/i,
    ],
    description:
      'Legitimate lotteries and contests do not require winners to send upfront processing fees or taxes to personal accounts to claim a payout.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(congratulations|lucky\s*draw|winner|processing\s*fee)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 9. HIGH-RETURN INVESTMENT / CRYPTO SCAM
  {
    id: 'investment-doubler',
    name: 'Guaranteed Unrealistic Investment Returns',
    category: 'investment_scam',
    severity: 'high',
    weight: 36,
    patterns: [
      /(guaranteed\s*(return|profit)|100%\s*return|double\s*your\s*money)/i,
      /(crypto\s*pool|forex\s*trading\s*vip|arbitrage).*(daily\s*returns)/i,
    ],
    description:
      'No genuine regulated financial product can guarantee high fixed daily or monthly returns without risk. Unregulated investment groups are overwhelmingly Ponzi schemes.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(guaranteed|100%|crypto|forex|double)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },

  // 10. SOCIAL ENGINEERING / PSYCHOLOGICAL PRESSURE
  {
    id: 'high-pressure-deadline',
    name: 'Extreme Urgency & Psychological Coercion',
    category: 'social_engineering',
    severity: 'medium',
    weight: 22,
    patterns: [
      /(immediately|urgent|within\s*(\d+|one|two)\s*(hours|minutes)|deadline|final\s*notice)/i,
      /(do\s*not\s*tell\s*anyone|keep\s*confidential|strictly\s*secret)/i,
      /(avoid\s*legal\s*action|police\s*case\s*will\s*be\s*filed)/i,
    ],
    description:
      'Scammers deliberately create time pressure to prevent you from taking a step back, consulting family, or verifying facts with your bank or authorities.',
    evidenceExtract: (text) => {
      const match = text.match(/[^.!?\n]*(urgent|immediately|within\s*\d+|confidential|legal\s*action)[^.!?\n]*/i);
      return match ? match[0].trim() : null;
    },
  },
];

export function analyzeMessage(
  inputText: string,
  inputType: 'text' | 'screenshot' | 'email' | 'sms_whatsapp' = 'text'
): ScamAnalysisResult {
  const trimmed = (inputText || '').trim();

  // Baseline validation: Check for empty or too short text
  if (trimmed.length < 15) {
    return {
      id: generateReferenceId(),
      created_at: new Date().toISOString(),
      input_type: inputType,
      content_preview: trimmed || '(Empty message)',
      risk_level: 'UNABLE_TO_DETERMINE',
      risk_score: 10,
      scam_category: 'other',
      confidence: 'Low',
      indicators: [
        {
          name: 'Insufficient Information',
          description:
            'The submitted text is too short or lacks sufficient context to conduct a reliable pattern analysis.',
          severity: 'low',
        },
      ],
      explanation:
        'We could not reliably classify this content because it contains too few characters or words. Please paste the full text of the message, email, or conversation for a thorough check.',
      evidence: [],
      recommended_actions: [
        'Provide the complete message or include sender details and surrounding sentences.',
        'If this was an image, ensure the text extracted by OCR was complete and readable.',
      ],
      limitations: [
        'Short fragments, isolated codes, or single words cannot be classified accurately.',
        'The absence of detectable scam words does not imply the message is genuine.',
      ],
    };
  }

  const detectedIndicators: Indicator[] = [];
  const extractedEvidence: string[] = [];
  let totalScore = 0;
  const categoryCounts: Record<ScamCategory, number> = {
    phishing: 0,
    fake_job: 0,
    fake_internship: 0,
    impersonation: 0,
    urgent_payment: 0,
    upi_fraud: 0,
    fake_support: 0,
    lottery_prize: 0,
    investment_scam: 0,
    account_verification: 0,
    social_engineering: 0,
    other: 0,
  };

  // Evaluate against detection rules
  for (const rule of DETECTION_RULES) {
    let matched = false;
    for (const pattern of rule.patterns) {
      if (pattern.test(trimmed)) {
        matched = true;
        break;
      }
    }

    if (matched) {
      const snippet = rule.evidenceExtract(trimmed);
      if (snippet && !extractedEvidence.includes(snippet)) {
        extractedEvidence.push(snippet);
      }

      detectedIndicators.push({
        name: rule.name,
        description: rule.description,
        severity: rule.severity,
        matchedText: snippet || undefined,
      });

      totalScore += rule.weight;
      categoryCounts[rule.category] = (categoryCounts[rule.category] || 0) + 1;
    }
  }

  // Cap score at 100
  const finalScore = Math.min(Math.max(totalScore, 5), 100);

  // Determine Primary Category
  let primaryCategory: ScamCategory = 'other';
  let maxCatCount = 0;
  for (const [cat, count] of Object.entries(categoryCounts)) {
    if (count > maxCatCount) {
      maxCatCount = count;
      primaryCategory = cat as ScamCategory;
    }
  }

  // Determine Risk Classification
  let riskLevel: RiskClassification = 'LOW_RISK';
  if (finalScore >= 60) {
    riskLevel = 'HIGH_RISK';
  } else if (finalScore >= 25) {
    riskLevel = 'MEDIUM_RISK';
  } else {
    riskLevel = 'LOW_RISK';
  }

  // Determine Confidence
  let confidence: ConfidenceLevel = 'Medium';
  if (detectedIndicators.length >= 2 || finalScore >= 70) {
    confidence = 'High';
  } else if (detectedIndicators.length === 1) {
    confidence = 'Medium';
  } else {
    confidence = 'Low';
  }

  // Build Explanations & Next Actions
  let explanation = '';
  const recommendedActions: string[] = [];

  if (riskLevel === 'HIGH_RISK') {
    explanation = `High probability of malicious scam activity detected. This message exhibits critical red flags associated with ${primaryCategory.replace(
      '_',
      ' '
    )}, such as artificial urgency, coercion, reverse-charge payment traps, or deceptive impersonation.`;

    recommendedActions.push(
      'Do NOT send money, scan QR codes, or enter your UPI PIN under any circumstances.'
    );
    recommendedActions.push(
      'Do NOT click any web links or install requested applications (such as AnyDesk or APK files).'
    );
    recommendedActions.push(
      'Block and report the sender immediately inside WhatsApp, SMS, or your email client.'
    );
    recommendedActions.push(
      'If you have already transferred funds, immediately call the National Cyber Crime Helpline at 1930 and inform your bank.'
    );
  } else if (riskLevel === 'MEDIUM_RISK') {
    explanation = `Moderate risk detected. While this message does not match known acute fraud templates, it contains suspicious phrasing, pressure tactics, or unverified claims that warrant extreme caution.`;

    recommendedActions.push(
      'Verify the request independently by visiting the official website or dialing customer care from your bank card.'
    );
    recommendedActions.push(
      'Never share one-time passwords (OTPs), PINs, or confidential personal information.'
    );
    recommendedActions.push(
      'Consult a family member or knowledgeable colleague before taking any action.'
    );
  } else {
    explanation = `Low risk detected based on standard scam heuristics. We did not identify urgent coercion, reverse-payment requests, or known phishing signatures in the text.`;

    recommendedActions.push(
      'Still exercise general caution with links and unexpected attachments.'
    );
    recommendedActions.push(
      'Always confirm sender addresses and domain names before sharing sensitive information.'
    );
  }

  // Mandatory Transparency Limitations
  const limitations = [
    'Automated heuristics analyze common language patterns and known scam templates; they cannot verify the physical identity or background of the sender.',
    'Scammers constantly modify phrasing and brand targets. The absence of detected indicators does NOT guarantee safety.',
    'Always use independent official channels to verify financial or administrative requests.',
  ];

  return {
    id: generateReferenceId(),
    created_at: new Date().toISOString(),
    input_type: inputType,
    content_preview: trimmed.slice(0, 150) + (trimmed.length > 150 ? '...' : ''),
    risk_level: riskLevel,
    risk_score: finalScore,
    scam_category: primaryCategory,
    confidence: confidence,
    indicators: detectedIndicators,
    explanation,
    evidence: extractedEvidence,
    recommended_actions: recommendedActions,
    limitations,
  };
}
