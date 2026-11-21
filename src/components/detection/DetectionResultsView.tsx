import React, { useState } from 'react';
import {
  ScamAnalysisResult,
  UrlCheckResult,
} from '@/lib/types';
import { RiskBadge } from '../common/RiskBadge';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatDate } from '@/lib/utils';
import {
  Check,
  Copy,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronDown,
  Info,
  RotateCcw,
} from 'lucide-react';

interface DetectionResultsViewProps {
  analysis?: ScamAnalysisResult | null;
  urlCheck?: UrlCheckResult | null;
  onReset: () => void;
  onReportScam?: () => void;
}

export const DetectionResultsView: React.FC<DetectionResultsViewProps> = ({
  analysis,
  urlCheck,
  onReset,
  onReportScam,
}) => {
  const [copied, setCopied] = useState(false);
  const [showLimitations, setShowLimitations] = useState(false);

  const isUrl = !!urlCheck;
  const result = analysis || urlCheck;

  if (!result) return null;

  const handleCopyResults = () => {
    let summary = `[CyberShield Analysis Report - Reference: ${result.id}]\n`;
    summary += `Timestamp: ${formatDate(result.created_at)}\n`;
    summary += `Risk Level: ${result.risk_level}\n`;
    summary += `Risk Score: ${result.risk_score}/100\n`;
    summary += `Explanation: ${result.explanation}\n\n`;

    if (result.indicators && result.indicators.length > 0) {
      summary += `Detected Indicators:\n`;
      result.indicators.forEach((ind, i) => {
        summary += `${i + 1}. ${ind.name} (${ind.severity}): ${ind.description}\n`;
      });
    }

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <Card
        variant="elevated"
        className={`p-6 border-l-4 ${
          result.risk_level === 'HIGH_RISK'
            ? 'border-l-rose-500 bg-gradient-to-r from-rose-950/20 via-navy-900 to-navy-900'
            : result.risk_level === 'MEDIUM_RISK'
            ? 'border-l-amber-500 bg-gradient-to-r from-amber-950/20 via-navy-900 to-navy-900'
            : result.risk_level === 'LOW_RISK'
            ? 'border-l-emerald-500 bg-gradient-to-r from-emerald-950/20 via-navy-900 to-navy-900'
            : 'border-l-slate-500 bg-navy-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <RiskBadge level={result.risk_level} size="lg" />
              <span className="text-xs font-mono text-slate-300 bg-midnight-950 px-2.5 py-0.5 rounded-lg border border-slate-800 font-bold">
                Threat Score: {result.risk_score} / 100
              </span>
              {analysis && (
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Confidence: {analysis.confidence}
                </span>
              )}
            </div>
            
            {/* Visual Threat Meter */}
            <div className="w-48 sm:w-64 h-1.5 bg-midnight-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.risk_level === 'HIGH_RISK'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : result.risk_level === 'MEDIUM_RISK'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.max(result.risk_score, 8)}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Analyzed on {formatDate(result.created_at)}</span>
              <span>•</span>
              <span className="font-mono text-[11px]">Ref: {result.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyResults}
              leftIcon={
                copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )
              }
              className="text-xs"
            >
              {copied ? 'Copied' : 'Copy Report'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onReset}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              New Scan
            </Button>
          </div>
        </div>

        {/* Target Preview */}
        <div className="pt-4 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isUrl ? 'Evaluated Web Address' : 'Content Preview'}
          </h4>
          <div className="p-3 rounded-lg bg-navy-950/80 border border-slate-800 text-xs font-mono text-slate-200 break-all max-h-28 overflow-y-auto">
            {isUrl ? urlCheck?.submitted_url : analysis?.content_preview}
          </div>
          {isUrl && urlCheck?.domain_details && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Domain: <strong>{urlCheck.extracted_domain}</strong>
              </span>
              <span
                className={`px-2 py-0.5 rounded border ${
                  urlCheck.domain_details.has_https
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                }`}
              >
                {urlCheck.domain_details.has_https ? 'HTTPS Encrypted' : 'Unencrypted HTTP'}
              </span>
              {urlCheck.domain_details.lookalike_target && (
                <span className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-500/30 font-semibold">
                  Impersonates: {urlCheck.domain_details.lookalike_target.toUpperCase()}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Explanation Section */}
      <Card className="p-6 bg-navy-900 border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          Assessment Explanation
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {result.explanation}
        </p>
      </Card>

      {/* Evidence & Highlighted Indicators */}
      {result.indicators && result.indicators.length > 0 && (
        <Card className="p-6 bg-navy-900 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Detected Risk Indicators ({result.indicators.length})
            </h3>
            <span className="text-[11px] text-slate-400">Heuristic Signals</span>
          </div>

          <div className="space-y-3">
            {result.indicators.map((ind, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  ind.severity === 'high'
                    ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                    : ind.severity === 'medium'
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    : 'bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        ind.severity === 'high'
                          ? 'bg-rose-400'
                          : ind.severity === 'medium'
                          ? 'bg-amber-400'
                          : 'bg-slate-400'
                      }`}
                    />
                    <h5 className="font-semibold text-slate-100">{ind.name}</h5>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                      ind.severity === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : ind.severity === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {ind.severity} severity
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {ind.description}
                </p>
                {ind.matchedText && (
                  <div className="mt-1 p-2 rounded bg-navy-950/70 border border-slate-800/80 font-mono text-[10px] text-amber-300/90 break-all">
                    <strong>Snippet:</strong> "{ind.matchedText}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommended Next Actions */}
      <Card className="p-6 bg-navy-900 border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Recommended Next Actions
        </h3>
        <ul className="space-y-2 text-xs">
          {(isUrl ? urlCheck?.precautions : analysis?.recommended_actions)?.map(
            (action, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-navy-950/60 border border-slate-800 text-slate-300"
              >
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{action}</span>
              </li>
            )
          )}
        </ul>

        {result.risk_level === 'HIGH_RISK' && onReportScam && (
          <div className="pt-2 flex items-center justify-between p-3 rounded-lg bg-rose-950/20 border border-rose-500/30">
            <span className="text-xs text-rose-300">
              Want to report this to help protect others in the community?
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={onReportScam}
              className="text-xs font-semibold"
            >
              Report This Scam
            </Button>
          </div>
        )}
      </Card>

      {/* Transparent Limitations & Uncertainty Collapsible */}
      <Card className="p-4 bg-navy-950/60 border-slate-800">
        <button
          onClick={() => setShowLimitations(!showLimitations)}
          className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Limitations of this Analysis & Ethical Notice
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showLimitations ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showLimitations && (
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
            {(isUrl ? urlCheck?.verification_limitations : analysis?.limitations)?.map(
              (lim, i) => (
                <p key={i}>• {lim}</p>
              )
            )}
            <p className="text-slate-500 italic pt-1">
              Core principle: Never treat the absence of red flags as a guarantee of safety.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
