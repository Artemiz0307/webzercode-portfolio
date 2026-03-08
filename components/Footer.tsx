export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-800 py-12 px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">
            WebzerCode
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Building scalable web apps and AI systems.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
          <a href="#services" className="hover:text-black dark:hover:text-white">
            Services
          </a>
          <a href="#projects" className="hover:text-black dark:hover:text-white">
            Projects
          </a>
          <a href="#blog" className="hover:text-black dark:hover:text-white">
            Blog
          </a>
          <a href="#contact" className="hover:text-black dark:hover:text-white">
            Contact
          </a>
        </div>

        {/* Social */}
        <div className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
          <a href="#" className="hover:text-black dark:hover:text-white">
            GitHub
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            Email
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        © {new Date().getFullYear()} WebzerCode. All rights reserved.
      </div>

    </footer>
  )
}