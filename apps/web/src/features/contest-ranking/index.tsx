import DashboardLayout from '@/components/layout/DashboardLayout';
import Contest from './components/Contest';
import Standings from './components/Standings';
import type { Contest as ContestType, Ranking } from './types';

const PROBLEM_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

const CONTEST_INFO: ContestType = {
  id: '1',
  name: 'Olympic 2026 Team Selection — Day 1',
  start: '2026-08-17T14:00:00Z',
  end: '2026-08-17T17:00:00Z',
  problems: [
    { id: '1', position: 1 },
    { id: '2', position: 2 },
    { id: '3', position: 3 },
    { id: '4', position: 4 },
    { id: '5', position: 5 },
    { id: '6', position: 6 },
    { id: '7', position: 7 },
    { id: '8', position: 8 },
    { id: '9', position: 9 },
    { id: '10', position: 10 },
    { id: '11', position: 11 },
    { id: '12', position: 12 },
    { id: '13', position: 13 },
    { id: '14', position: 14 },
    { id: '15', position: 15 },
  ],
};

const RANKINGS: Ranking[] = [
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

export default function ContestRanking() {
  const rankings = RANKINGS;

  return (
    <DashboardLayout>
      <Contest contest={CONTEST_INFO} />
      <Standings rankings={rankings} problemLabels={PROBLEM_LABELS} currentTeam="Team 3" />
    </DashboardLayout>
  );
}
