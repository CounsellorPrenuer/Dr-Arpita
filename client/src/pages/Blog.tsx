import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { imageUrl } from "@/lib/sanity";
import { useCms } from "@/hooks/useCms";

export default function Blog() {
  const { data } = useCms();
  const blogs = data?.blogPosts ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading font-black text-4xl lg:text-5xl text-white mb-6">Insights & Articles</h1>
          <p className="text-xl text-slate-400">Expert perspectives on coaching, leadership, and career development.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <Card key={post._id} className="flex flex-col h-full overflow-hidden bg-slate-800/50 border-slate-700 p-0">
              {post.image && (
                <img
                  src={imageUrl(post.image, 700)}
                  alt={post.image.alt || post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                {post.featured && <span className="text-xs font-semibold text-blue-400 mb-2">FEATURED</span>}
                <h2 className="font-heading text-2xl font-bold text-white mb-3">{post.title}</h2>
                <p className="text-slate-400 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-700 pt-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-400 hover:text-blue-300">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
