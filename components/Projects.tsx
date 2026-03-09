import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "AI Mental Health Analyzer",
      image: "/projects/mental-health.jpg",
      description:
        "Machine learning system that analyzes emotional patterns in text and detects mental health signals.",
      tech: ["Python", "NLP", "Machine Learning", "Streamlit"],
      github: "https://github.com/Artemiz0307/mental-health-analyzer",
    },
    {
      title: "Exam Preparation Mobile App",
      image: "/projects/exam-app.jpg",
      description:
        "SaaS mobile platform for exam preparation with paid paper access and subscription features.",
      tech: ["React Native", "Supabase", "Expo"],
      github: "https://github.com/webzercode/Exam-app",
    },
    {
      title: "Deforestation Monitoring App",
      image: "/projects/deforestation.jpg",
      description:
        "Application using satellite imagery to monitor forest changes and provide environmental insights.",
      tech: ["Python", "Satellite Data", "Computer Vision"],
      github: "#",
    },
    {
      title: "Time Series Forecasting Engine",
      image: "/projects/forecasting.jpg",
      description:
        "Forecasting system predicting trends and detecting anomalies in real-time data streams.",
      tech: ["Python", "Time Series", "ML Models"],
      github: "#",
    },
  ]

  return (
    <section
      id="projects"
      className="py-28 px-6 bg-white dark:bg-black transition-colors"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            A selection of projects showcasing my work in AI, full-stack
            development, and scalable digital systems.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >

              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Button */}
                <a
                  href={project.github}
                  target="_blank"
                  className="inline-block text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  View Code
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}