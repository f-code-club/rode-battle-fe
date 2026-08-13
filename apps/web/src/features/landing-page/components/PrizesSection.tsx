import { Trophy } from 'lucide-react';

export default function PrizesSection() {
  return (
    <section
      id="prizes"
      className="font-heading relative overflow-hidden bg-neutral-950 px-4 py-20 text-white md:py-24"
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-yellow-500/12 blur-[7.5rem]" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-75 w-75 rounded-full bg-red-500/8 blur-[6.25rem]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-xs font-extrabold tracking-[0.25em] text-amber-500 uppercase">PRIZE POOL</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Giải thưởng</h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-start justify-center gap-16 md:flex-row md:gap-24">
          <div className="flex w-full max-w-85 flex-col items-center md:max-w-100">
            <h3 className="mb-12 text-sm font-extrabold tracking-[0.2em] text-amber-500 uppercase">FRONT-END</h3>

            <div className="flex w-full items-end justify-center">
              <div className="flex w-24 flex-col items-center sm:w-28">
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-gray-400 uppercase">
                  1st Runner Up
                </span>
                <span className="mt-1 mb-3 text-xs font-extrabold whitespace-nowrap text-white md:text-sm">
                  5.000.000đ
                </span>
                <div className="flex h-20 w-full items-center justify-center rounded-t-sm border-t-2 border-gray-400/60 bg-linear-to-b from-gray-400/10 via-gray-400/3 to-transparent shadow-md sm:h-24 md:h-28">
                  <span className="text-3xl font-extrabold text-gray-400/50 drop-shadow-md md:text-4xl">2</span>
                </div>
              </div>

              <div className="z-10 flex w-32 flex-col items-center px-1 sm:w-36">
                <div className="relative mb-1 flex items-center justify-center">
                  <div className="absolute h-10 w-10 animate-pulse rounded-full bg-yellow-400/40 blur-md" />
                  <Trophy className="relative z-10 h-7 w-7 text-yellow-400 drop-shadow-[0_0_10px_var(--color-yellow-400)] md:h-8 md:w-8" />
                </div>
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-yellow-400 uppercase drop-shadow-[0_0_4px_var(--color-yellow-500)]">
                  CHAMPION
                </span>
                <span className="mt-1 mb-3 text-sm font-black whitespace-nowrap text-white md:text-base lg:text-lg">
                  10.000.000đ
                </span>
                <div className="flex h-28 w-full items-center justify-center rounded-t-sm border-t-2 border-yellow-400 bg-linear-to-b from-yellow-500/25 via-yellow-500/5 to-transparent shadow-lg shadow-yellow-500/20 sm:h-32 md:h-38">
                  <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_var(--color-yellow-400)] md:text-5xl">
                    1
                  </span>
                </div>
              </div>

              <div className="flex w-24 flex-col items-center sm:w-28">
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-amber-600 uppercase">
                  2nd Runner Up
                </span>
                <span className="mt-1 mb-3 text-xs font-extrabold whitespace-nowrap text-white md:text-sm">
                  3.000.000đ
                </span>
                <div className="flex h-16 w-full items-center justify-center rounded-t-sm border-t-2 border-amber-600/60 bg-linear-to-b from-amber-600/10 via-amber-600/3 to-transparent shadow sm:h-20 md:h-22">
                  <span className="text-3xl font-extrabold text-amber-600/60 drop-shadow-md md:text-4xl">3</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-85 flex-col items-center md:max-w-100">
            <h3 className="mb-12 text-sm font-extrabold tracking-[0.2em] text-amber-500 uppercase">BACK-END</h3>

            <div className="flex w-full items-end justify-center">
              <div className="flex w-24 flex-col items-center sm:w-28">
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-gray-400 uppercase">
                  1st Runner Up
                </span>
                <span className="mt-1 mb-3 text-xs font-extrabold whitespace-nowrap text-white md:text-sm">
                  5.000.000đ
                </span>
                <div className="flex h-20 w-full items-center justify-center rounded-t-sm border-t-2 border-gray-400/60 bg-linear-to-b from-gray-400/10 via-gray-400/3 to-transparent shadow-md sm:h-24 md:h-28">
                  <span className="text-3xl font-extrabold text-gray-400/50 drop-shadow-md md:text-4xl">2</span>
                </div>
              </div>

              <div className="z-10 flex w-32 flex-col items-center px-1 sm:w-36">
                <div className="relative mb-1 flex items-center justify-center">
                  <div className="absolute h-10 w-10 animate-pulse rounded-full bg-yellow-400/40 blur-md" />
                  <Trophy className="relative z-10 h-7 w-7 text-yellow-400 drop-shadow-[0_0_10px_var(--color-yellow-400)] md:h-8 md:w-8" />
                </div>
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-yellow-400 uppercase drop-shadow-[0_0_4px_var(--color-yellow-500)]">
                  CHAMPION
                </span>
                <span className="mt-1 mb-3 text-sm font-black whitespace-nowrap text-white md:text-base lg:text-lg">
                  10.000.000đ
                </span>
                <div className="flex h-28 w-full items-center justify-center rounded-t-sm border-t-2 border-yellow-400 bg-linear-to-b from-yellow-500/25 via-yellow-500/5 to-transparent shadow-lg shadow-yellow-500/20 sm:h-32 md:h-38">
                  <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_var(--color-yellow-400)] md:text-5xl">
                    1
                  </span>
                </div>
              </div>

              <div className="flex w-24 flex-col items-center sm:w-28">
                <span className="text-center text-[0.56rem] font-bold tracking-wider text-amber-600 uppercase">
                  2nd Runner Up
                </span>
                <span className="mt-1 mb-3 text-xs font-extrabold whitespace-nowrap text-white md:text-sm">
                  3.000.000đ
                </span>
                <div className="flex h-16 w-full items-center justify-center rounded-t-sm border-t-2 border-amber-600/60 bg-linear-to-b from-amber-600/10 via-amber-600/3 to-transparent shadow sm:h-20 md:h-22">
                  <span className="text-3xl font-extrabold text-amber-600/60 drop-shadow-md md:text-4xl">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-153 text-center text-xs leading-relaxed font-medium text-gray-500 md:text-sm">
          Ngoài giải thưởng chính, ban tổ chức trao thêm các giải phụ và ghi nhận đặc biệt cho những thí sinh xuất sắc ở
          mỗi hạng mục.
        </p>
      </div>
    </section>
  );
}
