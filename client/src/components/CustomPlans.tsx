import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { imageUrl, type CustomPlan } from "@/lib/sanity";

type Props = {
  plans: CustomPlan[];
  onBuyClick: (plan: CustomPlan) => void;
};

export default function CustomPlans({ plans, onBuyClick }: Props) {
  return (
    <section className="mt-24">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mb-5">
          Want To Customise Your Mentorship Plan?
        </h2>
        <p className="text-lg text-slate-400">
          If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.planId} className="h-full flex flex-col overflow-hidden bg-slate-800/50 border-slate-700 p-0">
            {plan.image && (
              <img
                src={imageUrl(plan.image, 700)}
                alt={plan.image.alt || plan.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            )}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-heading font-bold text-xl text-white mb-3">{plan.title}</h3>
              <div className="text-3xl font-bold text-blue-400 mb-4">{formatCurrency(plan.price)}</div>
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-6">{plan.description}</p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500" onClick={() => onBuyClick(plan)}>
                Buy Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
