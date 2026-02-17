export function BenefitsCoach() {
  const benefits = [
    {
      icon: "⚡",
      title: "Сигнал до официального матча",
      desc: "Вы видите спад до того, как он стал серией поражений. Время для вмешательства — тренировки, ротация, разговор с игроком.",
    },
    {
      icon: "📊",
      title: "Данные по каждому игроку",
      desc: "За весь период пилота — динамика реакции, сон, уровень стресса. Объективная картина, а не ощущения.",
    },
    {
      icon: "🌐",
      title: "Только браузер и 60 секунд",
      desc: "Никакого железа, никаких установок, никаких учётных записей для игроков. Просто ссылка перед тренировкой.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
            Что получает тренер
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            Конкретная польза с первой недели
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-black border border-gray-800 hover:border-red-600/30 transition-colors"
            >
              <div className="text-3xl mb-4">{b.icon}</div>
              <h4 className="text-lg font-bold mb-3">{b.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
