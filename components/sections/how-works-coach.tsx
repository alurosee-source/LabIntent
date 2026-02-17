export function HowWorksCoach() {
  const steps = [
    {
      num: "01",
      title: "Короткий тест перед тренировкой",
      desc: "Каждый игрок проходит 60-секундный тест в браузере — скорость реакции и контроль импульсов. Никакого железа, никаких установок.",
    },
    {
      num: "02",
      title: "Система строит личный baseline",
      desc: "После нескольких дней система знает норму каждого игрока и замечает отклонения — усталость, стресс, снижение концентрации.",
    },
    {
      num: "03",
      title: "Тренер видит дашборд команды",
      desc: "Одним взглядом: кто в форме, у кого тревожный сигнал. Данные по реакции, сну и стрессу по каждому игроку.",
    },
  ];

  return (
    <section id="how-works" className="py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
            Как работает
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            Три шага — и у вас есть данные
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-bold text-red-600/20 mb-4 font-mono">{s.num}</div>
              <h4 className="text-lg font-bold mb-3">{s.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-0 translate-x-1/2 text-gray-700 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
