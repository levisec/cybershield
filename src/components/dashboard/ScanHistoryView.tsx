import React, { useState } from 'react';
import { LocalStore } from '@/lib/supabase';
import { ScamAnalysisResult, UrlCheckResult, RiskClassification } from '@/lib/types';
import { RiskBadge } from '../common/RiskBadge';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatDate } from '@/lib/utils';
import {
  History,
  Trash2,
  Search,
  Globe,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { ActiveTab } from '../common/Navbar';

interface ScanHistoryViewProps {
  onSelectAnalysis?: (analysis: ScamAnalysisResult) => void;
  onSelectUrl?: (urlCheck: UrlCheckResult) => void;
  onNavigate?: (tab: ActiveTab) => void;
}

export const ScanHistoryView: React.FC<ScanHistoryViewProps> = () => {
  const [analyses, setAnalyses] = useState<ScamAnalysisResult[]>(() => LocalStore.getAnalyses());
  const [urlChecks, setUrlChecks] = useState<UrlCheckResult[]>(() => LocalStore.getUrlChecks());
  const [activeTab, setActiveTab] = useState<'all' | 'messages' | 'urls'>('all');
  const [riskFilter, setRiskFilter] = useState<'ALL' | RiskClassification>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteAnalysis = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    LocalStore.deleteAnalysis(id);
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeleteUrl = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    LocalStore.deleteUrlCheck(id);
    setUrlChecks((prev) => prev.filter((u) => u.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire scan history? This action cannot be undone.')) {
      LocalStore.clearAnalyses();
      LocalStore.clearUrlChecks();
      setAnalyses([]);
      setUrlChecks([]);
    }
  };

  // Combine and sort
  const combinedItems = [
    ...analyses.map((a) => ({ ...a, itemType: 'analysis' as const })),
    ...urlChecks.map((u) => ({ ...u, itemType: 'url' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Filter
  const filteredItems = combinedItems.filter((item) => {
    // Type tab
    if (activeTab === 'messages' && item.itemType !== 'analysis') return false;
    if (activeTab === 'urls' && item.itemType !== 'url') return false;

    // Risk level filter
    if (riskFilter !== 'ALL' && item.risk_level !== riskFilter) return false;

    // Text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (item.itemType === 'analysis') {
        const a = item as ScamAnalysisResult;
        return (
          a.content_preview.toLowerCase().includes(q) ||
          a.explanation.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
        );
      } else {
        const u = item as UrlCheckResult;
        return (
          u.submitted_url.toLowerCase().includes(q) ||
          u.extracted_domain.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
        );
      }
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <History className="w-3.5 h-3.5" />
            <span>Private History & Audit Records</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Scan & URL History</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Review past evaluations, filter by detected risk, and manage your stored records.
          </p>
        </div>

        {combinedItems.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAll}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            className="text-xs self-start sm:self-auto"
          >
            Clear All History
          </Button>
        )}
      </div>

      {/* Filter and Search Controls */}
      <Card className="p-4 bg-midnight-900 border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 w-full md:w-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-midnight-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Records ({combinedItems.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-emerald-500 text-midnight-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              Messages ({analyses.length})
            </button>
            <button
              onClick={() => setActiveTab('urls')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'urls'
                  ? 'bg-emerald-500 text-midnight-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3 h-3" />
              URLs ({urlChecks.length})
            </button>
          </div>

          {/* Search Input & Risk Level Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scans or URLs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="HIGH_RISK">High Risk Only</option>
              <option value="MEDIUM_RISK">Medium Risk Only</option>
              <option value="LOW_RISK">Low Risk Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results List */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center bg-midnight-900 border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">No scan history records found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || riskFilter !== 'ALL'
              ? 'No evaluations match your current filters. Try resetting search criteria.'
              : 'Your evaluated messages and URLs will appear here whenever you conduct scans while signed in.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isAnalysis = item.itemType === 'analysis';
            const a = isAnalysis ? (item as ScamAnalysisResult) : null;
            const u = !isAnalysis ? (item as UrlCheckResult) : null;

            return (
              <Card
                key={item.id}
                className="p-4 sm:p-5 bg-midnight-900 border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <RiskBadge level={item.risk_level} size="sm" />
                    <span className="text-[11px] font-mono text-slate-400">
                      Score: {item.risk_score}/100
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Ref: {item.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {formatDate(item.created_at)}
                    </span>
                    <button
                      onClick={(e) =>
                        isAnalysis
                          ? handleDeleteAnalysis(item.id, e)
                          : handleDeleteUrl(item.id, e)
                      }
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete this record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    {isAnalysis ? (
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    )}
                    <span className="truncate">
                      {isAnalysis ? a?.content_preview : u?.submitted_url}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-5 line-clamp-2">
                    {item.explanation}
                  </p>
                </div>

                {item.indicators && item.indicators.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pl-5 pt-1">
                    {item.indicators.slice(0, 3).map((ind, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-midnight-950 border border-slate-800 text-slate-300"
                      >
                        {ind.name}
                      </span>
                    ))}
                    {item.indicators.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{item.indicators.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
