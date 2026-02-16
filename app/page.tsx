import { Hero } from "@/components/sections/hero";
import { ReactionTest } from "@/components/sections/reaction-test";
import { Pain } from "@/components/sections/pain";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SocialProof } from "@/components/sections/social-proof";
import { EarlyAccess } from "@/components/sections/early-access";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <ReactionTest />
      <Pain />
      <HowItWorks />
      <WhyItMatters />
      <SocialProof />
      <EarlyAccess />
      <FinalCTA />
    </main>
  );
}
