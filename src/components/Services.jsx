
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
    <section className="py-20 px-4" id="services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-300/20 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-purple-200 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-purple-100 text-xs flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {feature}
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
