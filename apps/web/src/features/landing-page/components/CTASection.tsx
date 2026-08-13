export default function CTASection() {
  return (
    <section className="px-4 py-20 text-center md:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <p className="mb-4 text-[0.68rem] font-bold tracking-[0.25em] text-emerald-800 uppercase">JOIN THE BATTLE</p>
        <h2 className="font-heading mb-6 text-3xl leading-tight font-black tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
          Sẵn sàng bước vào R.ODE Battle?
        </h2>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
          Tập hợp đội của bạn và đăng ký ngay — cuộc thi mở cho sinh viên tất cả
          <br className="hidden sm:inline" /> các trường đại học, không riêng Đại học FPT.
        </p>
        <button className="cursor-pointer rounded-lg bg-neutral-950 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 hover:shadow-lg focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 focus:outline-none active:scale-[0.98]">
          Đăng ký tham gia ngay
        </button>
      </div>
    </section>
  );
}
