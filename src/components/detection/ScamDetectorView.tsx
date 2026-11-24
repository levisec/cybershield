import React, { useState, useRef } from 'react';
import { Button } from '../common/Button';
import { Textarea } from '../common/Input';
import { DetectionResultsView } from './DetectionResultsView';
import { analyzeMessage } from '@/lib/detectionEngine';
import { ScamAnalysisResult } from '@/lib/types';
import { LocalStore } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { SYNTHETIC_SCAM_EXAMPLES, SyntheticExample } from '@/lib/syntheticScamData';
import { validateImageFile, extractTextFromImage, OcrProgress } from '@/lib/ocrService';
import { cn } from '@/lib/utils';
import { ActiveTab } from '../common/Navbar';
import {
  Search,
  MessageSquare,
  Mail,
  Smartphone,
  Sparkles,
  Trash2,
  ShieldCheck,
  Image as ImageIcon,
  Lock,
  Cpu,
  Zap,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface ScamDetectorViewProps {
  onReportScam?: () => void;
  onSwitchToOcr?: () => void;
  onNavigate?: (tab: ActiveTab) => void;
  initialText?: string | null;
}

const PLACEHOLDERS: Record<string, string> = {
  sms_whatsapp:
    "Paste WhatsApp or SMS message here…\n\ne.g. 'Dear Customer, your electricity will be disconnected tonight at 9:30 PM. Call officer at 98123-XXXXX or download QuickSupport app immediately to avoid disconnection.'",
  email:
    "Paste the email body or subject + body here…\n\ne.g. 'Subject: URGENT: Your account has been compromised. Dear User, We have detected unusual activity...'",
  text: "Paste any suspicious job offer, social media message, or general text here…\n\ne.g. 'Work from home and earn ₹5000/day — no experience required. Click here to register now.'",
};

const TRUST_BADGES = [
  { icon: Cpu, label: 'Client-side processing' },
  { icon: Lock, label: 'No data stored without consent' },
  { icon: Zap, label: 'Zero external API calls' },
];

const INPUT_TABS = [
  { id: 'sms_whatsapp' as const, label: 'WhatsApp / SMS', icon: Smartphone },
  { id: 'email' as const, label: 'Email', icon: Mail },
  { id: 'text' as const, label: 'General Text', icon: MessageSquare },
  { id: 'ocr' as const, label: 'Screenshot (OCR)', icon: ImageIcon },
];

export const ScamDetectorView: React.FC<ScamDetectorViewProps> = ({
  onReportScam,
  initialText,
}) => {
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState(initialText || '');
  const [inputType, setInputType] = useState<'text' | 'email' | 'sms_whatsapp' | 'ocr'>('sms_whatsapp');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // OCR-specific state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState<OcrProgress | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialText) {
      setInputText(initialText);
      try {
        const result = analyzeMessage(initialText, inputType === 'ocr' ? 'sms_whatsapp' : inputType);
        setAnalysisResult(result);
      } catch (err) {
        console.error(err);
      }
    }
  }, [initialText]);

  const handleAnalyze = (overrideText?: string) => {
    const textToAnalyze = overrideText !== undefined ? overrideText : inputText;
    setErrorMsg('');
    if (!textToAnalyze.trim()) {
      setErrorMsg('Please paste, type, or extract text from a suspicious message before analyzing.');
      return;
    }

    setIsAnalyzing(true);

    // Simulate realistic analysis time for user feedback & state rendering
    setTimeout(() => {
      try {
        const typeForEngine = inputType === 'ocr' ? 'sms_whatsapp' : inputType;
        const result = analyzeMessage(textToAnalyze, typeForEngine);
        setAnalysisResult(result);

        // Save to user scan history if consented and user exists
        if (currentUser && currentUser.save_history_consent) {
          LocalStore.saveAnalysis(result);
        }
      } catch (err: any) {
        setErrorMsg('An error occurred during analysis: ' + (err.message || 'Unknown error'));
      } finally {
        setIsAnalyzing(false);
      }
    }, 400);
  };

  const handleLoadExample = (example: SyntheticExample) => {
    setInputText(example.text);
    if (inputType === 'ocr') {
      setInputType('sms_whatsapp');
    }
    setErrorMsg('');
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setInputText('');
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setOcrProgress(null);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  const handleFileSelect = (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Invalid file');
      return;
    }

    setErrorMsg('');
    setSelectedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);
  };

  const handleExtractOcr = async () => {
    if (!selectedImage) {
      setErrorMsg('Please select or drop an image file first.');
      return;
    }

    setIsOcrProcessing(true);
    setErrorMsg('');
    setOcrProgress({ status: 'Initializing OCR engine...', progress: 0.1 });

    try {
      const extractedText = await extractTextFromImage(selectedImage, (p) => {
        setOcrProgress(p);
      });

      if (!extractedText || extractedText.length < 5) {
        setErrorMsg('No readable text detected in this image. Try another screenshot or paste the text directly.');
        setIsOcrProcessing(false);
        return;
      }

      setInputText(extractedText);
      setIsOcrProcessing(false);
      setOcrProgress(null);
      // Automatically analyze extracted text for immediate value (Reciprocity)
      handleAnalyze(extractedText);
    } catch (err: any) {
      console.warn('OCR processing error, providing fallback:', err);
      setErrorMsg('Image text extraction was unable to run locally in this browser. You can type or paste the text directly above.');
      setIsOcrProcessing(false);
      setOcrProgress(null);
    }
  };

  const handleLoadSampleScreenshot = () => {
    // Provide a sample simulated screenshot text for instant testing
    const sampleText = 'URGENT: Your SBI Yono Account has been blocked today due to pending KYC verification. Please click https://sbi-kyc-reactivate.xyz/login to update Aadhaar and PAN immediately to resume services.';
    setInputText(sampleText);
    handleAnalyze(sampleText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* ── Header ── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Search className="w-3.5 h-3.5" />
          <span>AI Scam Detection Engine</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Check a{' '}
            <span className="text-gradient-emerald">Suspicious Message</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Paste any WhatsApp message, SMS, email, or job offer. We'll analyze it for scam
            patterns, urgency tactics, and impersonation signals — instantly.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-400 border border-slate-700/60 bg-slate-800/40"
            >
              <Icon className="w-3 h-3 text-emerald-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Input or Results ── */}
      {!analysisResult ? (
        <div className="space-y-6">
          {/* Input Card */}
          <div className="glass-panel-elevated rounded-2xl p-6 space-y-5 border border-slate-700/50">
            {/* Type tabs + OCR toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/60 border border-slate-700/40">
                {INPUT_TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInputType(id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                      inputType === id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Body: OCR Upload or Textarea */}
            {inputType === 'ocr' ? (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />

                {!selectedImage ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-8 sm:p-12 text-center transition-all bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer group space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-white">
                        Drop your screenshot here, or <span className="text-emerald-400 underline decoration-emerald-500/40">browse</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Supports PNG, JPG, and WebP (up to 8 MB)
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadSampleScreenshot();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Try Instant Sample Screenshot (SBI Fake Alert)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-900/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {imagePreviewUrl && (
                          <img
                            src={imagePreviewUrl}
                            alt="Screenshot preview"
                            className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white truncate max-w-[220px]">
                            {selectedImage.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB • {selectedImage.type}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreviewUrl(null);
                        }}
                        leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        className="text-xs text-slate-400 hover:text-rose-400"
                      >
                        Change Image
                      </Button>
                    </div>

                    {/* OCR Progress */}
                    {isOcrProcessing && (
                      <div className="space-y-2 p-3 rounded-lg bg-midnight-950 border border-emerald-500/30 animate-pulse">
                        <div className="flex items-center justify-between text-xs text-emerald-300">
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            {ocrProgress?.status || 'Analyzing image pixels...'}
                          </span>
                          <span>{Math.round((ocrProgress?.progress || 0) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 transition-all duration-300"
                            style={{ width: `${Math.max((ocrProgress?.progress || 0.1) * 100, 10)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {!isOcrProcessing && (
                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={handleExtractOcr}
                          leftIcon={<FileCheck className="w-4 h-4" />}
                          className="font-semibold text-xs px-6 shadow-lg shadow-emerald-500/20"
                        >
                          Extract Text & Run Threat Analysis
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreviewUrl(null);
                          }}
                          className="text-xs text-slate-400"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Textarea with scanning overlay */
              <div className="space-y-2 relative">
                {isAnalyzing && (
                  <div className="absolute inset-0 z-10 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                    <div className="scan-beam absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                  </div>
                )}
                <Textarea
                  label="Paste suspicious message or conversation below:"
                  placeholder={PLACEHOLDERS[inputType]}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[180px] text-sm font-sans resize-y"
                  error={errorMsg}
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span
                    className={cn(
                      'transition-colors',
                      inputText.length > 0 ? 'text-slate-400' : 'text-slate-600'
                    )}
                  >
                    {inputText.length.toLocaleString()} characters
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500/80">
                    <ShieldCheck className="w-3 h-3" />
                    Processed locally · consent-governed storage
                  </span>
                </div>
              </div>
            )}

            {/* Actions for Text Tabs */}
            {inputType !== 'ocr' && (
              <div className="flex items-center gap-3 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleAnalyze()}
                  isLoading={isAnalyzing}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="font-semibold px-7"
                >
                  {isAnalyzing ? 'Analyzing…' : 'Analyze Message'}
                </Button>
                {inputText && !isAnalyzing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Example Scenarios */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Try Real-World Examples
              </h2>
              <span className="text-[11px] text-slate-500">Click any card to load</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYNTHETIC_SCAM_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleLoadExample(ex)}
                  className={cn(
                    'group text-left p-4 rounded-xl border transition-all duration-200',
                    'bg-slate-900/60 border-slate-800',
                    'hover:border-emerald-500/30 hover:bg-slate-800/60',
                    'hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {ex.title}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border',
                        ex.expectedRisk === 'HIGH_RISK'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : ex.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      )}
                    >
                      {ex.tag}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 line-clamp-2 leading-relaxed">
                    {ex.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Render Analysis Report */
        <DetectionResultsView
          analysis={analysisResult}
          onReset={handleClear}
          onReportScam={onReportScam}
        />
      )}
    </div>
  );
};
