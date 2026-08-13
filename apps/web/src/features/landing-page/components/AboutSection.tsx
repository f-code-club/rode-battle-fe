export default function AboutSection() {
  return (
    <section id="about" className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-green-600 uppercase">WHO WE ARE</p>

            <h2 className="font-heading mb-5 text-4xl leading-tight font-black text-gray-900">Về F-Code</h2>
            <p className="mb-4 max-w-lg text-sm leading-relaxed text-gray-700">
              <span className="font-semibold text-green-600">F-Code</span> là câu lạc bộ học thuật đầu tiên của FPT
              University, thành lập năm 2014 với mục tiêu tạo môi trường luyện tập,{' '}
              <span className="font-medium text-gray-900">giao lưu và phát triển kỹ năng lập trình</span> cho sinh viên.
              CLB thường xuyên tổ chức workshop, contest nội bộ và là đơn vị đứng sau R.ode Battle — cuộc thi lập trình
              thường niên mở rộng cho sinh viên nhiều trường đại học.
            </p>

            <p className="mb-8 max-w-md text-xs text-gray-400 italic">
              F-Code is FPT University's first academic club, founded in 2014 to build a competitive, collaborative
              programming community — and the organizer behind R.ode Battle.
            </p>

            <ul className="space-y-3">
              {[
                'Workshop kỹ thuật & chia sẻ kinh nghiệm hàng tháng',
                'Mentoring cho thành viên mới, luyện thuật toán định kỳ',
                'Tổ chức R.ode Battle — sân chơi mở cho sinh viên toàn quốc',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 shrink-0 font-bold text-gray-400">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2">
            <div className="aspect-3/2 w-full overflow-hidden rounded-xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <img
                src="/about-fcode.jpg"
                alt="Ảnh thành viên CLB F-Code"
                width={1920}
                height={1280}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
