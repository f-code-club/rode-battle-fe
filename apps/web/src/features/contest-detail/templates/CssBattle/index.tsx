import ContestFooter from '@/features/contest/components/ContestFooter';
import ContestHeader from '@/features/contest/components/ContestHeader';
import { useProblemStatus } from '@/features/contest/hooks/useProblemProgress';
import { useNavigate } from '@tanstack/react-router';
import type { ContestDetailData } from '../../types';
import CssEditorPanel from './components/CssEditorPanel';
import CssLiveOutputPanel from './components/CssLiveOutputPanel';
import CssTargetPanel from './components/CssTargetPanel';
import { getEditorTheme, getPageColors } from './config/editorThemes';
import { useCssDraft } from './hooks/useCssDraft';
import { useEditorThemeId } from './hooks/useEditorThemeId';

interface CssBattleTemplateProps {
  contestId: string;
  problemId: string;
  contestData?: ContestDetailData;
}

export default function CssBattleTemplate({ contestId, problemId, contestData }: CssBattleTemplateProps) {
  const navigate = useNavigate();
  const defaults = { code: contestData?.initialCode ?? '' };
  const [draft, setDraft] = useCssDraft(contestId, problemId, defaults);
  const { markTouched, markSubmitted } = useProblemStatus(contestId, problemId);
  const [themeId, setThemeId] = useEditorThemeId();
  const theme = getEditorTheme(themeId);
  const colors = getPageColors(theme);

  const handleCodeChange = (code: string) => {
    setDraft({ code });
    markTouched();
  };

  const handleSubmit = () => {
    markSubmitted();
    navigate({ to: '/contest/$contestId', params: { contestId } });
  };

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.foreground }}
      className="flex h-screen flex-col font-sans"
    >
      <ContestHeader
        title="R.ODE Battle"
        subtitle="International CSS Championship"
        timeRemaining="18:42"
        colors={colors}
      />

      <div
        style={{ borderBottom: `1px solid ${colors.border}` }}
        className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr]"
      >
        <CssEditorPanel
          code={draft.code}
          onCodeChange={handleCodeChange}
          onSubmit={handleSubmit}
          theme={theme}
          themeId={themeId}
          onThemeIdChange={setThemeId}
          colors={colors}
        />
        <CssLiveOutputPanel code={draft.code} target={contestData?.target} colors={colors} />
        <CssTargetPanel target={contestData?.target} colors={colors} />
      </div>

      <ContestFooter backTo={`/contest/${contestId}/`} backLabel="Back to problems" colors={colors} />
    </div>
  );
}
