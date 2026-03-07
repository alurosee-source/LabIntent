export function ProblemCoach() {
  const lines = [
    "Performance drops are noticed after 5 lost matches — not before",
    "No sports psychologist — coaches track player state by intuition",
    "Players are contractually required to play even when not ready",
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
