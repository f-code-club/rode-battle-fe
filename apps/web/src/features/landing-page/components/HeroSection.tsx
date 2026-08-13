import { Link } from '@tanstack/react-router';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="R.ode Battle event"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col items-center justify-center gap-18 px-4 pt-18 pb-16 text-center">
        <div className="flex flex-col items-center">
          <TypeAnimation
            sequence={['R.ODE Battle']}
            speed={10}
            repeat={0}
            cursor={true}
            wrapper="h1"
            aria-label="R.ODE Battle"
            className="font-heading text-[clamp(3rem,10vw,8rem)] leading-[0.92] font-black tracking-[-0.02em] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_6px_32px_rgba(0,0,0,0.7)]"
          />

          <div className="mt-4 h-0.75 w-24 rounded-full bg-amber-400 opacity-90" />

          <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.7)]">
            Đấu trường lập trình thường niên do <strong className="text-white">F-Code</strong> tổ chức — sinh viên từ
            khắp các trường đại học tranh tài thuật giải, tốc độ code và bản lĩnh thi đấu thực chiến.
          </p>

          <p className="mt-2 max-w-sm text-[0.8rem] leading-relaxed text-white/75 italic [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
            The annual real-time coding battle hosted by F-Code Club — open to students from every university.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-7 py-3 text-sm font-bold tracking-wide text-white shadow-[0_2px_12px_color-mix(in_oklch,var(--color-green-600)_50%,transparent)] transition-all duration-200 hover:no-underline hover:shadow-[0_4px_20px_color-mix(in_oklch,var(--color-green-600)_65%,transparent)] hover:brightness-110 active:scale-95"
          >
            Đăng ký tham gia
          </Link>
          <a
            href="#rules"
            className="inline-flex items-center justify-center rounded-md border border-white/50 px-7 py-3 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:border-white/80 hover:bg-white/10 hover:no-underline active:scale-95"
          >
            Xem thể lệ thi
          </a>
        </div>
      </div>
    </section>
  );
}
