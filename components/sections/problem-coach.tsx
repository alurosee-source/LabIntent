export function ProblemCoach() {
  const problems = [
    {
      icon: "📉",
      title: "Спад формы виден только по статистике матчей",
      desc: "К моменту когда вы видите плохие матчи — уже поздно вмешиваться. Момент упущен.",
    },
    {
      icon: "🧠",
      title: "Нет психолога — тренер отслеживает состояние сам",
      desc: "Каждый день вручную оценивать готовность 5–10 игроков невозможно без данных.",
    },
    {
      icon: "📋",
      title: "Игрок на контракте обязан играть даже не в форме",
      desc: "Без объективных данных сложно принимать решения по составу и нагрузке.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
            Проблема
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            С чем сталкивается каждый тренер
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-black border border-gray-800 hover:border-red-600/30 transition-colors"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h4 className="text-lg font-bold mb-3">{p.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
