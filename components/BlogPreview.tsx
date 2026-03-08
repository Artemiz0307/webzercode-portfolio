import Link from "next/link"

export default function BlogPreview() {
  const posts = [
    {
      title: "How I Built an AI Mental Health Analyzer",
      description:
        "A deep dive into building an NLP system that detects emotional patterns in text using machine learning.",
      slug: "ai-mental-health-analyzer",
    },
    {
      title: "Detecting Anomalies in Time Series Data",
      description:
        "Learn how anomaly detection models monitor sensor data and identify unusual behavior in real time.",
      slug: "time-series-anomaly-detection",
    },
    {
      title: "Building SaaS with Supabase and React",
      description:
        "A guide to building scalable SaaS platforms using modern tools like Supabase and React.",
      slug: "building-saas-with-supabase",
    },
  ]

  return (
    <section
      id="blog"
      className="py-28 px-6 bg-linear-to-b from-gray-50 to-white dark:from-black dark:to-neutral-900"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Blog
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Insights, tutorials and technical breakdowns about AI,
            software engineering and building scalable products.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {posts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >

              <h3 className="text-lg font-semibold text-black dark:text-white mb-3 group-hover:underline">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {post.description}
              </p>

              <span className="text-sm font-medium text-black dark:text-white">
                Read Article →
              </span>

            </Link>
          ))}

        </div>

      </div>
    </section>
  )
}