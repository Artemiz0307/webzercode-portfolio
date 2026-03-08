import { notFound } from "next/navigation"
import { Metadata } from "next"

const posts = {
  "ai-mental-health-analyzer": {
    title: "How I Built an AI Mental Health Analyzer",
    description:
      "A deep dive into building an NLP system that detects emotional signals in text using machine learning.",
    content: `
This project explores how Natural Language Processing can detect emotional signals in text.

The model analyzes patterns in language to identify indicators of stress, anxiety, and depression.

Technologies used:
- Python
- NLP
- Machine Learning
- Streamlit

The goal of this project was to demonstrate how AI can assist in early mental health awareness.
`,
  },

  "time-series-anomaly-detection": {
    title: "Detecting Anomalies in Time Series Data",
    description:
      "Learn how anomaly detection models monitor sensor data and detect unusual patterns in real time.",
    content: `
Time series anomaly detection is widely used in monitoring systems.

In this project I built a model that detects unusual patterns in sensor data.

Technologies used:
- Python
- Pandas
- Scikit-Learn

This allows businesses to detect issues early and prevent system failures.
`,
  },

  "building-saas-with-supabase": {
    title: "Building SaaS with Supabase and React",
    description:
      "A guide on building scalable SaaS platforms using React, Supabase and modern backend architecture.",
    content: `
Supabase provides a powerful backend for modern applications.

In this guide I explain how to build scalable SaaS platforms using:

- React
- Supabase
- PostgreSQL

This stack enables fast development while maintaining strong scalability.
`,
  },
}

type Params = {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  const post = posts[slug as keyof typeof posts]

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const post = posts[slug as keyof typeof posts]

  if (!post) {
    return notFound()
  }

  return (
    <main className="min-h-screen px-6 py-24 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-black dark:text-white mb-6">
          {post.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-10">
          {post.description}
        </p>

        <article className="prose prose-lg dark:prose-invert">
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </article>

      </div>
    </main>
  )
}