import { GoogleGenerativeAI } from '@google/generative-ai';

// This is a placeholder - users should add their own API key
const API_KEY = localStorage.getItem('gemini_api_key') || '';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey: string) => {
  localStorage.setItem('gemini_api_key', apiKey);
  genAI = new GoogleGenerativeAI(apiKey);
};

export const getGeminiResponse = async (prompt: string, context?: string): Promise<string> => {
  if (!genAI) {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured');
    }
    genAI = new GoogleGenerativeAI(API_KEY);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    let fullPrompt = prompt;
    if (context) {
      fullPrompt = `Context: ${context}\n\nUser request: ${prompt}`;
    }

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from Gemini AI');
  }
};

export const hasApiKey = (): boolean => {
  return !!localStorage.getItem('gemini_api_key');
};