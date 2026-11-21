import { RecoveryGuide } from './types';

export const RECOVERY_GUIDES: RecoveryGuide[] = [
  {
    id: 'rec-upi-banking',
    title: 'Financial & UPI Cyber Fraud (Golden Hour Response)',
    category: 'Banking & UPI',
    severity: 'immediate',
    description:
      'If money was unauthorizedly debited from your bank account or you were tricked into approving a UPI collect request, the first 2 hours ("Golden Hour") are critical to freeze funds before syndicates withdraw through mules.',
    first15Minutes: [
      'Call the National Cyber Crime Helpline: DIAL 1930 immediately.',
      'Call your bank\'s 24x7 fraud reporting helpline to block your NetBanking, UPI ID, and Debit Card.',
      'Take screenshots of transaction IDs, the UPI reference number (UTR), and recipient VPA/account details.',
    ],
    stepByStepAction: [
      '1. Dial 1930: Provide transaction date, time, 12-digit UTR number, your bank name, and debit account number. The Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) will send freeze alerts to the recipient bank.',
      '2. File formal complaint on cybercrime.gov.in under "Financial Fraud" within 24 hours to secure your official acknowledgement number.',
      '3. Visit your local home branch with a copy of the cybercrime.gov.in complaint and submit an unauthorized electronic transaction dispute under RBI guidelines (RBI limits customer liability if reported within 3 days).',
      '4. Change your UPI PIN, ATM PIN, and NetBanking password from a secure device.',
    ],
    officialResources: [
      {
        name: 'National Cyber Crime Helpline (India)',
        phone: '1930',
        description: 'Toll-free immediate emergency cyber fraud response operated by I4C (MHA).',
        isIndianAuthority: true,
      },
      {
        name: 'National Cyber Crime Reporting Portal',
        url: 'https://cybercrime.gov.in',
        description: 'Official Government of India portal for filing cybercrime complaints.',
        isIndianAuthority: true,
      },
      {
        name: 'RBI Sachet Portal',
        url: 'https://sachet.rbi.org.in',
        description: 'Reserve Bank of India platform for reporting unauthorized financial entities.',
        isIndianAuthority: true,
      },
    ],
    recoveryChecklist: [
      'Called 1930 within the Golden Hour',
      'Blocked affected debit card & NetBanking',
      'Filed complaint on cybercrime.gov.in',
      'Submitted written dispute letter to home branch with UTR number',
      'Updated all authentication PINs and passwords',
    ],
  },

  {
    id: 'rec-compromised-email',
    title: 'Compromised Primary Email Account',
    category: 'Identity & Accounts',
    severity: 'immediate',
    description:
      'Your email is the master key to your digital identity. Attackers with access to your email can trigger password resets for your bank, social accounts, and cloud storage.',
    first15Minutes: [
      'Attempt to log in from a trusted device and select "Forgot Password" or recovery flow.',
      'If logged in, immediately go to Security Settings and click "Sign out of all other sessions/devices".',
      'Change your password to a strong, unique passphrase (16+ characters).',
      'Check for unauthorized forwarding rules or auto-reply filters created by the attacker to intercept security emails.',
    ],
    stepByStepAction: [
      '1. Enable Two-Factor Authentication (2FA) using an Authenticator app (Google Authenticator, Microsoft Authenticator) or security hardware key. Remove SMS 2FA if SIM-swap is suspected.',
      '2. Inspect Account Permissions: In Google or Microsoft Account Settings, revoke access for any third-party apps or OAuth integrations you do not recognize.',
      '3. Audit Email Forwarding: In Gmail/Outlook Settings > Forwarding, ensure your emails are not being secretly forwarded to an attacker\'s inbox.',
      '4. Notify Key Contacts: Inform family, colleagues, and your employer if the attacker sent emails pretending to be you requesting emergency money.',
    ],
    officialResources: [
      {
        name: 'Google Account Recovery',
        url: 'https://accounts.google.com/signin/recovery',
        description: 'Official automated recovery flow for Google and Gmail accounts.',
      },
      {
        name: 'Microsoft Account Recovery',
        url: 'https://account.live.com/acsr',
        description: 'Official recovery form for Microsoft, Outlook, and Hotmail accounts.',
      },
    ],
    recoveryChecklist: [
      'Logged out all active sessions on other devices',
      'Updated primary email password to a strong, unique phrase',
      'Removed unauthorized email forwarding and filter rules',
      'Enabled Authenticator app 2FA',
      'Revoked untrusted third-party apps',
    ],
  },

  {
    id: 'rec-remote-desktop',
    title: 'Tricked into Installing Remote App (AnyDesk / RustDesk / QuickSupport)',
    category: 'Device Security',
    severity: 'immediate',
    description:
      'If a fake customer support agent or scammer persuaded you to download a remote access tool or an unknown APK file, they can view your screen and potentially control your device.',
    first15Minutes: [
      'Disconnect your phone or computer from Wi-Fi and Mobile Data immediately (turn on Airplane Mode).',
      'Uninstall the remote application immediately: Go to Settings > Apps and uninstall AnyDesk, TeamViewer, RustDesk, QuickSupport, or any recently downloaded APK.',
    ],
    stepByStepAction: [
      '1. Cut Network: Turning off Wi-Fi and mobile data immediately severs the attacker\'s active screen-share and remote control tunnel.',
      '2. Uninstall Suspicious Tools: Long press and uninstall any application installed right before or during the incident.',
      '3. Audit Accessibility Services: On Android, go to Settings > Accessibility > Installed Apps. Ensure no app has permission to read your screen or perform automated clicks.',
      '4. Change Banking Credentials from a DIFFERENT Clean Device: Since your phone may have captured keystrokes, use a family member\'s computer or secure tablet to immediately change your NetBanking and email passwords.',
    ],
    officialResources: [
      {
        name: 'DoT Sanchar Saathi (Chakshu Portal)',
        url: 'https://sancharsaathi.gov.in',
        description: 'Department of Telecommunications platform to report fraudulent callers and suspicious WhatsApp numbers.',
        isIndianAuthority: true,
      },
    ],
    recoveryChecklist: [
      'Turned on Airplane mode to disconnect remote session',
      'Uninstalled AnyDesk / TeamViewer / suspicious APKs',
      'Audited Android Accessibility permissions',
      'Changed banking passwords from a separate, clean device',
      'Reported caller number to DoT Chakshu and 1930',
    ],
  },

  {
    id: 'rec-social-media',
    title: 'Hacked or Impersonated Social Media Account',
    category: 'Social Media',
    severity: 'high',
    description:
      'Attackers who hijack Instagram, Facebook, or WhatsApp accounts frequently message friends claiming medical emergencies or offering fake crypto investment advice.',
    first15Minutes: [
      'Open the official app on your primary mobile phone and try the verified self-recovery flow.',
      'Post a public story or status from an alternate channel (or via friends) alerting your contacts: "My account is compromised, do not send money or click links from me."',
    ],
    stepByStepAction: [
      '1. Instagram/Facebook Recovery: Visit instagram.com/hacked or facebook.com/hacked to initiate identity verification (including video selfie verification).',
      '2. WhatsApp Hijack: If your WhatsApp was registered on another device via stolen OTP, simply log in again with your phone number and enter the new SMS OTP. This will instantly kick the scammer off their device. Enable WhatsApp Two-Step Verification (6-digit PIN) immediately.',
      '3. File Report: If the attacker is extorting money or impersonating you for sexual harassment, submit a complaint under "Cyber Crime against Women/Children" on cybercrime.gov.in.',
    ],
    officialResources: [
      {
        name: 'Instagram Hacked Account Support',
        url: 'https://instagram.com/hacked',
        description: 'Official Meta self-service portal for recovering compromised Instagram accounts.',
      },
      {
        name: 'Facebook Hacked Assistance',
        url: 'https://facebook.com/hacked',
        description: 'Official Meta security portal to secure hijacked profiles.',
      },
      {
        name: 'National Cyber Crime Reporting Portal',
        url: 'https://cybercrime.gov.in',
        description: 'For severe extortion, identity impersonation, or defamatory misuse.',
        isIndianAuthority: true,
      },
    ],
    recoveryChecklist: [
      'Warned contacts via friends/status not to send money',
      'Initiated official recovery at instagram.com/hacked or facebook.com/hacked',
      'Re-verified WhatsApp and set 2-Step Verification PIN',
      'Preserved screenshots of extortion threats for evidence',
    ],
  },
];
