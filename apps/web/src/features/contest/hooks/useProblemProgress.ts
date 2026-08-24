import { useLocalStorage } from 'usehooks-ts';
import type { ProblemStatus } from '../data';

interface ProblemStatusState {
  touched: boolean;
  submitted: boolean;
}

const DEFAULT_STATUS_STATE: ProblemStatusState = { touched: false, submitted: false };

export function useProblemStatus(contestId: string, problemId: string) {
  const [state, setState] = useLocalStorage<ProblemStatusState>(
    `contest-problem-status-${contestId}-${problemId}`,
    DEFAULT_STATUS_STATE,
  );

  const status: ProblemStatus = state.submitted ? 'submitted' : state.touched ? 'in-progress' : 'not-started';

  const markTouched = () => setState((prev) => (prev.touched ? prev : { ...prev, touched: true }));
  const markSubmitted = () => setState((prev) => ({ ...prev, submitted: true }));

  return { status, markTouched, markSubmitted };
}
