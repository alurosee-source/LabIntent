export function HowWorksCoach() {
  const steps = [
    { icon: "⏱", text: "Игрок проходит тест перед тренировкой (60 секунд)" },
    { icon: "📈", text: "Система строит личный baseline каждого игрока" },
    { icon: "👁", text: "Тренер видит кто готов, у кого сигнал тревоги" },
  ];

  return (
    <section className="py-14 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-8">Как это работает</h3>
        <div className="space-y-5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-2xl w-8 flex-shrink-0">{s.icon}</span>
              <span className="text-gray-300">→ {s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
