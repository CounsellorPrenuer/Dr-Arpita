import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import path from "node:path";

const token = process.env.SANITY_EDITOR_TOKEN;
if (!token) throw new Error("SANITY_EDITOR_TOKEN is required");

const client = createClient({
  projectId: "ww1z7kff",
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

async function upload(file, label) {
  const asset = await client.assets.upload("image", createReadStream(path.resolve(file)), { filename: path.basename(file) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: label };
}

const [profileImage, careerImage, learningImage, coachingImage] = await Promise.all([
  upload("attached_assets/profile.png", "Dr. Arpita"),
  upload("attached_assets/career.jfif", "Career guidance session"),
  upload("attached_assets/learning.jfif", "Learning and development workshop"),
  upload("attached_assets/coaching.jfif", "Executive coaching"),
]);

const standardPlans = [
  ["pkg-1", "Discover", "8-10", 5500, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"]],
  ["pkg-2", "Discover Plus+", "8-10", 15000, ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"]],
  ["pkg-3", "Achieve Online", "10-12", 5999, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-4", "Achieve Plus+", "10-12", 10599, ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"]],
  ["pkg-5", "Ascend Online", "college", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-6", "Ascend Plus+", "college", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
  ["mp-3", "Ascend Online", "working", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["mp-2", "Ascend Plus+", "working", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
];

const customPlans = [
  ["career-report", "Career Report", 1500, "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider."],
  ["career-report-counselling", "Career Report + Career Counselling", 3000, "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at."],
  ["knowledge-gateway", "Knowledge Gateway + Career Helpline Access", 100, "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love."],
  ["one-to-one-session", "One-to-One Session with a Career Expert", 3500, "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field."],
  ["college-admission-planning", "College Admission Planning", 3000, "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner."],
  ["exam-stress-management", "Exam Stress Management", 1000, "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind."],
  ["cap-100", "College Admissions Planner - 100 (CAP-100)", 199, "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!"],
];

const block = (text) => ({
  _type: "block",
  _key: crypto.randomUUID().slice(0, 12),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: crypto.randomUUID().slice(0, 12), text, marks: [] }],
});

const documents = [
  ...standardPlans.map(([planId, title, subgroup, price, features], order) => ({
    _id: `standard-plan-${planId}`,
    _type: "standardPlan",
    planId, title, subgroup, price, features, order: order + 1,
    image: order < 2 ? careerImage : order < 6 ? learningImage : coachingImage,
  })),
  ...customPlans.map(([planId, title, price, description], order) => ({
    _id: `custom-plan-${planId}`,
    _type: "customPlan",
    planId, title, price, description, order: order + 1,
    image: [careerImage, learningImage, coachingImage][order % 3],
  })),
  {
    _id: "service-executive-coaching", _type: "services", title: "Executive Coaching",
    description: "ICF-certified executive coaching for leaders seeking measurable growth in presence, strategy, and team impact.",
    link: "/#coaching", image: coachingImage, order: 1,
  },
  {
    _id: "service-career-guidance", _type: "services", title: "Career Guidance",
    description: "Scientifically-backed career counselling with psychometric assessments and personalized pathways for students.",
    link: "/pricing", image: careerImage, order: 2,
  },
  {
    _id: "service-learning-development", _type: "services", title: "Learning & Development",
    description: "Corporate workshops, leadership programs, and organizational development tailored to your team's needs.",
    link: "/#programs", image: learningImage, order: 3,
  },
  {
    _id: "testimonial-1", _type: "testimonials", name: "Ananya Mehta", role: "HR Leader",
    quote: "Dr. Arpita's executive coaching transformed how I lead my team. Her insights are practical, empathetic, and results-driven.",
    rating: 5, image: profileImage, order: 1,
  },
  {
    _id: "testimonial-2", _type: "testimonials", name: "Rohit Desai", role: "Student",
    quote: "The career guidance program helped me discover a path I am genuinely excited about. The psychometric assessment was eye-opening.",
    rating: 5, image: careerImage, order: 2,
  },
  {
    _id: "testimonial-3", _type: "testimonials", name: "Priya Nair", role: "Corporate Trainer",
    quote: "Skillzy's L&D programs are world-class. Dr. Arpita brings decades of experience and genuine passion to every session.",
    rating: 5, image: learningImage, order: 3,
  },
  {
    _id: "blog-executive-coaching", _type: "blogPost", title: "Executive Coaching for Sustainable Leadership Growth",
    slug: { _type: "slug", current: "executive-coaching-sustainable-leadership" },
    excerpt: "How leaders can build presence, resilience, and impact through structured coaching.",
    author: "Dr. Arpita", publishedAt: "2026-06-01T09:00:00.000Z", featured: true, image: coachingImage,
    body: [
      block("Executive coaching helps leaders translate experience into intentional growth rather than reactive decision-making."),
      block("Sustainable leadership begins with self-awareness, clear communication, and the ability to coach others through change."),
      block("Structured coaching creates measurable improvements in team engagement, strategic clarity, and personal effectiveness."),
    ],
  },
  {
    _id: "blog-career-clarity", _type: "blogPost", title: "Career Clarity for Students and Young Professionals",
    slug: { _type: "slug", current: "career-clarity-students-professionals" },
    excerpt: "A practical approach to choosing career paths with confidence and purpose.",
    author: "Dr. Arpita", publishedAt: "2026-05-15T09:00:00.000Z", featured: false, image: careerImage,
    body: [
      block("Career clarity starts with understanding your strengths, interests, and the environments where you thrive."),
      block("Psychometric insights combined with expert counselling help students and professionals make informed choices."),
    ],
  },
];

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createOrReplace(document);
await transaction.commit();

console.log(`Seeded ${documents.length} Sanity documents.`);
