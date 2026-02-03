
import { useState, useCallback } from 'react';
import chatbotKnowledge from '@/data/chatbotKnowledge';
import { getGeminiResponse, isQuotaExceeded } from '@/lib/geminiClient';

const useChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Manal's AI assistant. I can tell you about her skills, projects, experience, and goals. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiUsedForLastMessage, setApiUsedForLastMessage] = useState(false);

  const findBestMatch = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for greetings
    if (message.match(/^(hi|hello|hey|greetings)/)) {
      return { 
        text: `Hello! 👋 I'm here to tell you all about Manal Imran, a talented full-stack developer with 8+ years of experience. What would you like to know?`,
        useAPI: false
      };
    }

    // Function to calculate keyword match score
    const calculateKeywordMatch = (keywords, messageText) => {
      if (!keywords) return 0;
      const matchedKeywords = keywords.filter(keyword => messageText.includes(keyword));
      return matchedKeywords.length;
    };

    // Check interviewQA with keyword-based matching (handles variations)
    let bestMatch = null;
    let bestMatchScore = 0;

    for (const qa of chatbotKnowledge.interviewQA) {
      const score = calculateKeywordMatch(qa.keywords, message);
      if (score > bestMatchScore) {
        bestMatch = qa;
        bestMatchScore = score;
      }
    }

    // If we found a good match through keywords, return it (don't use API)
    if (bestMatchScore > 0) {
      return { 
        text: bestMatch.answer,
        useAPI: false
      };
    }

    // Additional custom checks for structured data (not covered by keywords)
    // Check for tech stack questions
    if (message.includes('tech stack') || message.includes('technologies') || message.includes('tools')) {
      const frontend = chatbotKnowledge.techStack.frontend.join(', ');
      const backend = chatbotKnowledge.techStack.backend.join(', ');
      const databases = chatbotKnowledge.techStack.databases.join(', ');
      return { 
        text: `Manal works with a modern tech stack:\n\n🎨 Frontend: ${frontend}\n⚙️ Backend: ${backend}\n💾 Databases: ${databases}\n\nShe's also experienced with AI/ML tools like OpenAI API, LangChain, and TensorFlow!`,
        useAPI: false
      };
    }

    // Check for projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('built')) {
      const projectsList = chatbotKnowledge.projects.map(p => 
        `• ${p.name}: ${p.description} (${p.techStack.slice(0, 3).join(', ')})`
      ).join('\n');
      return { 
        text: `Here are some notable projects Manal has built:\n\n${projectsList}\n\nEach project demonstrates her expertise in full-stack development and problem-solving!`,
        useAPI: false
      };
    }

    // Check for experience
    if (message.includes('experience') || message.includes('work') || message.includes('career')) {
      const latestJob = chatbotKnowledge.workExperience[0];
      return { 
        text: `Manal has 8+ years of professional experience! Currently, she's a ${latestJob.role} at ${latestJob.company} (${latestJob.duration}), where she has:\n\n${latestJob.achievements.map(a => `• ${a}`).join('\n')}\n\nShe's worked across multiple companies and led successful teams!`,
        useAPI: false
      };
    }

    // Check for skills
    if (message.includes('skill') || message.includes('expertise') || message.includes('specialize')) {
      const specs = chatbotKnowledge.specializations.map(s => 
        `• ${s.title}: ${s.description}`
      ).join('\n\n');
      return { 
        text: `Manal specializes in:\n\n${specs}`,
        useAPI: false
      };
    }

    // Check for contact/availability
    if (message.includes('contact') || message.includes('reach') || message.includes('available')) {
      return { 
        text: `Manal is currently available for new projects! She works remotely and can accommodate different time zones. You can reach her by scrolling down to the contact form at the bottom of the page. She typically responds within 24 hours! 📧`,
        useAPI: false
      };
    }

    // Check for about/introduction
    if (message.includes('about') || message.includes('who are you') || message.includes('introduction')) {
      return { 
        text: `${chatbotKnowledge.personalInfo.name} is a ${chatbotKnowledge.personalInfo.title} with ${chatbotKnowledge.personalInfo.experience} of experience. ${chatbotKnowledge.personalInfo.tagline}. She's passionate about building intelligent web solutions and helping others grow as developers!`,
        useAPI: false
      };
    }

    // No match found in knowledge base - use API for intelligent response
    return { 
      text: null,
      useAPI: true
    };
  };

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // First check if answer is in knowledge base
      const matchResult = findBestMatch(text);

      let botResponseText;
      let isAPIResponse = false;

      if (!matchResult.useAPI) {
        // Answer found in knowledge base - use it directly
        botResponseText = matchResult.text;
        isAPIResponse = false;

        // Simulate typing delay for local response
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
            isAPIResponse: false
          };

          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }, 800 + Math.random() * 400);
      } else {
        // No match in knowledge base - use Gemini API for intelligent response
        const aiResponse = await getGeminiResponse(text, chatbotKnowledge);

        if (!aiResponse.success) {
          botResponseText = aiResponse.message;
        } else {
          botResponseText = aiResponse.message;
        }

        isAPIResponse = true;

        // Add small delay for API response
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
            isAPIResponse: true
          };

          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please contact Manal directly! 📧",
        sender: 'bot',
        timestamp: new Date(),
        isAPIResponse: false
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }, []);

  const handleQuickReply = useCallback((reply) => {
    sendMessage(reply);
  }, [sendMessage]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage,
    handleQuickReply,
    quickReplies: chatbotKnowledge.quickReplies
  };
};

export default useChatbot;
