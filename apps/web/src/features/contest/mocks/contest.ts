import type { ContestDetailData } from '@/features/contest-detail/types';
import type { Contest } from '../types';

export const MOCK_CONTEST_ID = 'css-championship-2026';

export const MOCK_CONTEST: Contest = {
  id: MOCK_CONTEST_ID,
  title: 'R.ODE Battle',
  subtitle: 'International CSS Championship',
  problems: [
    { id: 'p1', title: 'Warm-up Card', type: 'FE_CSS_BATTLE' },
    { id: 'p2', title: 'Badge Layout', type: 'FE_CSS_BATTLE' },
    { id: 'p3', title: 'Button Group', type: 'FE_CSS_BATTLE' },
    { id: 'p4', title: 'Login Form', type: 'FE_CSS_BATTLE' },
    { id: 'p5', title: 'Dashboard Widget', type: 'FE_CSS_BATTLE' },
  ],
};

const DEFAULT_STARTER_HTML = `<div></div>

<!-- OBJECTIVE -->
<!-- Recreate the target panel using the least code possible. -->
<!-- Remove these comments before you submit. -->`;

const MOCK_PROBLEM_DETAILS: Record<string, ContestDetailData> = {
  p1: {
    id: 'p1',
    title: 'Warm-up Card',
    type: 'FE_CSS_BATTLE',
    initialHtml: DEFAULT_STARTER_HTML,
    initialCss: '',
    target: { id: 't1', title: 'Warm-up Card', width: 400, height: 300, colors: [] },
  },
  p2: {
    id: 'p2',
    title: 'Badge Layout',
    type: 'FE_CSS_BATTLE',
    initialHtml: DEFAULT_STARTER_HTML,
    initialCss: '',
    target: { id: 't2', title: 'Badge Layout', width: 320, height: 160, colors: [] },
  },
  p3: {
    id: 'p3',
    title: 'Button Group',
    type: 'FE_CSS_BATTLE',
    initialHtml: DEFAULT_STARTER_HTML,
    initialCss: '',
    target: { id: 't3', title: 'Button Group', width: 360, height: 120, colors: [] },
  },
  p4: {
    id: 'p4',
    title: 'Login Form',
    type: 'FE_CSS_BATTLE',
    initialHtml: DEFAULT_STARTER_HTML,
    initialCss: '',
    target: { id: 't4', title: 'Login Form', width: 360, height: 420, colors: [] },
  },
  p5: {
    id: 'p5',
    title: 'Dashboard Widget',
    type: 'FE_CSS_BATTLE',
    initialHtml: DEFAULT_STARTER_HTML,
    initialCss: '',
    target: { id: 't5', title: 'Dashboard Widget', width: 480, height: 300, colors: [] },
  },
};

export function getMockContest(contestId: string): Contest | undefined {
  return contestId === MOCK_CONTEST.id ? MOCK_CONTEST : undefined;
}

export function getMockProblemDetail(problemId: string): ContestDetailData | undefined {
  return MOCK_PROBLEM_DETAILS[problemId];
}
