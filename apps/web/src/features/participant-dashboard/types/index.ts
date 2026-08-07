import type { ReactNode } from 'react';

export interface Contest {
  id: number;
  title: string;
  startTime: string;
  path: string;
}

export interface Announcement {
  id: number;
  author: string;
  dateTime: string;
  timeAgo: string;
  title: string;
  image: string;
  content: ReactNode;
}
