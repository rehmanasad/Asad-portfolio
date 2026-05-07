import { useRef } from "react";
import { motion } from "framer-motion";

const technicalSkills = [
  {
    category: "LANGUAGES",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "C/C++",
      "Java",
    ],
  },
  {
    category: "FRONTEND",
    skills: [
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    category: "BACKEND",
    skills: [
      "Django",
      "Flask",
      "Python",
      "Node.js",
      "FastAPI",
      "Express",
      "REST APIs",
    ],
  },
  {
    category: "AI & MACHINE LEARNING",
    skills: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "OpenAI",
      "Whisper",
      "RoBERTa",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    category: "DATA SCIENCE",
    skills: [
      "Pandas",
      "NumPy",
      "Jupyter",
      "Data Analysis",
      "Predictive Models",
      "Data Visualization",
      "Statistical Analysis",
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    skills: [
      "AWS (EC2, S3)",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "CI/CD",
      "Nginx",
      "Linux",
    ],
  },
  {
    category: "DATABASES",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "MySQL",
      "Redis",
      "Elasticsearch",
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 px-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Technologies I Master
            <span className="text-brand-primary">.</span>
          </h2>
          <p className="text-[var(--text-color)]/70 text-base md:text-lg leading-relaxed font-light">
            I stay at the cutting edge of technology, leveraging the most powerful and innovative tools to deliver exceptional solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {technicalSkills.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-[10px] tracking-[0.3em] font-bold opacity-30 uppercase border-b border-[var(--text-color)]/5 pb-2">
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 bg-[var(--text-color)]/5 rounded-full text-[11px] font-medium tracking-wide border border-[var(--text-color)]/5 hover:border-brand-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
