import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import PricingTabs from "@/components/PricingTabs";
import CustomPlans from "@/components/CustomPlans";
import BookingModal from "@/components/BookingModal";
import { useCms } from "@/hooks/useCms";

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

export default function PackagesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const { data } = useCms();

  const standardPlans = data?.standardPlans ?? [];
  const customPlans = data?.customPlans ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    const element = document.querySelector("#pricing");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,#3b82f640,transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Zap className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Flexible Pricing Plans</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white">
            Choose Your <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Path</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Tailored career guidance packages for every stage of your journey
          </p>
        </div>

        <PricingTabs
          plans={standardPlans}
          onBuyClick={(plan, category) =>
            setSelectedPlan({ planId: plan.planId, title: plan.title, category, price: plan.price })
          }
        />
        <CustomPlans
          plans={customPlans}
          onBuyClick={(plan) =>
            setSelectedPlan({ planId: plan.planId, title: plan.title, category: "Custom Mentorship", price: plan.price })
          }
        />

        <p className="block text-center text-sm text-slate-400 mt-12 mx-auto max-w-2xl px-6 py-4 bg-slate-800/30 backdrop-blur-sm rounded-full border border-slate-700">
          All prices in INR. Secure payment by Razorpay.
        </p>
      </div>

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </section>
  );
}
