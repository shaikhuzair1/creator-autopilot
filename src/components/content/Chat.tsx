import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Search, Paperclip, Library, Volume2, TrendingUp, Settings } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';
import { getGeminiResponse, hasApiKey } from '@/lib/gemini';
import PromptLibrary from './PromptLibrary';
import ApiKeyDialog from '../ApiKeyDialog';
import { useToast } from '@/hooks/use-toast';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      content: 'Welcome to Chat by Creator Autopilot. Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.'
    }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string, title: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      // Show all case studies when @ is typed
      setSuggestions(caseStudies.map(cs => ({ id: cs.id, title: cs.title })));
      setShowSuggestions(true);
    } else if (atIndex !== -1) {
      // Filter case studies based on what's typed after @
      const searchTerm = value.slice(atIndex + 1).toLowerCase();
      const filtered = caseStudies
        .filter(cs => cs.title.toLowerCase().includes(searchTerm))
        .map(cs => ({ id: cs.id, title: cs.title }));
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {id: string, title: string}) => {
    const atIndex = message.lastIndexOf('@');
    const newMessage = message.slice(0, atIndex) + `@${suggestion.title} `;
    setMessage(newMessage);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    if (!hasApiKey()) {
      setShowApiKeyDialog(true);
      return;
    }
    
    // Check if message contains case study references
    const referencedCaseStudies = caseStudies.filter(cs => 
      message.includes(`@${cs.title}`)
    );
    
    // Add user message
    const userMessage = { type: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentMessage = message;
    setMessage('');
    setShowSuggestions(false);
    setIsLoading(true);
    
    try {
      let context = '';
      if (referencedCaseStudies.length > 0) {
        context = referencedCaseStudies.map(cs => 
          `Case Study: ${cs.title}\nNiche: ${cs.niche}\nKey Takeaways: ${cs.content.keyTakeaways.join(', ')}\nStrategy: ${cs.content.strategy}\nResults: ${cs.content.results}`
        ).join('\n\n');
      }
      
      const response = await getGeminiResponse(currentMessage, context);
      
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive"
      });
      
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your API key configuration.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "Summarize the latest news on generative AI",
    "Write a personalized email to [insert LinkedIn profile URL]",
    "Create a TikTok script about fitness motivation",
    "Generate YouTube video ideas for cooking channel"
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {chatHistory.length === 1 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-10 max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-foreground mb-4">
                Welcome to <span className="font-bold">Chat by Copy.ai</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.
              </p>
            </div>

            {/* Real-Time Search Section */}
            <div className="w-full max-w-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Search className="h-5 w-5 text-foreground" />
                <h3 className="font-medium text-foreground">Real-Time Search</h3>
              </div>
              <div className="space-y-3">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt)}
                    className="block w-full text-left p-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-transparent hover:border-border"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl p-4 rounded-lg ${
                  chat.type === 'user' 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted border border-border'
                }`}>
                  <p className="whitespace-pre-wrap">{chat.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-border bg-white">
        {/* Info Bar */}
        <div className="px-8 py-3 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2">ℹ</span>
            Chat shared with everyone in General teamspace.
            <button className="ml-2 text-blue-600 hover:underline">
              Switch to private teamspace →
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                placeholder="Ask or search anything (type @ to reference case studies)"
                className="min-h-[60px] resize-none border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring pr-20"
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
              
              {/* Case Study Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="font-medium">@{suggestion.title}</span>
                    </button>
                  ))}
                </div>
              )}
              
              <div className="absolute bottom-3 right-3">
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8">
                  <Paperclip className="h-4 w-4" />
                  <span className="ml-1">Attach</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground h-8"
                  onClick={() => setShowPromptLibrary(true)}
                >
                  <Library className="h-4 w-4" />
                  <span className="ml-1">Browse Prompts</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8">
                  <Volume2 className="h-4 w-4" />
                  <span className="ml-1">No Brand Voice</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground h-8"
                  onClick={() => setShowApiKeyDialog(true)}
                >
                  <Settings className="h-4 w-4" />
                  <span className="ml-1">API Settings</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8">
                  <TrendingUp className="h-4 w-4" />
                  <span className="ml-1">Improve</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Library Dialog */}
      <PromptLibrary
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onSelectPrompt={(prompt) => setMessage(prompt)}
      />

      {/* API Key Dialog */}
      <ApiKeyDialog
        isOpen={showApiKeyDialog}
        onClose={() => setShowApiKeyDialog(false)}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Gemini AI has been configured successfully!"
          });
        }}
      />
    </div>
  );
};

export default Chat;