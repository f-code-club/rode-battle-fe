import { Swords } from 'lucide-react';

export default function HeroGreeting() {
  return (
    <div className="mb-6 overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
      <div className="flex items-center gap-2 bg-linear-to-r from-green-700 to-green-800 px-4 py-2 text-white">
        <Swords className="relative z-10 size-5 shrink-0 text-green-200" strokeWidth={1.75} />
        <h2 className="m-0 text-base font-bold tracking-wide text-white">Welcome to R.ode Battle!</h2>
      </div>
      <div className="p-5 text-sm leading-relaxed font-normal text-slate-600">
        <p className="mb-4">
          Welcome back, Coders! <strong>R.ode Battle</strong> is where you can challenge yourself with thousands of
          problems from beginner to advanced, sharpen your algorithmic thinking, and prepare for Olympic and national
          competitions.
        </p>
        <p>
          Check the active contests list and follow the announcement board so you don&apos;t miss important updates from
          the Admin team!
        </p>
      </div>
    </div>
  );
}
