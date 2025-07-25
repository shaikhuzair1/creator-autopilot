import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Search, Paperclip, Library, Volume2, TrendingUp } from 'lucide-react';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      content: 'Welcome to Chat by Creator Autopilot. Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatHistory(prev => [...prev, { type: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: 'I can help you create amazing content! Here are some ideas based on your input:\n\n• Create engaging social media captions\n• Generate video script outlines\n• Develop content calendars\n• Write compelling thumbnails descriptions\n\nWhat would you like to work on first?'
      }]);
    }, 1000);
    
    setMessage('');
  };

  const examplePrompts = [
    "Summarize the latest news on generative AI",
    "Write a personalized email to [insert LinkedIn profile URL]",
    "Create a TikTok script about fitness motivation",
    "Generate YouTube video ideas for cooking channel"
  ];

  return (
    <div className="h-full flex flex-col bg-chat">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.length === 1 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Welcome to Chat by Creator Autopilot
              </h1>
              <p className="text-muted-foreground text-lg">
                Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.
              </p>
            </div>

            {/* Real-Time Search Section */}
            <Card className="p-6 max-w-2xl w-full">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Real-Time Search</h3>
              </div>
              <div className="space-y-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt)}
                    className="block w-full text-left p-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
              <Card className="p-4 text-center hover:shadow-elevated transition-shadow cursor-pointer">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">Trending Topics</h4>
                <p className="text-sm text-muted-foreground">Get ideas from trending content</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-elevated transition-shadow cursor-pointer">
                <Library className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">Content Library</h4>
                <p className="text-sm text-muted-foreground">Browse ready-to-use templates</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-elevated transition-shadow cursor-pointer">
                <Volume2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground">Voice & Tone</h4>
                <p className="text-sm text-muted-foreground">Set your brand voice</p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl p-4 rounded-lg ${
                  chat.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border border-border'
                }`}>
                  <p className="whitespace-pre-wrap">{chat.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-chat-border bg-chat p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-chat-input border border-chat-border rounded-lg p-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask or search anything"
              className="border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Library className="h-4 w-4 mr-2" />
                  Browse Prompts
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Volume2 className="h-4 w-4 mr-2" />
                  No Brand Voice
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Improve
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center mt-2">
            0/2,000 Words Used (0%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;