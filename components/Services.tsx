import { Code, Smartphone, Brain, Server } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Modern websites and SaaS platforms built with scalable technologies and optimized performance.",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Cross-platform mobile applications built with modern frameworks and smooth user experiences.",
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description:
        "Machine learning systems, automation tools and intelligent workflows powered by AI.",
    },
    {
      icon: Server,
      title: "API Development",
      description:
        "Secure and scalable backend APIs designed for high-performance modern applications.",
    },
  ]

  return (
    <section
      id="services"
      className="py-28 px-6 bg-linear-to-b from-gray-50 to-white dark:from-black dark:to-neutral-900"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Helping startups and businesses build scalable digital products
            using modern technologies.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >

                {/* Icon */}
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-xl bg-black text-white group-hover:scale-110 transition">
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>

              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}