"use client"

import ThemeToggle from "./theme-toggle"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/60 dark:bg-black/60 border-b border-gray-200/50 dark:border-gray-800/50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">

        <img
          src="/logo.png"
          alt="WebzerCode Logo"
          className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        <span className="text-[15px] font-semibold tracking-tight text-black dark:text-white">
          WebzerCode
        </span>

      </div>

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