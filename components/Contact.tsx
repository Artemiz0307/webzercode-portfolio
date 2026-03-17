"use client"

import { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    const response = await fetch("https://formspree.io/f/mnjgnyyn", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      setStatus("SUCCESS")
      form.reset()
    } else {
      setStatus("ERROR")
    }
  }

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* Left */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Let's Build Something Great
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md">
            Have a project idea or need help building scalable software,
            AI systems, or modern web applications? Let's talk.
          </p>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">

            <p>
              Email:
              <span className="ml-2 font-medium text-black dark:text-white">
                webzercode.dev@gmail.com
              </span>
            </p>

            <p>
              GitHub:
              <a href="#" className="ml-2 underline hover:text-black dark:hover:text-white">
                https://github.com/webzercode
              </a>
            </p>

          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Tell me about your project..."
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>

          {status === "SUCCESS" && (
            <p className="text-green-600 text-sm">
              Message sent successfully!
            </p>
          )}

          {status === "ERROR" && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}

        </form>

      </div>
    </section>
  )
}