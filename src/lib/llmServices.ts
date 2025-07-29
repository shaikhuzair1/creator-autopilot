import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMProvider {
  id: string;
  name: string;
  models: string[];
  requiresApiKey: boolean;
}

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    models: ['gemini-1.5-flash', 'gemini-1.5-pro'],
    requiresApiKey: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    requiresApiKey: true
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    models: ['claude-3.5-sonnet', 'claude-3-haiku', 'claude-3-opus'],
    requiresApiKey: true
  }
];

export interface LLMResponse {
  content: string;
  provider: string;
  model: string;
}

export const callLLM = async (
  prompt: string,
  provider: string,
  model: string,
  apiKey: string,
  context?: string
): Promise<LLMResponse> => {
  let fullPrompt = prompt;
  if (context) {
    fullPrompt = `Context: ${context}\n\nUser request: ${prompt}`;
  }

  switch (provider) {
    case 'gemini':
      return await callGemini(fullPrompt, model, apiKey);
    case 'openai':
      return await callOpenAI(fullPrompt, model, apiKey);
    case 'claude':
      return await callClaude(fullPrompt, model, apiKey);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

const callGemini = async (prompt: string, model: string, apiKey: string): Promise<LLMResponse> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({ model });
  
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  
  return {
    content: response.text(),
    provider: 'gemini',
    model
  };
};

const callOpenAI = async (prompt: string, model: string, apiKey: string): Promise<LLMResponse> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  
  return {
    content: data.choices[0].message.content,
    provider: 'openai',
    model
  };
};

const callClaude = async (prompt: string, model: string, apiKey: string): Promise<LLMResponse> => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error('Claude API request failed');
  }

  const data = await response.json();
  
  return {
    content: data.content[0].text,
    provider: 'claude',
    model
  };
};

// Storage helpers for API keys
export const getApiKey = (provider: string): string | null => {
  return localStorage.getItem(`${provider}_api_key`);
};

export const setApiKey = (provider: string, apiKey: string): void => {
  localStorage.setItem(`${provider}_api_key`, apiKey);
};

export const hasApiKey = (provider: string): boolean => {
  return !!localStorage.getItem(`${provider}_api_key`);
};