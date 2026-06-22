import { HeroSection } from "@/components/ui/HeroSection";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { Testimonials } from "@/components/ui/Testimonials";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <PackagesGrid />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
