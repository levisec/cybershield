export interface SyntheticExample {
  id: string;
  category: string;
  title: string;
  tag: string;
  text: string;
  expectedRisk: 'HIGH_RISK' | 'MEDIUM_RISK' | 'LOW_RISK';
}

export const SYNTHETIC_SCAM_EXAMPLES: SyntheticExample[] = [
  {
    id: 'ex-upi-qr',
    category: 'UPI & Payment Fraud',
    title: 'OLX / Marketplace QR Code Trap',
    tag: 'UPI Fraud',
    expectedRisk: 'HIGH_RISK',
    text: `Hello, I saw your sofa listing on OLX and I want to buy it immediately without bargaining. My driver will come pick it up tomorrow. Since I am an Army Officer posted in cantonment, I can only pay via Indian Army Defence Canteen portal UPI. 
Please scan this Google Pay QR code and enter your 6-digit UPI PIN to receive the advance payment of Rs 12,500 into your bank account immediately. Do not delay.`,
  },
  {
    id: 'ex-electricity-urgent',
    category: 'Urgent Payment & Impersonation',
    title: 'Electricity Power Disconnection Phishing',
    tag: 'Urgent Threats',
    expectedRisk: 'HIGH_RISK',
    text: `URGENT NOTICE: Dear consumer, your electricity connection will be disconnected tonight at 9:30 PM from the power station office because your previous month bill was not updated.
Immediately call electricity officer Mr. Sharma at 98123-45678 or download the Discom QuickSupport app from http://quick-power-bill.top/pay to update your bill now. Avoid permanent blacklisting.`,
  },
  {
    id: 'ex-job-telegram',
    category: 'Fake Job & Task Fraud',
    title: 'Part-Time YouTube Liking / Telegram Scam',
    tag: 'Fake Job',
    expectedRisk: 'HIGH_RISK',
    text: `Greetings from Global Talent HR Solutions! We reviewed your profile and selected you for a remote Part-Time Assistant role. Work from mobile 20 minutes daily.
Tasks: Simply like YouTube videos and write 5-star Google Maps reviews.
Salary: Rs 2,500 - Rs 8,000 per day deposited directly to your bank account or UPI.
Contact our hiring manager on Telegram: @Global_Recruiter_VIP. Immediate joining, initial security refundable deposit of Rs 1,000 required for portal credentials.`,
  },
  {
    id: 'ex-digital-arrest',
    category: 'Impersonation & Coercion',
    title: 'FedEx Narcotics / Digital Arrest Hoax',
    tag: 'Impersonation',
    expectedRisk: 'HIGH_RISK',
    text: `This is an automated priority call from FedEx Customs Clearance Mumbai. A parcel sent under your Aadhaar Number to Taiwan has been seized containing 5 expired passports, 140 grams of MDMA synthetic narcotics, and illegal foreign currency.
Your call is being transferred to the Mumbai Cyber Crime Branch and CBI Investigation Cell. You are under Digital Arrest and must stay on video call in a locked room. Transfer all your bank balances to the RBI Verification Escrow Account to verify legitimate funds.`,
  },
  {
    id: 'ex-bank-kyc',
    category: 'Phishing & Account Verification',
    title: 'Bank KYC Deactivation SMS with Phishing Link',
    tag: 'Phishing',
    expectedRisk: 'HIGH_RISK',
    text: `Dear State Bank customer, your NetBanking access and ATM debit card will be blocked within 12 hours due to pending RBI KYC document re-verification.
Click link to upload your PAN card and verify OTP: https://sbi-kyc-reactivate.xyz/login. Do not ignore.`,
  },
  {
    id: 'ex-fake-internship',
    category: 'Fake Internship',
    title: 'Unsolicited Software Intern Offer with Training Fee',
    tag: 'Student Trap',
    expectedRisk: 'MEDIUM_RISK',
    text: `Congratulations! Based on your LinkedIn resume, you have been shortlisted for our 6-month Virtual Software Development Internship with stipend of Rs 35,000/month.
To confirm your internship seat, you must purchase the mandatory cloud developer workstation certificate kit by paying Rs 2,999 within 24 hours. Click here to confirm registration.`,
  },
  {
    id: 'ex-legit-bank',
    category: 'Legitimate Transaction',
    title: 'Legitimate Official Bank Transaction Alert',
    tag: 'Benchmark: Safe',
    expectedRisk: 'LOW_RISK',
    text: `Dear Customer, your A/C ending in 4102 has been debited by INR 350.00 on 18-Nov-26 at CAFE COFFEE DAY via UPI Ref 432190812344. Available Balance: INR 14,290.45. If not done by you, SMS BLOCK to 567676 or call your official bank branch.`,
  },
  {
    id: 'ex-legit-delivery',
    category: 'Legitimate Order',
    title: 'Legitimate E-commerce Shipment Notification',
    tag: 'Benchmark: Safe',
    expectedRisk: 'LOW_RISK',
    text: `Your Amazon order #402-9182371-291823 has been shipped with BlueDart AWB 98127391. Expected delivery by Thursday, 20 Nov before 8 PM. Track your package anytime in the Amazon app. No action needed.`,
  },
];
