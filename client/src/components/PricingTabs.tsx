import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Crown } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { imageUrl, type StandardPlan } from "@/lib/sanity";

const categories = [
  { id: "8-10", label: "8-10 Students" },
  { id: "10-12", label: "10-12 Students" },
  { id: "college", label: "College Students" },
  { id: "working", label: "Working Professionals" },
] as const;

type Props = {
  plans: StandardPlan[];
  onBuyClick: (plan: StandardPlan, category: string) => void;
};

export default function PricingTabs({ plans, onBuyClick }: Props) {
  const [activeTab, setActiveTab] = useState<string>(categories[0].id);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 lg:grid-cols-4 h-auto gap-3 bg-transparent p-0 mb-12">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="min-h-12 px-3 py-3 rounded-2xl text-sm sm:text-base font-semibold whitespace-normal transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white border-2 data-[state=inactive]:border-slate-700"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plans.filter((plan) => plan.subgroup === category.id).map((plan, index) => (
              <Card key={plan.planId} className="p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700 relative overflow-hidden">
                {plan.image && (
                  <img
                    src={imageUrl(plan.image, 900)}
                    alt={plan.image.alt || plan.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 -mt-2"
                    loading="lazy"
                  />
                )}
                {index === 1 && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-slate-900 border-0 font-black">
                    <Crown className="h-4 w-4 mr-1 inline" />
                    PREMIUM
                  </Badge>
                )}
                <h3 className="font-heading font-black text-3xl text-white mb-2">{plan.title}</h3>
                <div className="text-5xl font-heading font-black text-white mb-6">{formatCurrency(plan.price)}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => onBuyClick(plan, category.label)}
                  size="lg"
                  className="w-full font-black bg-gradient-to-r from-blue-500 to-violet-500"
                  data-testid={`button-buy-${plan.planId}`}
                >
                  Buy Now
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
