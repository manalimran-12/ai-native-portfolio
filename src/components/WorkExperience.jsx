
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Tech Innovations Inc.',
    role: 'Senior Full-Stack Developer',
    duration: '2021 - Present',
    achievements: [
      'Led a team of 5 developers in building enterprise applications',
      'Reduced application load time by 70% through optimization',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Mentored junior developers and conducted code reviews'
    ]
  },
  {
    company: 'Digital Solutions Ltd.',
    role: 'Full-Stack Developer',
    duration: '2018 - 2021',
    achievements: [
      'Built and maintained 15+ client projects',
      'Integrated third-party APIs and payment systems',
      'Developed reusable component library used across projects',
      'Improved code quality through testing and documentation'
    ]
  },
  {
    company: 'StartUp Hub',
    role: 'Frontend Developer',
    duration: '2016 - 2018',
    achievements: [
      'Created responsive web interfaces for 20+ clients',
      'Collaborated with designers to implement pixel-perfect designs',
      'Optimized applications for SEO and performance',
      'Trained team members on React and modern development practices'
    ]
  }
];

const WorkExperience = () => {
  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Work Experience</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            8+ years of professional development experience
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-500/30 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-purple-900 z-10" />

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-300/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-purple-200 font-medium mb-2">{exp.company}</p>
                        <div className="flex items-center gap-2 text-purple-300 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-purple-100 text-sm flex items-start gap-2">
                          <span className="text-purple-400 mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
