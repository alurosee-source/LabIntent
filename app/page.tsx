import { HeroCoach } from "@/components/sections/hero-coach";
import { ProblemCoach } from "@/components/sections/problem-coach";
import { HowWorksCoach } from "@/components/sections/how-works-coach";
import { BenefitsCoach } from "@/components/sections/benefits-coach";
import { DashboardMockup } from "@/components/sections/dashboard-mockup";
import { CoachForm } from "@/components/sections/coach-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroCoach />
      <ProblemCoach />
      <HowWorksCoach />
      <BenefitsCoach />
      <DashboardMockup />
      <CoachForm />
    </main>
  );
}
