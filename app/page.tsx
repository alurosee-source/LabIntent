import { HeroCoach } from "@/components/sections/hero-coach";
import { ReactionTest } from "@/components/sections/reaction-test";
import { DashboardMockup } from "@/components/sections/dashboard-mockup";
import { ProblemCoach } from "@/components/sections/problem-coach";
import { HowWorksCoach } from "@/components/sections/how-works-coach";
import { CoachForm } from "@/components/sections/coach-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroCoach />
      <ReactionTest />
      <DashboardMockup />
      <ProblemCoach />
      <HowWorksCoach />
      <CoachForm />
    </main>
  );
}
