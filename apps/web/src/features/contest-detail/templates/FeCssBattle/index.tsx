import ContestFooter from '@/features/contest/components/ContestFooter';
import ContestHeader from '@/features/contest/components/ContestHeader';
import { useProblemStatus } from '@/features/contest/hooks/useProblemProgress';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import type { ContestDetailData } from '../../types';
import CssEditorPanel from './components/CssEditorPanel';
import CssLiveOutputPanel from './components/CssLiveOutputPanel';
import CssTargetPanel from './components/CssTargetPanel';
import IntegrityWarningModal, { type IntegrityWarningModalMode } from './components/IntegrityWarningModal';
import { useCssDraft } from './hooks/useCssDraft';
import { useExamIntegrity } from './hooks/useExamIntegrity';

interface FeCssBattleTemplateProps {
  contestId: string;
  problemId: string;
  contestData?: ContestDetailData;
}

export default function FeCssBattleTemplate({ contestId, problemId, contestData }: FeCssBattleTemplateProps) {
  const navigate = useNavigate();
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const defaults = {
    html: contestData?.initialHtml ?? '',
    css: contestData?.initialCss ?? '',
  };
  const [draft, setDraft] = useCssDraft(contestId, problemId, defaults);
  const { markTouched, markSubmitted } = useProblemStatus(contestId, problemId);
  const { phase, violations, latestViolation, fullscreenError, enterExam, acknowledgeViolation } = useExamIntegrity(
    contestId,
    problemId,
  );

  const handleHtmlChange = (html: string) => {
    setDraft((prev) => ({ ...prev, html }));
    markTouched();
  };

  const handleCssChange = (css: string) => {
    setDraft((prev) => ({ ...prev, css }));
    markTouched();
  };

  const handleSubmit = () => {
    markSubmitted();
    navigate({ to: '/contest/$contestId', params: { contestId } });
  };

  const dialogMode: IntegrityWarningModalMode | null =
    phase === 'gate'
      ? { kind: 'gate', title: contestData?.title ?? 'Untitled problem' }
      : latestViolation
        ? { kind: 'warning', violation: latestViolation, violationCount: violations.length }
        : null;

  return (
    <div ref={setContainerEl} className="flex h-screen flex-col bg-gray-50 font-sans text-gray-900">
      <ContestHeader title="R.ODE Battle" subtitle="International CSS Championship" timeRemaining="18:42" />

      <div className="grid min-h-0 flex-1 grid-cols-1 border-b border-gray-200 lg:grid-cols-[1.6fr_1fr_1fr]">
        <CssEditorPanel
          html={draft.html}
          css={draft.css}
          onHtmlChange={handleHtmlChange}
          onCssChange={handleCssChange}
          onSubmit={handleSubmit}
        />
        <CssLiveOutputPanel html={draft.html} css={draft.css} target={contestData?.target} />
        <CssTargetPanel target={contestData?.target} />
      </div>

      <ContestFooter backTo={`/contest/${contestId}/`} backLabel="Back to problems" />

      <IntegrityWarningModal
        mode={dialogMode}
        error={fullscreenError}
        container={containerEl}
        onEnter={() => containerEl && enterExam(containerEl)}
        onAcknowledge={() => containerEl && acknowledgeViolation(containerEl)}
      />
    </div>
  );
}
