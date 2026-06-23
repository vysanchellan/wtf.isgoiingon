import { HeroSection } from "@/components/ui/HeroSection";
import { TrustBar } from "@/components/ui/TrustBar";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { Testimonials } from "@/components/ui/Testimonials";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <PackagesGrid />
      <Testimonials />
      <FAQ />
      <DisclaimerBox />
      <CTASection />
    </>
  );
}
