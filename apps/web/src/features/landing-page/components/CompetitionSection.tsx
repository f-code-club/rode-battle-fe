import * as Dialog from '@radix-ui/react-dialog';
import { HelpCircle, X } from 'lucide-react';

interface Feature {
  id: string;
  no: string;
  title: string;
  description: string;
  detail: string;
}

const COMPETITION_FEATURES: Feature[] = [
  {
    id: 'team',
    no: '01',
    title: 'Thi theo đội',
    description: 'Mỗi đội 2-3 thành viên, đăng ký cùng nhau ngay từ vòng loại.',
    detail:
      'Các thí sinh có thể tự thành lập đội từ 2 đến 3 thành viên. Nếu bạn chưa có đội, Ban tổ chức sẽ hỗ trợ ghép đội trong buổi ôn tập trước giải đấu. Đội trưởng sẽ đại diện đăng ký thông tin đội thi và nhận các thông báo chính thức từ ban tổ chức.',
  },
  {
    id: 'rounds',
    no: '02',
    title: '3 vòng thi',
    description: 'Vòng loại — Bán kết — Chung kết, độ khó tăng dần qua từng vòng.',
    detail:
      'Giải đấu được thiết kế gồm 3 chặng tranh tài chính thức:\n\n• Vòng Loại: Thi đấu online dưới hình thức giải các bài tập trên nền tảng của ban tổ chức để sàng lọc những đội xuất sắc nhất.\n• Bán Kết: Thi đấu tập trung tại trường (offline) với độ khó thuật toán tăng cao.\n• Chung Kết: Trận đấu chung cuộc đối kháng trực tiếp theo thời gian thực để tìm ra nhà vô địch R.ode Battle.',
  },
  {
    id: 'problems',
    no: '03',
    title: 'Đề thi thực chiến',
    description: 'Kết hợp thuật toán cổ điển và bài toán ứng dụng thực tế.',
    detail:
      'Đề thi được biên soạn bởi Ban chuyên môn F-Code, kiểm định kỹ lưỡng. Nội dung kết hợp giữa các bài toán cấu trúc dữ liệu và giải thuật kinh điển (Đồ thị, Quy hoạch động, Tham lam,...) với các bài toán mô phỏng tối ưu hóa thực tế trong doanh nghiệp, đòi hỏi khả năng tư duy và lập trình nhanh nhẹn.',
  },
  {
    id: 'realtime',
    no: '04',
    title: 'Chấm điểm real-time',
    description: 'Kết quả cập nhật trực tiếp trên bảng xếp hạng online.',
    detail:
      'Tất cả các bài nộp sẽ được chấm tự động bằng hệ thống chấm điểm trực tuyến. Kết quả (Accept, Wrong Answer, TLE,...) sẽ phản hồi ngay lập tức. Bảng xếp hạng trực tuyến (Leaderboard) được hiển thị công khai và cập nhật liên tục điểm số, số lần nộp phạt và thời gian giải bài của từng đội.',
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-base font-bold">{feature.no}</span>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="cursor-pointer rounded-full p-1 text-gray-400 transition-all duration-200 hover:bg-green-50/60 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              aria-label={`Xem chi tiết ${feature.title}`}
            >
              <HelpCircle className="h-4.5 w-4.5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="animate-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" />
            <Dialog.Content className="animate-modal-content fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-xl focus:outline-none">
              <div className="flex shrink-0 items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold">
                    {feature.no}
                  </span>
                  <Dialog.Title className="text-lg font-bold text-gray-900">{feature.title}</Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    aria-label="Đóng"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>

              <Dialog.Description className="flex-1 overflow-y-auto py-6 text-sm leading-relaxed whitespace-pre-line text-gray-600">
                {feature.detail}
              </Dialog.Description>

              <div className="flex shrink-0 justify-end border-t border-gray-100 pt-4">
                <Dialog.Close asChild>
                  <button className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95">
                    Đóng
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <h3 className="mb-3 text-lg font-bold text-gray-950">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
    </div>
  );
}

export default function CompetitionSection() {
  return (
    <section id="competition" className="bg-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-green-600 uppercase">THE COMPETITION</p>
          <h2 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            R.ode Battle là gì?
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700">
            R.ode Battle là cuộc thi lập trình thi đấu theo thời gian thực, nơi các đội giải quyết bài toán thuật toán
            và xử lý tình huống thực tế dưới áp lực thời gian. Cuộc thi mở cho sinh viên tất cả các trường đại học,
            không giới hạn ở Đại học FPT.
          </p>
          <p className="text-xs leading-relaxed text-gray-500 italic md:text-sm">
            A real-time coding battle open to students from any university — teams race against the clock and each
            other.
          </p>
        </div>
        <div className="divide-y divide-gray-200/50 overflow-hidden rounded-lg border border-gray-200/50 bg-white shadow-sm md:grid md:grid-cols-4 md:divide-x md:divide-y-0 md:divide-gray-200/50">
          {COMPETITION_FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
