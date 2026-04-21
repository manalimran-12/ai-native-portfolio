import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, GraduationCap, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices',
    features: ['Full-stack development', 'Responsive design', 'API integration', 'Database design', 'Deployment & hosting']
  },
  {
    icon: Users,
    title: 'Consulting',
    description: 'Technical consulting and architecture planning for your projects',
    features: ['Technology selection', 'Architecture design', 'Code review', 'Performance optimization', 'Security audit']
  },
  {
    icon: GraduationCap,
    title: 'Mentoring',
    description: 'One-on-one mentoring for aspiring developers',
    features: ['Career guidance', 'Code review', 'Interview preparation', 'Project feedback', 'Learning roadmap']
  },
  {
    icon: Sparkles,
    title: 'AI Integration',
    description: 'Adding intelligent features to your existing applications',
    features: ['Chatbot development', 'Automation systems', 'Data analysis', 'ML model integration', 'API integration']
  }
];

const Services = () => {
  return (
    <section className="py-24 px-6" id="services">
      <div className="w-full max-w-screen-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-purple-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-[#2f2f2f] backdrop-blur-lg rounded-xl p-8 min-h-[340px] border border-[#A489AD]/18 shadow-lg hover:shadow-2xl hover:border-[#A489AD]/40 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#A489AD] rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                </div>

                <p className="text-purple-200 text-sm mb-6 leading-relaxed flex-1">{service.description}</p>

                <ul className="space-y-3 mt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-purple-100 text-sm flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
