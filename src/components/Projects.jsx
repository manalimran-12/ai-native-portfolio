
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const projects = [
  {
    name: 'E-commerce Platform',
    description: 'A full-featured online store with product management, shopping cart, payment integration, and admin dashboard',
    image: 'https://images.unsplash.com/photo-1590085327097-cf67e44baab3',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    impact: 'Increased client revenue by 45%',
    metrics: '10,000+ daily users'
  },
  {
    name: 'SaaS Dashboard',
    description: 'Analytics dashboard for business intelligence with real-time data visualization and reporting',
    image: 'https://images.unsplash.com/photo-1653676934208-021a2b5e7ca3',
    techStack: ['TypeScript', 'React', 'PostgreSQL', 'Chart.js'],
    impact: 'Reduced reporting time from hours to minutes',
    metrics: 'Real-time updates'
  },
  {
    name: 'AI Chatbot Systems',
    description: 'Intelligent chatbot solutions for customer support and lead generation',
    image: 'https://horizons-cdn.hostinger.com/43022b28-6dd8-4673-9ee2-9b01d95ae9cf/b5402ca50adf5c65f096b30784c18f13.png',
    techStack: ['Python', 'OpenAI API', 'React', 'MongoDB'],
    impact: 'Reduced support tickets by 60%',
    metrics: 'Multi-language support'
  },
  {
    name: 'Portfolio Management Tool',
    description: 'Investment tracking and portfolio optimization platform',
    image: 'https://images.unsplash.com/photo-1590085327097-cf67e44baab3',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    impact: 'Managing $5M+ in assets',
    metrics: 'Real-time market data'
  }
];

const Projects = () => {
  const handleViewProject = () => {
    toast({
      title: "🚧 Project Links Coming Soon!",
      description: "Detailed case studies and live demos will be available shortly.",
      duration: 3000
    });
  };

  return (
    <section className="py-20 px-4 bg-black/20" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Showcase of impactful solutions built with modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-300/20 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
                    onClick={handleViewProject}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
                    onClick={handleViewProject}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-purple-200 text-sm mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full border border-purple-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Impact & Metrics */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-300 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{project.impact}</span>
                  </div>
                  <p className="text-purple-300 text-xs">{project.metrics}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
