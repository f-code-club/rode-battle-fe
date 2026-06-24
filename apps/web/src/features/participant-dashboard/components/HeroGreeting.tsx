import { Swords } from 'lucide-react';

export default function HeroGreeting() {
  return (
    <div className="mb-6 overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
      <div className="flex items-center gap-2 bg-linear-to-r from-green-700 to-green-800 px-4 py-2 text-white">
        <Swords className="relative z-10 size-5 shrink-0 text-green-200" strokeWidth={1.75} />
        <h2 className="m-0 text-base font-bold tracking-wide text-white">Chào mừng bạn đến với R.ode Battle!</h2>
      </div>
      <div className="p-5 text-sm leading-relaxed font-normal text-slate-600">
        <p className="mb-4">
          Chào mừng các "Coders" đã quay trở lại với đấu trường <strong>R.ode Battle</strong>. Đây là nơi bạn có thể thử
          thách bản thân với hàng ngàn bài tập từ cơ bản đến nâng cao, rèn luyện kỹ năng giải thuật và sẵn sàng cho các
          kỳ thi Olympic, HSGQG.
        </p>
        <p>
          Hãy kiểm tra danh sách các cuộc thi đang diễn ra và đừng quên theo dõi bảng thông báo để không bỏ lỡ những cập
          nhật quan trọng từ Ban Quản Trị!
        </p>
      </div>
    </div>
  );
}
