"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations: Record<Language, any> = {
  ru: {
    hero: {
      badge: "Для рейтинговых тактических шутеров",
      title1: "Узнайте, на каком раунде",
      title2: "начинается слив.",
      subtitle: "Реакция и игра ухудшаются раньше, чем вы это замечаете. Мы ловим этот момент.",
      reactionLabel: "Реакция",
      roundLabel: "Раунд 14",
      btnJoinBeta: "Получить бета-доступ",
      btnRunTest: "Тест реакции",
      liveCount: "игроков анализируют свои сессии прямо сейчас"
    },
    reactionTest: {
      badge: "Тест реакции",
      title: "Проверь свою форму",
      subtitle: "30 кругов: зелёный — жми, красный — не жми",
      clickToStart: "Нажмите для старта",
      instructions: "🟢 Зелёный — жми быстро  •  🔴 Красный — не жми",
      btnStart: "Начать тест",
      btnTryAgain: "Ещё раз",
      scoreExcellent: "Отличная форма",
      scoreNormal: "Норма",
      scoreRest: "Стоит отдохнуть",
      avgReaction: "Средняя реакция",
      missed: "Пропущено",
      falseCl: "Ложные клики",
      btnSaveResult: "Сохранить результат",
      formNickname: "Никнейм",
      formNicknamePlaceholder: "твой ник в игре",
      formSleep: "Часы сна",
      formStress: "Уровень стресса",
      formMotivation: "Хочется играть",
      btnSave: "Сохранить результат",
      btnSaving: "Сохранение...",
      saveError: "Не удалось сохранить. Попробуй ещё раз.",
      savedTitle: "Результат сохранён",
      savedMessage: "Твоя динамика будет видна после 5 тестов"
    },
    pain: {
      badge: "Проблема",
      point1: "Начинаете 10–2. Заканчиваете 14–17.",
      point2: "Проигрываете дуэли, которые обычно выигрываете.",
      point3: "Прицел чистый. Тайминг — нет.",
      point4: "Тильт начинается до того, как вы его почувствуете.",
      point5: "Обвиняете тиммейтов. Это усталость.",
      conclusion1: "Схема очевидна.",
      conclusion2: "Форма не проседает за один раунд.",
      conclusion3: "Всё происходит постепенно. Большинство замечают слишком поздно."
    },
    howItWorks: {
      badge: "Технология",
      title: "Как это работает",
      subtitle: "ИИ-анализ игры в реальном времени",
      graphLabel: "Раунд",
      dropZone: "ЗОНА ПРОСЕДАНИЯ",
      feature1Title: "Трекинг в реальном времени",
      feature1Desc: "Реакция, точность прицела и качество решений измеряются каждый раунд.",
      feature2Title: "ИИ определяет паттерны",
      feature2Desc: "ИИ видит падение формы раньше, чем вы почувствуете усталость.",
      feature3Title: "Точные уведомления",
      feature3Desc: "Уведомления приходят в момент, когда вы начинаете просаживать.",
      feature4Title: "Историческая аналитика",
      feature4Desc: "Отслеживайте статистику и подбирайте оптимальную длину сессий."
    },
    whyItMatters: {
      badge: "Данные",
      title: "Почему это важно",
      stat1: "73%",
      stat1Title: "Проседание в лейт-гейме",
      stat1Desc: "игроков начинают играть хуже после 12 раунда",
      stat2: "64%",
      stat2Title: "Отрицают усталость",
      stat2Desc: "не понимают, что просаживают, пока не увидят статистику",
      stat3: "2.5x",
      stat3Title: "Увеличение ошибок",
      stat3Desc: "ошибок совершается в последних 5 раундах длинных сессий",
      stat4: "+18%",
      stat4Title: "Прирост винрейта",
      stat4Desc: "прирост винрейта у тех, кто останавливается при обнаружении проседания",
      callout1: "Вы не тильтуете.",
      callout2: "Вы устали.",
      callout3: "Мозг не скажет вам об этом. Статистика скажет."
    },
    socialProof: {
      badge: "Результаты",
      title: "Создано для грайндеров",
      stat1Label: "Средний прирост в дуэлях лейт-гейма",
      stat1Value: "+19%",
      stat2Label: "Игроков трекают сессии каждую неделю",
      stat2Value: "2.4K+",
      stat3Label: "Средний прирост стабильности",
      stat3Value: "+26%",
      testimonial1Quote: "Грайндил по 8 часов. Оказалось, каждый раз проседаю после 11 раунда. Теперь останавливаюсь на 10-м. Винрейт с 48% до 61%.",
      testimonial1Name: "Алексей М.",
      testimonial1Rank: "Бессмертный 3",
      testimonial1Improvement: "+13% WR",
      testimonial2Quote: "Наконец понял, что 'плохие тиммейты' — это просто я играл на тильте после 15 раунда. Статистика не врёт.",
      testimonial2Name: "Иордан К.",
      testimonial2Rank: "Faceit уровень 10",
      testimonial2Improvement: "+22% Лейт",
      testimonial3Quote: "Трекинг реакции — это огонь. Вижу, как замедляюсь на 40мс ещё до того, как устал. Это другой уровень.",
      testimonial3Name: "Сэм Р.",
      testimonial3Rank: "Сияющий",
      testimonial3Improvement: "+18% Стабильность",
      leaderboardTitle: "Лучшие на этой неделе",
      player1: "Феникс",
      player2: "Вайпер",
      player3: "Джетт",
      rank1: "Бессмертный 3",
      rank2: "Сияющий",
      rank3: "Бессмертный 2"
    },
    earlyAccess: {
      badge: "Ранний доступ",
      title: "Получить доступ к бете",
      subtitle: "Ограниченное количество мест для рейтинговых игроков",
      spotsRemaining: "Осталось",
      spots: "мест",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      gameLabel: "Основная игра",
      gamePlaceholder: "Выберите игру",
      gameCS: "Counter-Strike",
      gameValorant: "Valorant",
      rankLabel: "Ранг",
      rankPlaceholder: "напр. Faceit 10, Бессмертный 3",
      telegramLabel: "Telegram",
      telegramPlaceholder: "@username",
      btnSubmit: "Получить бета-доступ",
      btnSubmitting: "Отправка...",
      note1: "Приоритет — игрокам с высоким рангом.",
      note2: "Приглашения в течение 48-72 часов.",
      successTitle: "Запрос получен",
      successMessage: "Вы в списке. Уведомим, когда слот будет готов.",
      successMessage2: "Проверьте почту.",
      successEstimate: "Ожидание: 2-3 дня"
    },
    finalCTA: {
      title1: "Либо отслеживайте своё проседание.",
      title2: "Либо продолжайте сливать в лейт-гейме.",
      subtitle1: "Каждый раунд важен. Каждая миллисекунда решает.",
      subtitle2: "Хватит грайндить вслепую.",
      btnSecure: "Получить бета-доступ",
      note: "Присоединяйтесь к тем, кто уже знает, когда остановиться."
    }
  },
  en: {
    hero: {
      badge: "Built for Tactical FPS Ranked",
      title1: "Detect The Round",
      title2: "You Start Losing.",
      subtitle: "Your reaction speed and decision quality drop before you notice. We catch it in real-time.",
      reactionLabel: "Reaction",
      roundLabel: "Round 14",
      btnJoinBeta: "Join Beta Access",
      btnRunTest: "Run Reaction Test",
      liveCount: "competitive players analyzing sessions right now"
    },
    reactionTest: {
      badge: "Reaction Test",
      title: "Check Your Form",
      subtitle: "30 circles: green = click, red = don't click",
      clickToStart: "Click to Start",
      instructions: "🟢 Green — click fast  •  🔴 Red — don't click",
      btnStart: "Start Test",
      btnTryAgain: "Try Again",
      scoreExcellent: "Excellent Form",
      scoreNormal: "Normal",
      scoreRest: "You Should Rest",
      avgReaction: "Avg Reaction",
      missed: "Missed",
      falseCl: "False Clicks",
      btnSaveResult: "Save Result",
      formNickname: "Nickname",
      formNicknamePlaceholder: "your in-game name",
      formSleep: "Sleep Hours",
      formStress: "Stress Level",
      formMotivation: "Want to Play",
      btnSave: "Save Result",
      btnSaving: "Saving...",
      saveError: "Failed to save. Please try again.",
      savedTitle: "Result Saved",
      savedMessage: "Your dynamics will be visible after 5 tests"
    },
    pain: {
      badge: "The Problem",
      point1: "You start 10–2. You end 14–17.",
      point2: "You lose duels you normally win.",
      point3: "Your aim is clean. Your timing isn't.",
      point4: "Tilt starts before you feel it.",
      point5: "You blame teammates. It's fatigue.",
      conclusion1: "The pattern is clear.",
      conclusion2: "Performance doesn't collapse in one round.",
      conclusion3: "It decays gradually. Most players notice too late."
    },
    howItWorks: {
      badge: "Technology",
      title: "How It Works",
      subtitle: "Real-time AI performance analysis",
      graphLabel: "Round",
      dropZone: "DROP ZONE",
      feature1Title: "Real-time Tracking",
      feature1Desc: "Reaction speed, aim accuracy, and decision quality measured every round.",
      feature2Title: "AI Pattern Detection",
      feature2Desc: "Machine learning identifies performance drop before you feel tired.",
      feature3Title: "Precise Alerts",
      feature3Desc: "Get notified the moment your performance starts degrading.",
      feature4Title: "Historical Analytics",
      feature4Desc: "Track patterns over time and optimize your session lengths."
    },
    whyItMatters: {
      badge: "Data",
      title: "Why It Matters",
      stat1: "73%",
      stat1Title: "Late-game Drop",
      stat1Desc: "of players show measurable performance decline after round 12",
      stat2: "64%",
      stat2Title: "Deny Fatigue",
      stat2Desc: "don't realize they're playing worse until they see the data",
      stat3: "2.5x",
      stat3Title: "Error Increase",
      stat3Desc: "more decision-making errors occur in the last 5 rounds of long sessions",
      stat4: "+18%",
      stat4Title: "Win Rate Gain",
      stat4Desc: "average win rate improvement for players who stop when drop is detected",
      callout1: "You're not tilting.",
      callout2: "You're tired.",
      callout3: "Your brain can't tell you. The data can."
    },
    socialProof: {
      badge: "Competitive Results",
      title: "Built For Grinders",
      stat1Label: "Avg. Late-Game Duel Improvement",
      stat1Value: "+19%",
      stat2Label: "Players Track Sessions Weekly",
      stat2Value: "2.4K+",
      stat3Label: "Avg. Reaction Consistency Gain",
      stat3Value: "+26%",
      testimonial1Quote: "I was grinding 8 hours straight. Turns out I collapsed after round 11 every time. Now I stop at round 10. Win rate went from 48% to 61%.",
      testimonial1Name: "Alex M.",
      testimonial1Rank: "Immortal 3",
      testimonial1Improvement: "+13% WR",
      testimonial2Quote: "Finally realized my 'bad teammates' excuse was just me playing tilted after round 15. The data doesn't lie.",
      testimonial2Name: "Jordan K.",
      testimonial2Rank: "Faceit Level 10",
      testimonial2Improvement: "+22% Late-game",
      testimonial3Quote: "Reaction time tracking is insane. I can see myself slow down 40ms before I even feel tired. This is next level.",
      testimonial3Name: "Sam R.",
      testimonial3Rank: "Radiant",
      testimonial3Improvement: "+18% Consistency",
      leaderboardTitle: "Top Performers This Week",
      player1: "Phoenix",
      player2: "Viper",
      player3: "Jett",
      rank1: "Immortal 3",
      rank2: "Radiant",
      rank3: "Immortal 2"
    },
    earlyAccess: {
      badge: "Early Access",
      title: "Request Competitive Beta",
      subtitle: "Limited beta slots for ranked players only",
      spotsRemaining: "Only",
      spots: "spots remaining",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      gameLabel: "Main Game",
      gamePlaceholder: "Select your game",
      gameCS: "Counter-Strike",
      gameValorant: "Valorant",
      rankLabel: "Rank",
      rankPlaceholder: "e.g. Faceit 10, Immortal 3, etc.",
      telegramLabel: "Telegram",
      telegramPlaceholder: "@username",
      btnSubmit: "Request Competitive Beta",
      btnSubmitting: "Submitting...",
      note1: "We prioritize high-ranked players for beta access.",
      note2: "Invites sent within 48-72 hours.",
      successTitle: "Request Received",
      successMessage: "You're on the list. We'll notify you when your beta slot is ready.",
      successMessage2: "Check your email for next steps.",
      successEstimate: "Estimated wait: 2-3 days"
    },
    finalCTA: {
      title1: "Either Track Your Drop.",
      title2: "Or Keep Losing Late Game.",
      subtitle1: "Every round counts. Every millisecond matters.",
      subtitle2: "Stop grinding blind.",
      btnSecure: "Secure Beta Access",
      note: "Join the competitive players who already know when to stop."
    }
  }
};
