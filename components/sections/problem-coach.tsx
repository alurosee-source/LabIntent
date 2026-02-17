export function ProblemCoach() {
  const lines = [
    "Спад замечают после 5 проигранных матчей — не до",
    "Нет психолога — тренер следит за состоянием интуитивно",
    "Игрок обязан играть по контракту даже когда не в форме",
  ];

  return (
    <section className="py-14 px-4 bg-gray-900/50">
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-4">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-lg">
              <span className="text-red-600 mt-1 flex-shrink-0">—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
