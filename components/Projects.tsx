import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "AI Mental Health Analyzer",
      image: "/projects/health.png",
      description:
        "Machine learning system that analyzes emotional patterns in text and detects mental health signals.",
      tech: ["Python", "NLP", "Machine Learning", "Streamlit"],
      github: "https://github.com/Artemiz0307/mental-health-analyzer",
      live: "https://mepvjmfsf5q3budvcm4c7u.streamlit.app/",
    },
    {
      title: "Exam Preparation Mobile App",
      image: "/projects/exam-app.jpg",
      description:
        "SaaS mobile platform for exam preparation with subscription and paid paper access.",
      tech: ["React Native", "Supabase", "Expo"],
      github: "https://github.com/webzercode/Exam-app",
      live: "#https://exam-prep-app.netlify.app",
    },
    {
      title: "Deforestation Monitoring",
      image: "/projects/defo.jpg",
      description:
        "AI system using satellite imagery to monitor forest loss and environmental change.",
      tech: ["Python", "Computer Vision", "Satellite Data"],
      github: "#",
      live: "#https://deforestation-monitor.netlify.app",
    },
    {
      title: "Time Series Forecasting | AI Smart Grid Monitoring System",
      image: "/projects/forecast.jpg",
      description:
        "AI-powered smart grid monitoring platform that forecasts electricity demand using SARIMA and LSTM models while detecting abnormal consumption patterns with an LSTM Autoencoder. Includes an interactive Streamlit dashboard for real-time monitoring and anomaly alerts.",
      tech: [
      "Python",
      "LSTM",
      "SARIMA",
      "TensorFlow",
      "Time Series",
      "Streamlit"
    ],
      github: "https://github.com/Artemiz0307/ai-smart-grid-monitoring",
      live: "#",
    },
        {
      title: "Scholarship Platform",
      image: "/projects/scholarship.png",
      description:
        "Web application for managing and applying to various scholarship opportunities.",
      tech: ["React", "Node.js", "Supabase"],
      github: "#",
      live: "https://scholarjetindia.in",
    },
    {
    title: "Open Source Contribution - Mesa (NumFOCUS)",
    image: "/projects/open-source.png",
    description:
      "Open source contributions to the Mesa agent-based modeling framework maintained by NumFOCUS. Worked on debugging simulation models, improving documentation, and exploring the Boltzmann Wealth model example.",
    tech: ["Python", "Mesa", "Agent-Based Modeling", "Git", "Open Source"],
    github: "https://github.com/projectmesa/mesa/pull/3540",
    live: "#",
  },

 
  ]

  return (
    <section
      id="projects"
      className="py-28 px-6 bg-white dark:bg-black transition-colors"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Projects
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Selected projects demonstrating my experience in AI, SaaS platforms,
            and scalable web applications.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* Image */}
      {/* Image with overlay */}
      <div className="relative overflow-hidden group">

        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-44 object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">

          <a
            href={project.github}
            target="_blank"
            className="px-4 py-2 text-sm bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            GitHub
          </a>

          <a
            href={project.live}
            target="_blank"
            className="px-4 py-2 text-sm border border-white text-white rounded-md font-medium hover:bg-white hover:text-black transition"
          >
            Live
          </a>

        </div>

      </div>

              {/* Content */}
              <div className="p-5">

                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>


              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}