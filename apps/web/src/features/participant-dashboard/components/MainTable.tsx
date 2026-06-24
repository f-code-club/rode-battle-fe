import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Megaphone, MoreHorizontal, Trophy, User } from 'lucide-react';
import { useState } from 'react';
import type { Announcement, Contest } from '../types';

const CONTESTS: Contest[] = [
  {
    id: 1,
    title: 'Kỳ thi chọn đội tuyển Olympic 2026 - Ngày 1',
    startTime: '26 Tháng 4, 2026, 20:00',
    path: '/contests/1',
  },
  {
    id: 2,
    title: 'Kỳ thi chọn đội tuyển Olympic 2026 - Ngày 2',
    startTime: '26 Tháng 4, 2026, 20:00',
    path: '/contests/2',
  },
  {
    id: 3,
    title: 'Kỳ thi chọn Đội tuyển HSGQG Bắc Ninh 2025-2026',
    startTime: '22 Tháng 4, 2026, 20:00',
    path: '/contests/3',
  },
];

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    author: 'Ban Quản Trị',
    dateTime: '2026-05-07T19:40',
    timeAgo: '12 phút trước',
    title: 'Cơ cấu giải thưởng cuộc thi!',
    image: 'https://oj.vnoi.info/martor/917ebd0b-a8d8-4e2d-848f-f47ee54e8dfc.png',
    content: (
      <>
        Chúng tôi đang chuyển sang hệ thống tính điểm với tốc độ cập nhật nhanh hơn cho người dùng mới. Quá trình chuyển
        đổi sẽ bảo lưu điểm số hiện tại của bạn, nhưng độ biến động sẽ được tính toán lại dựa trên 12 kì thi gần nhất.
        Hãy đọc kỹ thay đổi trước khi tham gia vòng thi tiếp theo.
      </>
    ),
  },
  {
    id: 2,
    author: 'Ban Quản Trị',
    dateTime: '2026-05-06T15:00',
    timeAgo: '1 ngày trước',
    title: 'Cập nhật hệ thống chấm bài (Judge) phiên bản 2.5',
    image: 'https://oj.vnoi.info/martor/ee354e06-eb83-431a-a441-bd024e65ce56.png',
    content: (
      <>
        Hệ thống chấm bài vừa được nâng cấp lên phiên bản mới nhằm tối ưu hóa bộ nhớ và tăng tốc độ thực thi cho các
        ngôn ngữ như Python và Java. Một số lỗi nhỏ về giới hạn thời gian (TLE) không chính xác đã được khắc phục.
      </>
    ),
  },
];

export default function MainTable() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'contests'>('announcements');

  return (
    <section className="overflow-hidden rounded border border-slate-200 bg-white font-sans">
      <nav className="flex items-center justify-between border-b border-slate-100 px-4" aria-label="Phân loại nội dung">
        <ul className="m-0 flex list-none gap-8 p-0">
          <li>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex cursor-pointer items-center gap-2 border-b-2 py-4 text-sm font-bold transition-colors ${
                activeTab === 'announcements'
                  ? 'border-green-700 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Megaphone className="size-4" />
              Thông báo
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('contests')}
              className={`flex cursor-pointer items-center gap-2 border-b-2 py-4 text-sm font-bold transition-colors ${
                activeTab === 'contests'
                  ? 'border-green-700 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Trophy className="size-4" />
              Các cuộc thi đang diễn ra
            </button>
          </li>
        </ul>
        <button
          className="cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Thêm tùy chọn"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </nav>

      <div className="divide-y divide-slate-100">
        {activeTab === 'announcements' ? (
          <div className="divide-y divide-slate-100">
            {ANNOUNCEMENTS.map((item) => (
              <article key={item.id} className="p-6">
                <header className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full bg-green-700 p-2 text-white">
                      <User className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-sm leading-tight">
                        <span className="font-bold text-slate-900">{item.author}</span>
                      </div>
                      <time className="text-[11px] text-slate-400" dateTime={item.dateTime}>
                        {item.timeAgo}
                      </time>
                    </div>
                  </div>
                </header>

                <h3 className="mb-4 text-lg leading-tight font-bold text-slate-900">{item.title}</h3>

                <img src={item.image} alt={item.title} className="h-auto w-full rounded object-cover" />

                <div className="mt-4 mb-6 space-y-4 text-sm leading-relaxed text-slate-500">
                  <p>{item.content}</p>
                </div>
              </article>
            ))}
            <div className="flex items-center justify-center gap-2 border-t border-slate-100 p-4">
              <button className="cursor-not-allowed p-2 text-slate-400 hover:text-slate-600">
                <ChevronLeft className="size-4" />
              </button>
              <button className="cursor-pointer rounded bg-green-700 px-3 py-1 text-sm font-medium text-white">
                1
              </button>
              <button className="cursor-pointer rounded px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50">
                2
              </button>
              <button className="cursor-pointer p-2 text-slate-400 hover:text-slate-600">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {CONTESTS.map((contest) => (
              <div
                key={contest.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-col gap-1">
                  <Link to={contest.path as '/'} className="text-base font-medium text-blue-700 hover:underline">
                    {contest.title}
                  </Link>
                  <time className="text-sm text-slate-400">{contest.startTime}</time>
                </div>
                <button className="cursor-pointer rounded bg-green-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-800">
                  Tham gia
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
