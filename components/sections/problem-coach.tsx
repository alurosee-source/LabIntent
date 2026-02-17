export function ProblemCoach() {
  const lines = [
    "Спад замечают после 5 проигранных матчей — не до",
    "Нет психолога — тренер следит за состоянием интуитивно",
    "Игрок обязан играть по контракту даже когда не в форме",
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="max-w-2xl mx-auto space-y-3">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-lg bg-black border border-gray-800"
          >
            <span className="text-red-600 font-bold text-lg flex-shrink-0 mt-0.5">—</span>
            <span className="text-gray-300 text-base leading-relaxed">{line}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
