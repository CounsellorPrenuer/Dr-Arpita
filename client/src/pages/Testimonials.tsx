import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageUrl } from "@/lib/sanity";
import { useCms } from "@/hooks/useCms";

export default function Testimonials() {
  const { data } = useCms();
  const testimonials = data?.testimonials ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading font-black text-4xl lg:text-5xl text-white mb-6">What Our Clients Say</h1>
          <p className="text-xl text-slate-400">Real stories from people and organizations Dr. Arpita has helped grow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id} className="h-full flex flex-col p-8 bg-slate-800/50 border-slate-700">
              {testimonial.image && (
                <img
                  src={imageUrl(testimonial.image, 240)}
                  alt={testimonial.image.alt || testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                  loading="lazy"
                />
              )}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
                <p className="leading-relaxed text-slate-300 pl-6">{testimonial.quote}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-700">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
