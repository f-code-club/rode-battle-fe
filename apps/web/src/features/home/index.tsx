import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

export const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center duration-1000">
        <div className="space-y-4">
          <h1 className="from-brand-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
            Rode Battle
          </h1>
          <p className="text-text mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl">
            The ultimate platform for competitive coding challenges and real-time battle arenas.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="primary">
            Start Battle
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-8 text-left md:grid-cols-3">
          {[
            {
              title: 'Real-time Battles',
              description: 'Compete head-to-head with developers worldwide in instant coding duels.',
              icon: '⚡',
            },
            {
              title: 'Ranked Ladder',
              description: 'Climb the global rankings and prove your skills in different programming languages.',
              icon: '🏆',
            },
            {
              title: 'Code Judge',
              description: 'Lightning-fast automated code evaluation across multiple test cases.',
              icon: '🧠',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="border-border bg-accent-bg/5 hover:bg-accent-bg/10 group cursor-default rounded-2xl border p-6 transition-colors"
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-text/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
