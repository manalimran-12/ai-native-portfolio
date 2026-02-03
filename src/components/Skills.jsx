
import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React & TypeScript', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js & Vue.js', level: 85 },
      { name: 'Framer Motion', level: 88 }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js & Express', level: 92 },
      { name: 'Python & FastAPI', level: 87 },
      { name: 'RESTful APIs', level: 93 },
      { name: 'GraphQL', level: 80 }
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'Redis', level: 82 }
    ]
  },
  {
    category: 'Tools & AI',
    skills: [
      { name: 'Git & Docker', level: 91 },
      { name: 'AWS & Vercel', level: 84 },
      { name: 'OpenAI API', level: 89 },
      { name: 'LangChain', level: 86 }
    ]
  }
];

const Skills = () => {
  return (
    <section className="py-20 px-4 bg-black/20" id="skills">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Proficient in modern technologies and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-300/20 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-purple-100 text-sm font-medium">{skill.name}</span>
                      <span className="text-purple-300 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
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
