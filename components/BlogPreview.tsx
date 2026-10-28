import Link from "next/link"
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from "lucide-react"

const posts = [
  {
    title: "How I Built an AI Mental Health Analyzer",
    description:
      "A deep dive into building an NLP system that detects emotional patterns in text using machine learning.",
    slug: "ai-mental-health-analyzer",
    category: "AI & Machine Learning",
    date: "2024-12-15",
    readTime: "8 min read",
    featured: true,
    image: "/projects/health.png",
  },
  {
    title: "Detecting Anomalies in Time Series Data",
    description:
      "Learn how anomaly detection models monitor sensor data and identify unusual behavior in real time.",
    slug: "time-series-anomaly-detection",
    category: "Data Science",
    date: "2024-11-28",
    readTime: "6 min read",
    featured: false,
    image: "/projects/forecast.jpg",
  },
  {
    title: "Building SaaS with Supabase and React",
    description:
      "A guide to building scalable SaaS platforms using modern tools like Supabase and React.",
    slug: "building-saas-with-supabase",
    category: "Full Stack",
    date: "2024-10-20",
    readTime: "10 min read",
    featured: false,
    image: "/projects/scholarship.png",
  },
]

export default function BlogPreview() {
  const featuredPost = posts.find((p) => p.featured)
  const regularPosts = posts.filter((p) => !p.featured)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section
      id="blog"
      className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
              Latest Articles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Insights & Technical Writing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl">
              Deep dives into AI, software architecture, and building scalable products.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block mb-16"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {featuredPost.title}
                    </h3>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(featuredPost.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      Featured
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                    {featuredPost.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Read Article</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {regularPosts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="h-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <Tag size={10} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black dark:text-white leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Read more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter/CTA */}
        <div className="mt-20 p-8 md:p-12 bg-black dark:bg-white rounded-3xl text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full mb-4">
              <BookOpen size={12} />
              Newsletter
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black mb-4">
              Get insights delivered to your inbox
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              No spam. Just occasional deep-dives on AI, engineering, and building products.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-xl text-white dark:text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-600 mt-4">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}