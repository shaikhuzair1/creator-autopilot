import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Save, FileText, Settings, X, Send } from 'lucide-react';
import { callLLM } from '@/lib/llmServices';
import { useToast } from '@/hooks/use-toast';

interface InlineChat {
  isOpen: boolean;
  position: { x: number; y: number };
  selectedText: string;
  range: any;
}

interface DocumentEditorProps {
  onSave?: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ onSave }) => {
  const [content, setContent] = useState(`# Content Creation Script

## Introduction
Welcome to your content creation workspace. This is where you can write, edit, and refine your scripts with AI assistance.

## Features
- Monaco Editor with syntax highlighting
- Inline AI assistance
- Auto-save functionality
- Text selection chat

## Getting Started
Select any text in this editor and start chatting with AI to improve your content.

## Example Script Structure

### Hook
Start with an attention-grabbing hook...

### Main Content
Develop your main points...

### Call to Action
End with a strong call to action...
`);
  const [inlineChat, setInlineChat] = useState<InlineChat>({
    isOpen: false,
    position: { x: 0, y: 0 },
    selectedText: '',
    range: null
  });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null);
  const { toast } = useToast();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      fontSize: 14,
      lineHeight: 24,
      padding: { top: 20, bottom: 20 },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'line',
      selectionHighlight: false,
      occurrencesHighlight: false,
      roundedSelection: false,
      minimap: { enabled: false }
    });

    // Handle text selection
    editor.onDidChangeCursorSelection((e: any) => {
      const selection = editor.getSelection();
      if (!selection.isEmpty()) {
        const selectedText = editor.getModel().getValueInRange(selection);
        if (selectedText.trim().length > 0) {
          // Get position of selection end
          const position = editor.getScrolledVisiblePosition(selection.getEndPosition());
          if (position) {
            setInlineChat({
              isOpen: true,
              position: { x: position.left, y: position.top + 20 },
              selectedText: selectedText.trim(),
              range: selection
            });
          }
        }
      } else {
        setInlineChat(prev => ({ ...prev, isOpen: false }));
      }
    });

    // Handle click outside editor
    editor.onDidBlurEditorText(() => {
      setTimeout(() => {
        setInlineChat(prev => ({ ...prev, isOpen: false }));
      }, 100);
    });
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem('gemini_api_key') || '';
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please configure your Gemini API key first.",
          variant: "destructive"
        });
        return;
      }

      const context = `Selected text: "${inlineChat.selectedText}"`;
      const prompt = `${chatMessage}\n\nPlease provide a response that I can use to improve or replace the selected text.`;
      
      const response = await callLLM(prompt, 'gemini', 'gemini-1.5-flash', apiKey, context);
      
      // Replace selected text with AI response
      if (editorRef.current && inlineChat.range) {
        const edit = {
          range: inlineChat.range,
          text: response.content
        };
        editorRef.current.executeEdits('ai-edit', [edit]);
      }

      toast({
        title: "Content Updated",
        description: "AI has updated your selected text.",
      });

      setInlineChat(prev => ({ ...prev, isOpen: false }));
      setChatMessage('');
    } catch (error) {
      console.error('Inline chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    onSave?.(content);
    toast({
      title: "Document Saved",
      description: "Your script has been saved successfully.",
    });
  };

  const quickActions = [
    { label: "Improve this", action: "Improve and enhance this text while maintaining its meaning" },
    { label: "Make shorter", action: "Make this text more concise and to the point" },
    { label: "Add humor", action: "Add appropriate humor to this text while keeping it professional" },
    { label: "Explain better", action: "Rewrite this to be clearer and easier to understand" }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Script Document</span>
          <span className="text-sm text-muted-foreground">• Auto-saved</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          onChange={(value) => setContent(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            wordWrap: 'on',
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
            lineHeight: 24,
            padding: { top: 20, bottom: 20 },
          }}
        />

        {/* Inline Chat Popup */}
        {inlineChat.isOpen && (
          <Card 
            className="absolute z-50 w-80 shadow-elevated border border-border bg-chat-background"
            style={{
              left: Math.min(inlineChat.position.x, window.innerWidth - 320),
              top: inlineChat.position.y
            }}
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">AI Assistant</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setInlineChat(prev => ({ ...prev, isOpen: false }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-3">
                <div className="text-xs text-muted-foreground mb-1">Selected text:</div>
                <div className="text-xs bg-muted p-2 rounded max-h-20 overflow-y-auto">
                  "{inlineChat.selectedText}"
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-3">
                <div className="text-xs text-muted-foreground mb-2">Quick actions:</div>
                <div className="grid grid-cols-2 gap-1">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => {
                        setChatMessage(action.action);
                        handleInlineChatSend();
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask AI to improve this text..."
                  className="flex-1 min-h-[80px] text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleInlineChatSend();
                    }
                  }}
                />
                <Button 
                  onClick={handleInlineChatSend}
                  disabled={!chatMessage.trim() || isLoading}
                  size="sm"
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;