import { AwarenessModule } from './types';

export const AWARENESS_MODULES: AwarenessModule[] = [
  {
    id: 'mod-upi',
    slug: 'upi-digital-payments',
    title: 'UPI & Digital Payment Safety',
    category: 'Payments',
    readingTime: '4 min',
    difficulty: 'Beginner',
    summary: 'Master the fundamental rules of UPI. Protect yourself from reverse-charge QR traps, fake refunds, and collect mandate fraud.',
    overview:
      'UPI (Unified Payments Interface) has revolutionized money transfers in India. However, cyber fraudsters exploit misunderstandings about how UPI PINs work. The single most important rule of UPI is: Entering your UPI PIN will ALWAYS send money out of your account; you NEVER enter a PIN to receive or accept incoming money.',
    redFlags: [
      'Buyer insists on paying via QR code and asks you to enter your PIN to "confirm" receipt.',
      'Caller claims you won a cashback or lottery and asks you to click a link or approve a payment collect request.',
      'Fraudster pretends to be from the Indian Army, police, or CISF and asks to use special "defence canteen" UPI portals.',
      'Request to install AnyDesk, RustDesk, or TeamViewer so they can "assist" you in receiving a refund.',
    ],
    defensiveRules: [
      'Remember: UPI PIN is strictly an authorization for debiting (sending) money. Receiving money happens automatically.',
      'Never scan a QR code sent over WhatsApp by an unknown online buyer on OLX, Facebook, or Quikr.',
      'Never approve a "Collect Request" notification unless you are intentionally paying a merchant.',
      'If defrauded, immediately report to Cyber Crime Helpline 1930 and inform your bank to freeze transactions.',
    ],
    realWorldScenario:
      'Rahul listed a camera for sale on OLX for Rs 20,000. A buyer contacted him saying he is an Army Officer and sent a QR code on WhatsApp stating: "Scan this in PhonePe and enter your 6-digit PIN to receive the Rs 20,000 advance." Rahul recognized that PIN is only used for payments, refused, and blocked the scammer.',
    quizzes: [
      {
        id: 'q-upi-1',
        scenario: 'An online buyer on OLX wants to buy your furniture and sends you a QR code to "receive the advance payment into your Google Pay account".',
        question: 'What happens when you scan a QR code and enter your UPI PIN?',
        options: [
          'The money is instantly deposited into your bank account.',
          'Your account is debited, and money is transferred OUT to the sender.',
          'It verifies your phone number with the Reserve Bank of India.',
          'It creates a temporary escrow wallet.',
        ],
        correctIndex: 1,
        explanation:
          'Scanning a QR code and entering your UPI PIN authorizes a withdrawal/debit from your bank account. Entering a PIN is NEVER required to receive money.',
        category: 'upi_fraud',
      },
      {
        id: 'q-upi-2',
        scenario: 'You receive an unexpected SMS saying you won Rs 5,000 Google Pay cashback with a link to "claim your reward".',
        question: 'What is the safest action to take?',
        options: [
          'Click the link and enter your UPI ID and PIN.',
          'Share the link with friends to confirm if it works.',
          'Delete the message; legitimate Google Pay cashbacks appear directly inside the official app without external links.',
          'Reply to the SMS asking for more proof.',
        ],
        correctIndex: 2,
        explanation:
          'Authentic cashbacks from official payment apps are credited automatically into your linked bank account or appear directly within the genuine mobile app. External SMS links are phishing traps.',
        category: 'upi_fraud',
      },
    ],
  },

  {
    id: 'mod-phishing',
    slug: 'phishing-and-links',
    title: 'Phishing Links & Brand Lookalikes',
    category: 'Phishing',
    readingTime: '5 min',
    difficulty: 'Beginner',
    summary: 'Learn how scammers construct lookalike web domains, homoglyph characters, and fake login portals to steal credentials.',
    overview:
      'Phishing is the practice of sending fraudulent communications that appear to come from a reputable source like your bank, tax authority, or courier service. Their goal is to trick you into revealing passwords, PINs, or credit card numbers on fake websites designed to look identical to real ones.',
    redFlags: [
      'Urgent claims that your account will be suspended within 12 or 24 hours if you don\'t click a link immediately.',
      'Domains ending with unusual extensions like .xyz, .top, .click, or .site instead of standard official domains.',
      'Lookalike spellings that substitute letters (e.g., paypa1 instead of paypal, or sbi-kyc-verify.top instead of onlinesbi.sbi).',
      'Requests to input sensitive one-time passwords (OTPs) or PAN numbers on web forms reached via SMS.',
    ],
    defensiveRules: [
      'Always type the official URL directly into your browser or use official mobile banking applications.',
      'Check the address bar: look for the authentic domain name, not just the words preceding it.',
      'Banks will never send links in SMS asking for KYC updates or NetBanking passwords.',
      'When in doubt, call the official customer care number printed on the back of your physical bank card.',
    ],
    realWorldScenario:
      'Sneha received an SMS: "Dear State Bank customer, your account is deactivated due to pending PAN KYC. Click http://sbi-kyc-update.xyz to verify." Sneha noticed the suspicious .xyz extension, did not click, and instead visited her local bank branch where the manager confirmed her account was fully active.',
    quizzes: [
      {
        id: 'q-phish-1',
        scenario: 'You receive an SMS warning that your NetBanking account has been blocked and you must click http://onlinesbi-portal.xyz/login within 24 hours.',
        question: 'What indicator proves this link is suspicious?',
        options: [
          'It ends with .xyz instead of the official bank domain (onlinesbi.sbi or sbi.co.in).',
          'It uses an urgent 24-hour threat to induce panic.',
          'Banks never demand credential entry via SMS links.',
          'All of the above.',
        ],
        correctIndex: 3,
        explanation:
          'All three indicators are classic phishing hallmarks: unofficial disposable domain (.xyz), artificial 24-hour urgency, and SMS credential solicitation.',
        category: 'phishing',
      },
      {
        id: 'q-phish-2',
        scenario: 'You click a link from an email and notice the padlock is present (HTTPS), but the address says "netfl1x-verify.com".',
        question: 'Does the presence of HTTPS (padlock icon) mean the website is safe and authentic?',
        options: [
          'Yes, HTTPS guarantees that the website belongs to Netflix.',
          'No, HTTPS only means communication is encrypted; scammers easily install free SSL certificates on fake domains.',
          'Yes, Google and web browsers block all fake websites with HTTPS.',
          'No, because only banks can have HTTPS.',
        ],
        correctIndex: 1,
        explanation:
          'A common misconception! HTTPS only means the connection between you and the server is encrypted. Anyone can obtain a free SSL certificate for a phishing domain like netfl1x-verify.com.',
        category: 'phishing',
      },
    ],
  },

  {
    id: 'mod-digital-arrest',
    slug: 'digital-arrest-impersonation',
    title: 'Digital Arrest & Coercive Impersonation',
    category: 'Social Engineering',
    readingTime: '4 min',
    difficulty: 'Intermediate',
    summary: 'Understand the mechanics of "Digital Arrest" hoaxes, fake CBI video calls, and how law enforcement actually operates.',
    overview:
      'In recent months, organized cyber syndicates have targeted citizens with "Digital Arrest" scams. Fraudsters call pretending to be police officers, Customs officials (FedEx courier drugs hoax), or CBI investigators. They intimidate victims over Skype or WhatsApp video, claiming their Aadhaar was used in international narcotics trafficking, and order them to transfer funds to a "government verification account".',
    redFlags: [
      'Callers stating you are under "Digital Arrest" and must remain on video call in a locked room.',
      'Show of fake ID cards, arrest warrants with official logos, or staged police station video backgrounds.',
      'Demands that you transfer your entire bank balance or mutual funds into an "RBI verification account" or "escrow account".',
      'Threats that your family will be arrested if you speak to anyone or hang up the call.',
    ],
    defensiveRules: [
      'The Indian Supreme Court, Ministry of Home Affairs, and Police have confirmed: THERE IS NO SUCH THING AS "DIGITAL ARREST" in Indian law.',
      'Real police or government agencies NEVER interrogate citizens over Skype or WhatsApp video calls.',
      'Official agencies will NEVER ask you to transfer funds to any bank account to "verify" their legitimacy.',
      'If you receive such a call: Disconnect immediately, call Helpline 1930, and notify your local police station.',
    ],
    realWorldScenario:
      'A retired teacher received a video call from someone in a police uniform claiming 140g of MDMA narcotics was found in a FedEx parcel sent in his name. The caller demanded he stay in a room on video and transfer Rs 8 lakhs to an RBI verification account. He calmly disconnected the call, contacted his daughter, and reported the number to 1930.',
    quizzes: [
      {
        id: 'q-da-1',
        scenario: 'A caller claiming to be from the Mumbai Police Cyber Cell tells you on a WhatsApp video call that you are under "Digital Arrest" for money laundering.',
        question: 'What is the truth regarding "Digital Arrest" under Indian law?',
        options: [
          'It is a standard legal procedure enacted under the IT Act 2000.',
          'Police can arrest anyone over video call if approved by a magistrate.',
          'There is NO provision called "Digital Arrest" in Indian law; it is 100% a fraudulent extortion scam.',
          'You must stay on the video call until your innocence is verified.',
        ],
        correctIndex: 2,
        explanation:
          'Indian law has zero provision for "Digital Arrest". Police and investigative agencies never conduct arrests or interrogations via WhatsApp or Skype video calls.',
        category: 'impersonation',
      },
    ],
  },

  {
    id: 'mod-fake-jobs',
    slug: 'fake-jobs-and-internships',
    title: 'Fake Jobs & Work-From-Home Task Scams',
    category: 'Recruitment',
    readingTime: '4 min',
    difficulty: 'Beginner',
    summary: 'Recognize Telegram tasks, YouTube video liking schemes, and fraudulent internship offers targeting students and jobseekers.',
    overview:
      'Scammers aggressively target students, freelancers, and homemakers with promises of easy work-from-home earnings. They invite victims to Telegram groups, offer small initial payouts (e.g., Rs 150 for liking videos), and then lure them into investing thousands of rupees into "prepaid VIP tasks" or crypto pools.',
    redFlags: [
      'Unsolicited job offers sent via WhatsApp or Telegram offering Rs 3,000 to Rs 8,000 per day for simple tasks.',
      'Requests to like YouTube videos, rate hotels, or write Google reviews as a full-time job.',
      'Requirement to pay a "refundable security deposit", "registration fee", or "mandatory certificate kit" before joining.',
      'Payments directed to random individual bank accounts rather than corporate payroll systems.',
    ],
    defensiveRules: [
      'Legitimate companies never hire employees or interns through anonymous Telegram handles.',
      'Genuine employers PAY YOU for your work; they never ask you to pay them for "training kits" or "account credentials".',
      'If an offer sounds too good to be true, it is almost certainly a scam.',
    ],
    realWorldScenario:
      'An engineering student received an email congratulating him on selection for a virtual software internship paying Rs 30,000/month. The email instructed him to pay Rs 2,499 for a "mandatory cloud workstation starter pack". Recognizing that authentic internships never charge fees, he reported the email to his university placement cell.',
    quizzes: [
      {
        id: 'q-job-1',
        scenario: 'You are offered a remote internship or job, but the company asks you to pay Rs 1,500 for a "mandatory background check & workstation ID" before releasing your appointment letter.',
        question: 'Should you pay this fee?',
        options: [
          'Yes, because all modern companies charge registration fees.',
          'Yes, as long as they promise it is refundable on your first paycheck.',
          'No, authentic employers never charge candidates money for interviews, ID cards, or background checks.',
          'Pay half now and half later.',
        ],
        correctIndex: 2,
        explanation:
          'Legitimate employers absorb all administrative, interview, and background check costs. Any organization demanding upfront candidate fees is running a recruitment scam.',
        category: 'fake_job',
      },
    ],
  },
];
