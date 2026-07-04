import { useState } from "react";
import { Sparkles } from "lucide-react";
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

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const { data } = useCms();

  const standardPlans = data?.standardPlans ?? [];
  const customPlans = data?.customPlans ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,#3b82f640,transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Flexible Pricing Plans</span>
          </div>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-white mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Path</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
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
      </div>

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </div>
  );
}
