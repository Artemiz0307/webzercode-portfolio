"use client"

import ThemeToggle from "./theme-toggle"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-tight text-black dark:text-white">
          WebzerCode
        </h1>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm font-medium">

          <a
            href="#services"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Services
          </a>

          <a
            href="#projects"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Projects
          </a>

          <a
            href="#blog"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Blog
          </a>

          <a
            href="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Contact
          </a>

          <ThemeToggle />

        </div>
      </div>
    </nav>
  )
}