function CompletedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      ĐÃ XONG
    </span>
  );
}

function OngoingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/15 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-red-600 uppercase">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
      </span>
      ĐANG DIỄN RA
    </span>
  );
}

function UpcomingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/60 bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      SẮP DIỄN RA
    </span>
  );
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-24">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-green-600 uppercase">TIMELINE</p>
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Quy trình thi đấu
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative flex min-h-27.5 w-full items-stretch md:min-h-32.5">
            <div className="absolute top-4 -bottom-4 left-4 z-0 w-0.5 -translate-x-1/2 bg-green-600 md:left-1/2" />

            <div className="hidden pr-10 text-right md:block md:w-1/2">
              <div className="flex flex-col items-end text-right">
                <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                  <CompletedBadge />
                  <span className="font-medium text-gray-400">01/09</span>
                </div>
                <h3 className="mb-2 text-lg leading-snug font-medium text-gray-400">Mở đăng ký</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-400/80">
                  Form đăng ký chính thức được công bố trên fanpage F-Code.
                </p>
              </div>
            </div>

            <div className="relative flex w-8 shrink-0 flex-col items-center md:w-16">
              <div className="z-10 mt-1.5 h-5 w-5 rounded-full border-[5px] border-green-600 bg-white shadow-sm" />
            </div>

            <div className="w-full pb-10 pl-4 text-left md:w-1/2 md:pb-14 md:pl-10">
              <div className="block md:hidden">
                <div className="flex flex-col items-start text-left">
                  <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                    <CompletedBadge />
                    <span className="font-medium text-gray-400">01/09</span>
                  </div>
                  <h3 className="mb-2 text-lg leading-snug font-medium text-gray-400">Mở đăng ký</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-400/80">
                    Form đăng ký chính thức được công bố trên fanpage F-Code.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-27.5 w-full items-stretch md:min-h-32.5">
            <div className="absolute top-4 -bottom-4 left-4 z-0 w-0.5 -translate-x-1/2 bg-green-600 md:left-1/2" />

            <div className="hidden pr-10 text-right md:block md:w-1/2" />

            <div className="relative flex w-8 shrink-0 flex-col items-center md:w-16">
              <div className="z-10 mt-1.5 h-5 w-5 rounded-full border-[5px] border-green-600 bg-white shadow-sm" />
            </div>

            <div className="w-full pb-10 pl-4 text-left md:w-1/2 md:pb-14 md:pl-10">
              <div className="flex flex-col items-start text-left">
                <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                  <span className="font-medium text-gray-400">30/09</span>
                  <CompletedBadge />
                </div>
                <h3 className="mb-2 text-lg leading-snug font-medium text-gray-400">Đóng đăng ký</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-400/80">
                  Hạn cuối nhận đăng ký từ các đội thi.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-27.5 w-full items-stretch md:min-h-32.5">
            <div className="absolute top-4 -bottom-4 left-4 z-0 w-0.5 -translate-x-1/2 bg-gray-200 md:left-1/2" />

            <div className="hidden pr-10 text-right md:block md:w-1/2">
              <div className="flex flex-col items-end text-right">
                <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                  <OngoingBadge />
                  <span className="font-semibold text-gray-500">10/10</span>
                </div>
                <h3 className="mb-2 text-lg leading-snug font-bold text-gray-950">Vòng loại (Online)</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                  Thi trực tuyến trên hệ thống, giải đề trong 90 phút.
                </p>
              </div>
            </div>

            <div className="relative flex w-8 shrink-0 flex-col items-center md:w-16">
              <span className="absolute z-0 mt-1.5 h-5 w-5 animate-ping rounded-full bg-red-400 opacity-75" />
              <div className="z-10 mt-1.5 h-5 w-5 rounded-full border-[5px] border-red-500 bg-white shadow-md shadow-red-500/20" />
            </div>

            <div className="w-full pb-10 pl-4 text-left md:w-1/2 md:pb-14 md:pl-10">
              <div className="block md:hidden">
                <div className="flex flex-col items-start text-left">
                  <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                    <OngoingBadge />
                    <span className="font-semibold text-gray-500">10/10</span>
                  </div>
                  <h3 className="mb-2 text-lg leading-snug font-bold text-gray-950">Vòng loại (Online)</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                    Thi trực tuyến trên hệ thống, giải đề trong 90 phút.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-27.5 w-full items-stretch md:min-h-32.5">
            <div className="absolute top-4 -bottom-4 left-4 z-0 w-0.5 -translate-x-1/2 bg-gray-200 md:left-1/2" />

            <div className="hidden pr-10 text-right md:block md:w-1/2" />

            <div className="relative flex w-8 shrink-0 flex-col items-center md:w-16">
              <div className="z-10 mt-1.5 h-5 w-5 rounded-full border-[5px] border-gray-300 bg-white shadow-sm" />
            </div>

            <div className="w-full pb-10 pl-4 text-left md:w-1/2 md:pb-14 md:pl-10">
              <div className="flex flex-col items-start text-left">
                <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                  <span className="font-medium text-gray-400">25/10</span>
                  <UpcomingBadge />
                </div>
                <h3 className="mb-2 text-lg leading-snug font-bold text-gray-900">Vòng bán kết</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-500">Thi trực tiếp tại Đại học FPT.</p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-27.5 w-full items-stretch md:min-h-32.5">
            <div className="hidden pr-10 text-right md:block md:w-1/2">
              <div className="flex flex-col items-end text-right">
                <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                  <UpcomingBadge />
                  <span className="font-medium text-gray-400">15/11</span>
                </div>
                <h3 className="mb-2 text-lg leading-snug font-bold text-gray-900">Chung kết & Trao giải</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                  Đối kháng trực tiếp và lễ vinh danh các đội xuất sắc nhất.
                </p>
              </div>
            </div>

            <div className="relative flex w-8 shrink-0 flex-col items-center md:w-16">
              <div className="z-10 mt-1.5 h-5 w-5 rounded-full border-[5px] border-gray-300 bg-white shadow-sm" />
            </div>

            <div className="w-full pb-10 pl-4 text-left md:w-1/2 md:pb-14 md:pl-10">
              <div className="block md:hidden">
                <div className="flex flex-col items-start text-left">
                  <div className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold">
                    <UpcomingBadge />
                    <span className="font-medium text-gray-400">15/11</span>
                  </div>
                  <h3 className="mb-2 text-lg leading-snug font-bold text-gray-900">Chung kết & Trao giải</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                    Đối kháng trực tiếp và lễ vinh danh các đội xuất sắc nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
