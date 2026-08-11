const STATS = [
  { id: 'founded', value: '2014', label: 'Năm thành lập', sublabel: 'FOUNDED' },
  { id: 'members', value: '300+', label: 'Thành viên', sublabel: 'MEMBERS' },
  { id: 'seasons', value: '5', label: 'Mùa đã tổ chức', sublabel: 'SEASONS RUN' },
  { id: 'contestants', value: '500+', label: 'Thí sinh tham gia', sublabel: 'TOTAL CONTESTANTS' },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-2 gap-y-6 rounded-xl bg-white px-2 py-6 shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.1),0_0.5rem_1.5rem_rgba(0,0,0,0.08)] md:grid-cols-4 md:divide-x md:divide-gray-200">
      {STATS.map((stat) => (
        <div key={stat.id} className="flex flex-col items-start px-6">
          <span className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] leading-none font-black text-gray-900">
            {stat.value}
          </span>
          <span className="mt-1 text-xs leading-tight font-medium text-gray-700">{stat.label}</span>
          <span className="mt-0.5 text-[0.625rem] font-bold tracking-widest text-green-600 uppercase">
            {stat.sublabel}
          </span>
        </div>
      ))}
    </div>
  );
}
