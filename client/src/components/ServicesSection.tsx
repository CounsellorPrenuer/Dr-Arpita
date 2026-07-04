import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { imageUrl } from "@/lib/sanity";
import { useCms } from "@/hooks/useCms";

export default function ServicesSection() {
  const { data } = useCms();
  const services = data?.services ?? [];

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">Our Programs</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Explore Skillzy's core offerings for individuals and organizations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service._id} className="overflow-hidden bg-slate-800/50 border-slate-700 p-0 hover:scale-105 transition-transform">
              {service.image && (
                <img
                  src={imageUrl(service.image, 600)}
                  alt={service.image.alt || service.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <Link href={service.link} className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm hover:text-blue-300">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
