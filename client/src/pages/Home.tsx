import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import AwardsSection from "@/components/AwardsSection";
import AboutSection from "@/components/AboutSection";
import PackagesSection from "@/components/PackagesSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AboutSection />
      <ExpertiseSection />
      <ServicesSection />
      <PackagesSection />
      <AwardsSection />
      <ContactSection />
    </div>
  );
}
