
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    // Store in localStorage for now
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    toast({
      title: "✅ Message Sent!",
      description: "Thanks for reaching out! I'll get back to you within 24 hours.",
      duration: 5000
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-purple-200 text-sm font-medium mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-purple-200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-purple-200 text-sm font-medium mb-2">
                Your Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#A489AD] hover:from-purple-700 hover:to-pink-700 text-black font-semibold py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-purple-300/20">
            <p className="text-purple-200 text-center text-sm">
              📧 Typically responds within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
