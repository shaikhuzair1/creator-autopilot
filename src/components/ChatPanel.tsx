import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Send, User, Bot, FileText, Lightbulb, 
  Copy, ThumbsUp, ThumbsDown, RotateCcw,
  Sparkles, Plus, Settings, X, Files
} from 'lucide-react';
import { callLLM } from '@/lib/llmServices';
import { useToast } from '@/hooks/use-toast';
import { caseStudies } from '@/data/caseStudies';
import { scriptTemplates } from '@/data/mockData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  onClose?: () => void;
  onAddToScript?: (content: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose, onAddToScript }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. I can help you with content creation, script writing, and provide suggestions based on your templates and case studies.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [llmProvider, setLlmProvider] = useState('gemini');
  const [model, setModel] = useState('gemini-1.5-flash');
  const [selectedCaseStudies, setSelectedCaseStudies] = useState<string[]>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let context = '';

      if (selectedCaseStudies.length > 0) {
        const studies = caseStudies.filter(cs => selectedCaseStudies.includes(cs.id));
        context += 'Referenced Case Studies:\n' + studies.map(cs => 
          `${cs.title}: ${cs.content.keyTakeaways.join(', ')}`
        ).join('\n') + '\n\n';
      }

      if (selectedTemplates.length > 0) {
        const templates = scriptTemplates.filter(t => selectedTemplates.includes(t.id));
        context += 'Referenced Templates:\n' + templates.map(t => 
          `${t.title}: ${t.description}`
        ).join('\n') + '\n\n';
      }

      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      const response = await callLLM(currentInput, llmProvider, model, apiKey, context);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] border-l border-[#2d2d30]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2d2d30] bg-[#252526]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#cccccc] uppercase tracking-wider">CHAT</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 hover:bg-[#2a2d2e]">
          <X className="h-3 w-3 text-[#cccccc]" />
        </Button>
      </div>

      {/* Context Selection */}
      <div className="px-3 py-2 border-b border-[#2d2d30] bg-[#1e1e1e]">
        <div className="flex gap-1 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCaseStudies(!showCaseStudies)}
            className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e] border border-[#454545]"
          >
            <FileText className="h-3 w-3 mr-1" />
            Case Studies
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e] border border-[#454545]"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            Templates
          </Button>
        </div>

        {/* Case Studies Selection */}
        {showCaseStudies && (
          <div className="mt-2">
            <div className="max-h-24 overflow-y-auto space-y-1">
              {caseStudies.map((study) => (
                <div key={study.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`case-${study.id}`}
                    checked={selectedCaseStudies.includes(study.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCaseStudies([...selectedCaseStudies, study.id]);
                      } else {
                        setSelectedCaseStudies(selectedCaseStudies.filter(id => id !== study.id));
                      }
                    }}
                    className="rounded"
                  />
                  <label htmlFor={`case-${study.id}`} className="text-xs truncate text-[#cccccc]">{study.title}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Selection */}
        {showTemplates && (
          <div className="mt-2">
            <div className="max-h-24 overflow-y-auto space-y-1">
              {scriptTemplates.map((template) => (
                <div key={template.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`template-${template.id}`}
                    checked={selectedTemplates.includes(template.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTemplates([...selectedTemplates, template.id]);
                      } else {
                        setSelectedTemplates(selectedTemplates.filter(id => id !== template.id));
                      }
                    }}
                    className="rounded"
                  />
                  <label htmlFor={`template-${template.id}`} className="text-xs truncate text-[#cccccc]">{template.title}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#007acc] flex items-center justify-center">
                  {message.role === 'user' ? <User className="h-2 w-2 text-white" /> : <Bot className="h-2 w-2 text-white" />}
                </div>
                <span className="text-xs text-[#cccccc] font-medium">
                  {message.role === 'user' ? 'You' : 'Copilot'}
                </span>
                <span className="text-xs text-[#6a9955]">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="ml-6 text-sm text-[#cccccc] leading-relaxed">
                {message.content}
              </div>
              {message.role === 'assistant' && (
                <div className="ml-6 flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      onAddToScript?.(message.content);
                      toast({ title: 'Added to Script', description: 'Content added to your document.' });
                    }}
                    className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e]"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add to Script
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e]">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e]">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-[#cccccc] hover:bg-[#2a2d2e]">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#007acc] flex items-center justify-center">
                  <Bot className="h-2 w-2 text-white" />
                </div>
                <span className="text-xs text-[#cccccc] font-medium">Copilot</span>
              </div>
              <div className="ml-6 text-sm text-[#cccccc]">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-[#007acc]"></div>
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>


      {/* Input */}
      <div className="p-3 border-t border-[#2d2d30] bg-[#1e1e1e] space-y-2">
        {/* Selected Context Display */}
        {(selectedCaseStudies.length > 0 || selectedTemplates.length > 0) && (
          <div className="flex gap-1 flex-wrap">
            {selectedCaseStudies.map((id) => {
              const study = caseStudies.find(s => s.id === id);
              return (
                <Badge key={id} variant="secondary" className="text-xs bg-[#2d2d30] text-[#cccccc] border-[#454545]">
                  {study?.title}
                  <button
                    onClick={() => setSelectedCaseStudies(selectedCaseStudies.filter(sid => sid !== id))}
                    className="ml-1 text-[#888] hover:text-[#cccccc]"
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
            {selectedTemplates.map((id) => {
              const template = scriptTemplates.find(t => t.id === id);
              return (
                <Badge key={id} variant="secondary" className="text-xs bg-[#2d2d30] text-[#cccccc] border-[#454545]">
                  {template?.title}
                  <button
                    onClick={() => setSelectedTemplates(selectedTemplates.filter(tid => tid !== id))}
                    className="ml-1 text-[#888] hover:text-[#cccccc]"
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot a question or type / for topics"
            className="flex-1 bg-[#3c3c3c] border-[#454545] text-[#cccccc] placeholder:text-[#888] text-sm min-h-[32px] max-h-32 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="sm"
            className="bg-[#007acc] hover:bg-[#005a9e] text-white h-8 w-8 p-0 flex-shrink-0"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Agent/Model Selection */}
        <div className="flex items-center gap-2">
          <Select value={`${llmProvider}-${model}`} onValueChange={(value) => {
            const parts = value.split('-');
            setLlmProvider(parts[0] as any);
            setModel(parts.slice(1).join('-'));
          }}>
            <SelectTrigger className="w-32 bg-[#2d2d30] border-[#454545] text-[#cccccc] text-xs h-6">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
              <SelectItem value="gemini-gemini-1.5-flash" className="text-xs">Gemini Flash</SelectItem>
              <SelectItem value="gemini-gemini-1.5-pro" className="text-xs">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;