import { useLocalStorage } from 'usehooks-ts';

export interface SubmissionRecord {
  id: string;
  fileName: string;
  languageLabel: string;
  submittedAt: string;
  status: 'Submitted';
}

export function useSubmissionHistory(contestId: string, problemId: string) {
  const [history, setHistory] = useLocalStorage<SubmissionRecord[]>(`be-submissions-${contestId}-${problemId}`, []);

  const addSubmission = (fileName: string, languageLabel: string) => {
    const record: SubmissionRecord = {
      id: crypto.randomUUID(),
      fileName,
      languageLabel,
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
    };
    setHistory((prev) => [record, ...prev]);
  };

  return { history, addSubmission };
}
