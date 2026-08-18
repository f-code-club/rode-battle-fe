import DashboardLayout from '@/components/layout/DashboardLayout';
import Contest from '@/features/contest-ranking/components/Contest';
import Standings from '@/features/contest-ranking/components/Standings';
import type { Contest as ContestType, Ranking } from '@/features/contest-ranking/types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';

const MOCK_PROBLEM_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

const RUNNING_RANKINGS: Ranking[] = [
  {
    name: 'Team 1',
    score: 12,
    penalty: 85,
    details: [
      { problem_id: '1', problem_position: 1, submission_count: 1, score: 1, last_submit: '2026-08-17T14:10:00Z' },
      { problem_id: '2', problem_position: 2, submission_count: 2, score: 1, last_submit: '2026-08-17T14:25:00Z' },
      { problem_id: '3', problem_position: 3, submission_count: 1, score: 1, last_submit: '2026-08-17T14:30:00Z' },
      { problem_id: '4', problem_position: 4, submission_count: 3, score: 1, last_submit: '2026-08-17T14:45:00Z' },
      { problem_id: '5', problem_position: 5, submission_count: 1, score: 1, last_submit: '2026-08-17T14:50:00Z' },
      { problem_id: '6', problem_position: 6, submission_count: 2, score: 1, last_submit: '2026-08-17T15:00:00Z' },
      { problem_id: '7', problem_position: 7, submission_count: 1, score: 1, last_submit: '2026-08-17T15:10:00Z' },
      { problem_id: '8', problem_position: 8, submission_count: 4, score: 1, last_submit: '2026-08-17T15:20:00Z' },
      { problem_id: '9', problem_position: 9, submission_count: 1, score: 1, last_submit: '2026-08-17T15:30:00Z' },
      { problem_id: '10', problem_position: 10, submission_count: 2, score: 1, last_submit: '2026-08-17T15:40:00Z' },
      { problem_id: '11', problem_position: 11, submission_count: 1, score: 1, last_submit: '2026-08-17T15:45:00Z' },
      { problem_id: '12', problem_position: 12, submission_count: 3, score: 1, last_submit: '2026-08-17T15:50:00Z' },
      { problem_id: '13', problem_position: 13, submission_count: 2, score: 0, last_submit: '2026-08-17T16:00:00Z' },
      { problem_id: '14', problem_position: 14, submission_count: 1, score: 0, last_submit: '2026-08-17T16:10:00Z' },
      { problem_id: '15', problem_position: 15, submission_count: 0, score: 0, last_submit: '' },
    ],
  },
  {
    name: 'Team 2',
    score: 9,
    penalty: 120,
    details: [
      { problem_id: '1', problem_position: 1, submission_count: 4, score: 1, last_submit: '2026-08-17T14:50:00Z' },
      { problem_id: '2', problem_position: 2, submission_count: 2, score: 1, last_submit: '2026-08-17T15:10:00Z' },
      { problem_id: '3', problem_position: 3, submission_count: 1, score: 1, last_submit: '2026-08-17T14:40:00Z' },
      { problem_id: '4', problem_position: 4, submission_count: 5, score: 0, last_submit: '2026-08-17T15:20:00Z' },
      { problem_id: '5', problem_position: 5, submission_count: 1, score: 1, last_submit: '2026-08-17T15:00:00Z' },
      { problem_id: '6', problem_position: 6, submission_count: 3, score: 1, last_submit: '2026-08-17T15:15:00Z' },
      { problem_id: '7', problem_position: 7, submission_count: 2, score: 1, last_submit: '2026-08-17T15:25:00Z' },
      { problem_id: '8', problem_position: 8, submission_count: 1, score: 1, last_submit: '2026-08-17T15:35:00Z' },
      { problem_id: '9', problem_position: 9, submission_count: 3, score: 0, last_submit: '2026-08-17T15:45:00Z' },
      { problem_id: '10', problem_position: 10, submission_count: 1, score: 1, last_submit: '2026-08-17T15:50:00Z' },
      { problem_id: '11', problem_position: 11, submission_count: 2, score: 1, last_submit: '2026-08-17T16:00:00Z' },
      { problem_id: '12', problem_position: 12, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '13', problem_position: 13, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '14', problem_position: 14, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '15', problem_position: 15, submission_count: 0, score: 0, last_submit: '' },
    ],
  },
  {
    name: 'Team 3',
    score: 7,
    penalty: 200,
    details: [
      { problem_id: '1', problem_position: 1, submission_count: 1, score: 1, last_submit: '2026-08-17T14:20:00Z' },
      { problem_id: '2', problem_position: 2, submission_count: 3, score: 0, last_submit: '2026-08-17T15:00:00Z' },
      { problem_id: '3', problem_position: 3, submission_count: 2, score: 1, last_submit: '2026-08-17T14:55:00Z' },
      { problem_id: '4', problem_position: 4, submission_count: 1, score: 1, last_submit: '2026-08-17T15:10:00Z' },
      { problem_id: '5', problem_position: 5, submission_count: 2, score: 1, last_submit: '2026-08-17T15:30:00Z' },
      { problem_id: '6', problem_position: 6, submission_count: 4, score: 0, last_submit: '2026-08-17T15:40:00Z' },
      { problem_id: '7', problem_position: 7, submission_count: 1, score: 1, last_submit: '2026-08-17T15:45:00Z' },
      { problem_id: '8', problem_position: 8, submission_count: 2, score: 1, last_submit: '2026-08-17T16:00:00Z' },
      { problem_id: '9', problem_position: 9, submission_count: 1, score: 1, last_submit: '2026-08-17T16:10:00Z' },
      { problem_id: '10', problem_position: 10, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '11', problem_position: 11, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '12', problem_position: 12, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '13', problem_position: 13, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '14', problem_position: 14, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '15', problem_position: 15, submission_count: 0, score: 0, last_submit: '' },
    ],
  },
  {
    name: 'Team 4',
    score: 5,
    penalty: 180,
    details: [
      { problem_id: '1', problem_position: 1, submission_count: 2, score: 1, last_submit: '2026-08-17T14:35:00Z' },
      { problem_id: '2', problem_position: 2, submission_count: 1, score: 1, last_submit: '2026-08-17T14:45:00Z' },
      { problem_id: '3', problem_position: 3, submission_count: 3, score: 0, last_submit: '2026-08-17T15:20:00Z' },
      { problem_id: '4', problem_position: 4, submission_count: 1, score: 1, last_submit: '2026-08-17T15:30:00Z' },
      { problem_id: '5', problem_position: 5, submission_count: 2, score: 1, last_submit: '2026-08-17T15:50:00Z' },
      { problem_id: '6', problem_position: 6, submission_count: 1, score: 1, last_submit: '2026-08-17T16:00:00Z' },
      { problem_id: '7', problem_position: 7, submission_count: 4, score: 0, last_submit: '2026-08-17T16:10:00Z' },
      { problem_id: '8', problem_position: 8, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '9', problem_position: 9, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '10', problem_position: 10, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '11', problem_position: 11, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '12', problem_position: 12, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '13', problem_position: 13, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '14', problem_position: 14, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '15', problem_position: 15, submission_count: 0, score: 0, last_submit: '' },
    ],
  },
  {
    name: 'Team 5',
    score: 3,
    penalty: 250,
    details: [
      { problem_id: '1', problem_position: 1, submission_count: 1, score: 1, last_submit: '2026-08-17T14:40:00Z' },
      { problem_id: '2', problem_position: 2, submission_count: 5, score: 0, last_submit: '2026-08-17T15:30:00Z' },
      { problem_id: '3', problem_position: 3, submission_count: 2, score: 1, last_submit: '2026-08-17T15:50:00Z' },
      { problem_id: '4', problem_position: 4, submission_count: 3, score: 0, last_submit: '2026-08-17T16:00:00Z' },
      { problem_id: '5', problem_position: 5, submission_count: 1, score: 1, last_submit: '2026-08-17T16:10:00Z' },
      { problem_id: '6', problem_position: 6, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '7', problem_position: 7, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '8', problem_position: 8, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '9', problem_position: 9, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '10', problem_position: 10, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '11', problem_position: 11, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '12', problem_position: 12, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '13', problem_position: 13, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '14', problem_position: 14, submission_count: 0, score: 0, last_submit: '' },
      { problem_id: '15', problem_position: 15, submission_count: 0, score: 0, last_submit: '' },
    ],
  },
];

