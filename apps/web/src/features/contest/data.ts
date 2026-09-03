import type { ContestDetailData, ContestType } from '@/features/contest-detail/types';

export type ProblemStatus = 'not-started' | 'in-progress' | 'submitted';

export const SAMPLE_BE_ALGORITHM_STATEMENT = `## Statement

You are given an array of $n$ integers $a_1, a_2, \\ldots, a_n$. In one operation you may choose an index $i$ and increase $a_i$ by $1$, or decrease $a_i$ by $1$.

Find the minimum number of operations needed so that

$$\\sum_{i=1}^{n} a_i \\equiv 0 \\pmod{k}$$

## Input

The first line contains two integers $n$ and $k$ ($1 \\le n \\le 2 \\cdot 10^5$, $1 \\le k \\le 10^9$).

The second line contains $n$ integers $a_1, a_2, \\ldots, a_n$ ($-10^9 \\le a_i \\le 10^9$).

## Output

Print a single integer — the minimum number of operations.

## Example

**Input**

\`\`\`
3 5
1 2 3
\`\`\`

**Output**

\`\`\`
1
\`\`\`

## Note

In the example, the sum is $6$. Increasing or decreasing any element by $1$ makes the sum $5$ or $7$; only $5$ is divisible by $5$, so the answer is $1$.
`;

export const SAMPLE_BE_ALGORITHM_LANGUAGES = [
  { id: 'cpp17', label: 'C++17', fileExt: '.cpp' },
  { id: 'python3', label: 'Python 3', fileExt: '.py' },
  { id: 'java17', label: 'Java 17', fileExt: '.java' },
];

export interface ContestProblemSummary {
  id: string;
  title: string;
  type: ContestType;
}

export interface Contest {
  id: string;
  title: string;
  subtitle?: string;
  problems: ContestProblemSummary[];
}

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
    { id: 'p6', title: 'Array Balancing', type: 'BE_ALGORITHM' },
  ],
};

const DEFAULT_STARTER_CODE = `<div></div>
<style>
  div {
    width: 100px;
    height: 100px;
    background: #dd6b4d;
  }
</style>`;

const MOCK_PROBLEM_DETAILS: Record<string, ContestDetailData> = {
  p1: {
    id: 'p1',
    title: 'Warm-up Card',
    type: 'FE_CSS_BATTLE',
    initialCode: DEFAULT_STARTER_CODE,
    target: { id: 't1', title: 'Warm-up Card', width: 400, height: 300, colors: [] },
  },
  p2: {
    id: 'p2',
    title: 'Badge Layout',
    type: 'FE_CSS_BATTLE',
    initialCode: DEFAULT_STARTER_CODE,
    target: { id: 't2', title: 'Badge Layout', width: 320, height: 160, colors: [] },
  },
  p3: {
    id: 'p3',
    title: 'Button Group',
    type: 'FE_CSS_BATTLE',
    initialCode: DEFAULT_STARTER_CODE,
    target: { id: 't3', title: 'Button Group', width: 360, height: 120, colors: [] },
  },
  p4: {
    id: 'p4',
    title: 'Login Form',
    type: 'FE_CSS_BATTLE',
    initialCode: DEFAULT_STARTER_CODE,
    target: { id: 't4', title: 'Login Form', width: 360, height: 420, colors: [] },
  },
  p5: {
    id: 'p5',
    title: 'Dashboard Widget',
    type: 'FE_CSS_BATTLE',
    initialCode: DEFAULT_STARTER_CODE,
    target: { id: 't5', title: 'Dashboard Widget', width: 480, height: 300, colors: [] },
  },
  p6: {
    id: 'p6',
    title: 'Array Balancing',
    type: 'BE_ALGORITHM',
    algorithm: {
      statementMarkdown: SAMPLE_BE_ALGORITHM_STATEMENT,
      timeLimitMs: 1000,
      memoryLimitMb: 256,
      points: 100,
      allowedLanguages: SAMPLE_BE_ALGORITHM_LANGUAGES,
    },
  },
};

export function getMockContest(contestId: string): Contest | undefined {
  return contestId === MOCK_CONTEST.id ? MOCK_CONTEST : undefined;
}

export function getMockProblemDetail(problemId: string): ContestDetailData | undefined {
  return MOCK_PROBLEM_DETAILS[problemId];
}
