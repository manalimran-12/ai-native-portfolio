import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let requestCount = 0;
let quotaExceeded = false;

const initializeGemini = () => {
  if (quotaExceeded) return null;

  if (!genAI) {
    const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not found. Please set VITE_GOOGLE_GEMINI_API_KEY in .env.local');
      return null;
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export const getGeminiResponse = async (userMessage, chatbotKnowledge) => {
  try {
    // Check quota
    if (quotaExceeded) {
      return {
        success: false,
        quotaExceeded: true,
        message: "⚠️ Daily API quota has been exceeded. Please contact Manal directly for further questions! You can reach her through the contact form below. 📧"
      };
    }

    const client = initializeGemini();
    if (!client) {
      return {
        success: false,
        message: "⚠️ API not configured. Please contact Manal directly! You can reach her through the contact form below. 📧"
      };
    }

    requestCount++;

    // Create a prompt with Manal's knowledge base context
    const systemPrompt = `You are Manal Imran's AI assistant. You are knowledgeable about Manal's skills, experience, and projects.

Manal's Profile:
- Title: Full-Stack Developer & AI Integration Specialist
- Experience: 8+ years
- Skills: React, TypeScript, Node.js, Python, MongoDB, PostgreSQL, AWS, AI Integration
- Tech Stack: ${chatbotKnowledge.techStack.frontend.join(', ')} (frontend), ${chatbotKnowledge.techStack.backend.join(', ')} (backend)
- Specializations: ${chatbotKnowledge.specializations.map(s => s.title).join(', ')}

Notable Projects:
${chatbotKnowledge.projects.map(p => `- ${p.name}: ${p.description}`).join('\n')}

Services Offered:
${chatbotKnowledge.services.map(s => `- ${s.title}: ${s.description}`).join('\n')}

Work Experience:
${chatbotKnowledge.workExperience.map(w => `- ${w.role} at ${w.company} (${w.duration})`).join('\n')}

5-Year Goals:
${chatbotKnowledge.fiveYearGoals.map(g => `- ${g.goal}: ${g.description}`).join('\n')}

IMPORTANT INSTRUCTIONS FOR ANSWERING:
1. Be friendly, professional, and contextually appropriate
2. Always relate answers back to Manal's actual experience and skills
3. If asked about GOALS with different timeframes (7 years, 10 years, etc.):
   - Acknowledge the timeframe asked
   - Provide the 5-year goals as the core plan
   - Extend the vision appropriately for longer timeframes (e.g., "Beyond 5 years, she plans to...")
   - Be creative but realistic based on her goals
4. If asked about technologies or skills, confirm what Manal knows and examples
5. For new variations of questions, adapt the answer to match the specific question asked
6. Be honest if something is not in Manal's expertise
7. Suggest contacting Manal for detailed discussions
8. Keep responses concise but comprehensive`;

    const model = client.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent([
      {
        text: systemPrompt
      },
      {
        text: `User Question: ${userMessage}\n\nPlease answer this question about Manal based on the information above.`
      }
    ]);

    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      message: text
    };
  } catch (error) {
    console.error('Gemini API Error:', error);

    // Check for quota exceeded error
    if (error.message?.includes('quota') || error.message?.includes('429') || error.status === 429) {
      quotaExceeded = true;
      return {
        success: false,
        quotaExceeded: true,
        message: "⚠️ Daily API quota has been exceeded. Please contact Manal directly for further questions! You can reach her through the contact form below. 📧"
      };
    }

    // Check for authentication error
    if (error.message?.includes('authentication') || error.message?.includes('api_key') || error.status === 401) {
      return {
        success: false,
        message: "⚠️ API key is not configured correctly. Please contact Manal directly! You can reach her through the contact form below. 📧"
      };
    }

    // Generic error
    return {
      success: false,
      message: `⚠️ I encountered an issue processing that question. Please contact Manal directly! You can reach her through the contact form below. 📧`
    };
  }
};

export const isQuotaExceeded = () => quotaExceeded;
export const getRequestCount = () => requestCount;
