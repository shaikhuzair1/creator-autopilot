import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Bot, 
  User, 
  Settings, 
  X, 
  Send, 
  Paperclip, 
  Library,
  TrendingUp,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';
import { scriptTemplates, nicheTipics } from '@/data/mockData';
import { callLLM, hasApiKey, LLM_PROVIDERS } from '@/lib/llmServices';
import { LLMSelector } from './LLMSelector';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  isMinimized = false, 
  onToggleMinimize,
  onClose 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI assistant. I can help you improve your writing, generate content, and provide suggestions. Select text in the editor or ask me anything!',
      timestamp: new Date()
    }
  ]);
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string, title: string, type?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      const caseStudySuggestions = caseStudies.map(cs => ({ id: cs.id, title: cs.title, type: 'case-study' }));
      const templateSuggestions = scriptTemplates.map(st => ({ id: st.id, title: st.title, type: 'template' }));
      setSuggestions([...caseStudySuggestions, ...templateSuggestions]);
      setShowSuggestions(true);
    } else if (atIndex !== -1) {
      const searchTerm = value.slice(atIndex + 1).toLowerCase();
      const caseStudyFiltered = caseStudies
        .filter(cs => cs.title.toLowerCase().includes(searchTerm))
        .map(cs => ({ id: cs.id, title: cs.title, type: 'case-study' }));
      const templateFiltered = scriptTemplates
        .filter(st => st.title.toLowerCase().includes(searchTerm))
        .map(st => ({ id: st.id, title: st.title, type: 'template' }));
      const filtered = [...caseStudyFiltered, ...templateFiltered];
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {id: string, title: string, type?: string}) => {
    const atIndex = message.lastIndexOf('@');
    const newMessage = message.slice(0, atIndex) + `@${suggestion.title} `;
    setMessage(newMessage);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    if (!hasApiKey(selectedProvider)) {
      toast({
        title: "API Key Required",
        description: `Please configure your ${LLM_PROVIDERS.find(p => p.id === selectedProvider)?.name} API key first.`,
        variant: "destructive"
      });
      return;
    }
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    const currentMessage = message;
    setMessage('');
    setShowSuggestions(false);
    setIsLoading(true);
    
    try {
      // Check for references
      const referencedCaseStudies = caseStudies.filter(cs => 
        currentMessage.includes(`@${cs.title}`)
      );
      const referencedTemplates = scriptTemplates.filter(st => 
        currentMessage.includes(`@${st.title}`)
      );
      
      let context = '';
      
      if (referencedCaseStudies.length > 0) {
        context += referencedCaseStudies.map(cs => 
          `Case Study: ${cs.title}\nNiche: ${cs.niche}\nKey Takeaways: ${cs.content.keyTakeaways.join(', ')}\nStrategy: ${cs.content.strategy}\nResults: ${cs.content.results}`
        ).join('\n\n');
      }
      
      if (referencedTemplates.length > 0) {
        if (context) context += '\n\n';
        context += referencedTemplates.map(st => 
          `Script Template: ${st.title}\nCategory: ${st.category}\nDescription: ${st.description}\nContent: ${st.content}`
        ).join('\n\n');
      }
      
      const apiKey = localStorage.getItem(`${selectedProvider}_api_key`) || '';
      const response = await callLLM(currentMessage, selectedProvider, selectedModel, apiKey, context);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key and try again.",
        variant: "destructive"
      });
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your API key configuration.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTopicSuggestions = (niche: string) => {
    const topics = nicheTipics[niche as keyof typeof nicheTipics] || [];
    return topics;
  };

  if (isMinimized) {
    return (
      <Button
        onClick={onToggleMinimize}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
        size="sm"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="h-full flex flex-col bg-chat-background border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-chat-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          {onToggleMinimize && (
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted border border-border'
              }`}>
                <div className="flex items-start gap-2">
                  {msg.type === 'assistant' && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                  {msg.type === 'user' && <User className="h-4 w-4 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted border border-border rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-chat-border bg-chat-background p-4">
        {/* LLM Selector */}
        <div className="mb-3">
          <LLMSelector
            selectedProvider={selectedProvider}
            selectedModel={selectedModel}
            onProviderChange={setSelectedProvider}
            onModelChange={setSelectedModel}
          />
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="mb-3 max-h-32 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm border-b border-border last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded capitalize">
                    {suggestion.type === 'case-study' ? 'Case Study' : 'Template'}
                  </span>
                  <span className="font-medium">@{suggestion.title}</span>
                </div>
              </button>
            ))}
          </Card>
        )}

        {/* Topic Suggestions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Quick Topics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(nicheTipics).slice(0, 4).map((niche) => (
                <Button
                  key={niche}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 capitalize"
                  onClick={() => setMessage(`Generate content ideas for ${niche}`)}
                >
                  {niche}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="relative">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                placeholder="Ask me anything... (type @ to reference templates)"
                className="min-h-[80px] resize-none pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                  if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Paperclip className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Library className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="sm"
              className="h-[80px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;