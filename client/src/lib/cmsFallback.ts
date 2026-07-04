import type { BlogPost, CmsContent } from "./sanity";

function block(text: string) {
  return {
    _type: "block",
    _key: text.slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "span", text, marks: [] }],
  };
}

const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "fallback-blog-1",
    title: "Executive Coaching for Sustainable Leadership Growth",
    slug: "executive-coaching-sustainable-leadership",
    excerpt: "How leaders can build presence, resilience, and impact through structured coaching.",
    author: "Dr. Arpita",
    publishedAt: "2026-06-01T09:00:00.000Z",
    featured: true,
    body: [
      block("Executive coaching helps leaders translate experience into intentional growth rather than reactive decision-making."),
      block("Sustainable leadership begins with self-awareness, clear communication, and the ability to coach others through change."),
      block("Structured coaching creates measurable improvements in team engagement, strategic clarity, and personal effectiveness."),
    ],
  },
  {
    _id: "fallback-blog-2",
    title: "Career Clarity for Students and Young Professionals",
    slug: "career-clarity-students-professionals",
    excerpt: "A practical approach to choosing career paths with confidence and purpose.",
    author: "Dr. Arpita",
    publishedAt: "2026-05-15T09:00:00.000Z",
    featured: false,
    body: [
      block("Career clarity starts with understanding your strengths, interests, and the environments where you thrive."),
      block("Psychometric insights combined with expert counselling help students and professionals make informed choices."),
    ],
  },
];

export const CMS_FALLBACK: CmsContent = {
  standardPlans: [
    { _id: "fallback-pkg-1", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
    { _id: "fallback-pkg-2", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
    { _id: "fallback-pkg-3", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-4", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
    { _id: "fallback-pkg-5", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-6", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    { _id: "fallback-mp-3", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-mp-2", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  ],
  customPlans: [
    { _id: "fallback-career-report", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
    { _id: "fallback-career-report-counselling", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
    { _id: "fallback-knowledge-gateway", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline." },
    { _id: "fallback-one-to-one-session", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
    { _id: "fallback-college-admission-planning", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
    { _id: "fallback-exam-stress-management", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators." },
    { _id: "fallback-cap-100", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs." },
  ],
  blogPosts: fallbackBlogPosts,
  testimonials: [
    { _id: "fallback-testimonial-1", name: "Ananya Mehta", role: "HR Leader", quote: "Dr. Arpita's executive coaching transformed how I lead my team. Her insights are practical, empathetic, and results-driven.", rating: 5 },
    { _id: "fallback-testimonial-2", name: "Rohit Desai", role: "Student", quote: "The career guidance program helped me discover a path I am genuinely excited about. The psychometric assessment was eye-opening.", rating: 5 },
    { _id: "fallback-testimonial-3", name: "Priya Nair", role: "Corporate Trainer", quote: "Skillzy's L&D programs are world-class. Dr. Arpita brings decades of experience and genuine passion to every session.", rating: 5 },
  ],
  services: [
    { _id: "fallback-service-1", title: "Executive Coaching", description: "ICF-certified executive coaching for leaders seeking measurable growth in presence, strategy, and team impact.", link: "/#coaching" },
    { _id: "fallback-service-2", title: "Career Guidance", description: "Scientifically-backed career counselling with psychometric assessments and personalized pathways for students.", link: "/pricing" },
    { _id: "fallback-service-3", title: "Learning & Development", description: "Corporate workshops, leadership programs, and organizational development tailored to your team's needs.", link: "/#programs" },
  ],
};
