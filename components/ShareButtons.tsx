"use client"

import { Twitter, Linkedin } from "lucide-react"

interface ShareButtonsProps {
  post: {
    title: string
  }
}

export function ShareButtons({ post }: ShareButtonsProps) {
  const url = typeof window !== "undefined" ? window.location.href : ""
  const encodedTitle = encodeURIComponent(post.title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
    </div>
  )
}