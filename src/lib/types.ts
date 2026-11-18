export type RiskClassification = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK' | 'UNABLE_TO_DETERMINE';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type ScamCategory =
  | 'phishing'
  | 'fake_job'
  | 'fake_internship'
  | 'impersonation'
  | 'urgent_payment'
  | 'upi_fraud'
  | 'fake_support'
  | 'lottery_prize'
  | 'investment_scam'
  | 'account_verification'
  | 'social_engineering'
  | 'other';

export interface Indicator {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  matchedText?: string;
}

export interface ScamAnalysisResult {
  id: string;
  created_at: string;
  user_id?: string;
  input_type: 'text' | 'screenshot' | 'email' | 'sms_whatsapp';
  content_preview: string;
  risk_level: RiskClassification;
  risk_score: number; // 0 - 100
  scam_category: ScamCategory;
  confidence: ConfidenceLevel;
  indicators: Indicator[];
  explanation: string;
  evidence: string[];
  recommended_actions: string[];
  limitations: string[];
}

export interface UrlCheckResult {
  id: string;
  created_at: string;
  user_id?: string;
  submitted_url: string;
  extracted_domain: string;
  risk_level: RiskClassification;
  risk_score: number; // 0 - 100
  indicators: Indicator[];
  domain_details: {
    has_https: boolean;
    is_ip_address: boolean;
    has_punycode: boolean;
    suspicious_tld: boolean;
    subdomain_depth: number;
    lookalike_target?: string;
    entropy: number;
  };
  explanation: string;
  precautions: string[];
  provider_coverage: string;
  verification_limitations: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  display_name?: string;
  role: 'user' | 'admin';
  created_at: string;
  last_login?: string;
  save_history_consent: boolean;
}

export interface ScamReport {
  id: string;
  reference_id: string;
  user_id?: string;
  reporter_email?: string;
  category: ScamCategory;
  title: string;
  description: string;
  evidence_url?: string;
  platform_involved?: string;
  suspect_contact?: string;
  status: 'pending' | 'under_review' | 'verified_scam' | 'dismissed' | 'resolved';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: ScamCategory;
}

export interface AwarenessModule {
  id: string;
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate';
  summary: string;
  overview: string;
  redFlags: string[];
  defensiveRules: string[];
  realWorldScenario: string;
  quizzes: QuizQuestion[];
}

export interface RecoveryGuide {
  id: string;
  title: string;
  category: string;
  severity: 'immediate' | 'high' | 'medium';
  description: string;
  first15Minutes: string[];
  stepByStepAction: string[];
  officialResources: Array<{
    name: string;
    description: string;
    url?: string;
    phone?: string;
    isIndianAuthority?: boolean;
  }>;
  recoveryChecklist: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor_id: string;
  actor_email: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: string;
  ip_address?: string;
}