const UPCOMING_RANKINGS: Ranking[] = [
  { name: 'Team 1', score: 0, penalty: 0, details: [] },
  { name: 'Team 2', score: 0, penalty: 0, details: [] },
  { name: 'Team 3', score: 0, penalty: 0, details: [] },
  { name: 'Team 4', score: 0, penalty: 0, details: [] },
  { name: 'Team 5', score: 0, penalty: 0, details: [] },
];

function ContestRankingPage({
  contest,
  rankings,
  currentTeam,
}: {
  contest: ContestType;
  rankings: Ranking[];
  currentTeam?: string;
}) {
  return (
    <DashboardLayout>
      <Contest contest={contest} />
      <Standings rankings={rankings} problemLabels={MOCK_PROBLEM_LABELS} currentTeam={currentTeam} />
    </DashboardLayout>
  );
}

const meta: Meta<typeof ContestRankingPage> = {
  title: 'Pages/ContestRanking',
  component: ContestRankingPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => <Story />,
      });
      const router = createRouter({
        routeTree: rootRoute,
        history: createMemoryHistory({ initialEntries: ['/'] }),
      });
      return <RouterProvider router={router} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ContestRankingPage>;

export const BeforeContest: Story = {
  name: '1. Trước khi bắt đầu',
  args: {
    contest: {
      id: '1',
      name: 'Olympic 2026 Team Selection — Day 1',
      start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      problems: [],
    },
    rankings: UPCOMING_RANKINGS,
  },
};

export const InProgressContest: Story = {
  name: '2. Đang trong cuộc thi',
  args: {
    contest: {
      id: '1',
      name: 'Olympic 2026 Team Selection — Day 1',
      start: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
      problems: [],
    },
    rankings: RUNNING_RANKINGS,
    currentTeam: 'Team 3',
  },
};

export const AfterContestEnded: Story = {
  name: '3. Sau khi kết thúc',
  args: {
    contest: {
      id: '1',
      name: 'Olympic 2026 Team Selection — Day 1',
      start: '2026-08-17T14:00:00Z',
      end: '2026-08-17T17:00:00Z',
      problems: [],
    },
    rankings: RUNNING_RANKINGS,
  },
};
