export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 bg-gradient-to-b from-white to-gray-50">

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight max-w-4xl">
        Build Powerful <br />
        Digital Products
      </h1>

      {/* Sub text */}
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10">
        WebzerCode builds scalable web applications, AI systems,
        and high-performance digital platforms for modern businesses.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">

        <a
          href="#projects"
          className="px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition duration-300"
        >
          View Projects
        </a>

        <a
          href="#contact"
          className="px-8 py-3 border border-black text-black rounded-xl font-medium hover:bg-black hover:text-white transition duration-300"
        >
          Start a Project
        </a>
        <a
            href="/resume.pdf"
            className="px-6 py-3 border text-black border-black dark:border-white rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
            Download CV
            </a>

      </div>

            <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-gray-600 dark:text-gray-400">
            <span>Next.js</span>
            <span>React</span>
            <span>Python</span>
            <span>Machine Learning</span>
            <span>Supabase</span>
      </div>

      {/* Small trust line */}
      <p className="text-sm text-gray-500 mt-10">
        Trusted technologies • Modern architectures • Scalable systems
      </p>



    </section>
  )
}