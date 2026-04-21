import { GoogleGenerativeAI } from "@google/generative-ai";
import chatbotKnowledge from "@/data/chatbotKnowledge";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

// Create system prompt for Manal context
const systemPrompt = `You are an AI assistant for Manal Imran, a Full-Stack Developer & AI Integration Specialist with 8+ years of experience.

IMPORTANT KNOWLEDGE ABOUT MANAL:
${JSON.stringify(chatbotKnowledge, null, 2)}

Guidelines:
1. Answer all questions about Manal based on the knowledge provided above
2. Be friendly, professional, and enthusiastic
3. If asked about skills or technologies, refer to the techStack section
4. Always provide specific examples from her projects when relevant
5. If asked about goals, refer to fiveYearGoals
6. Keep responses conversational but informative
7. If you don't know something, suggest contacting Manal directly
8. Always be honest about what Manal can and cannot do
`;

export const getAIResponse = async (userMessage) => {
  try {
    // Check if API key is configured
    if (!apiKey) {
      return {
        error: true,
        message: "API not configured. Please contact Manal directly for more information! 📧"
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(
      `Context: You are helping answer questions about Manal Imran.\n\n${systemPrompt}\n\nUser Question: ${userMessage}`
    );

    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      message: text,
      source: "AI"
    };
  } catch (error) {
    console.error("AI API Error:", error);

    // Check if it's a quota/rate limit error
    if (error.message?.includes("quota") || error.message?.includes("rate")) {
      return {
        error: true,
        message: "I've reached my daily API limit! 😅 Please contact Manal directly at the bottom of the page for more detailed answers. She typically responds within 24 hours! 📧"
      };
    }

    // Generic error
    return {
      error: true,
      message: "Having trouble accessing my knowledge base. Please contact Manal directly for assistance! 📧"
    };
  }
};
