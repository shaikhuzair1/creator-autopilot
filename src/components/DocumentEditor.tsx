import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Save, FileText, Settings, X, Send, Upload, Image, Video, Bold, Italic, 
  Heading1, Heading2, List, AlignLeft, AlignCenter, AlignRight, Table, 
  BarChart3, Plus, Minus, ChevronLeft, Youtube
} from 'lucide-react';
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
  onAddToScript?: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ onSave, onAddToScript }) => {
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
  const [showElementsSidebar, setShowElementsSidebar] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, type: string, url: string}>>([]);
  const editorRef = useRef<any>(null);
  const chatPopupRef = useRef<HTMLDivElement>(null);
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

    // Handle click outside editor but not on chat popup
    editor.onDidBlurEditorText(() => {
      setTimeout(() => {
        if (chatPopupRef.current && !chatPopupRef.current.contains(document.activeElement)) {
          setInlineChat(prev => ({ ...prev, isOpen: false }));
        }
      }, 100);
    });
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem('gemini_api_key') || 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const fileData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        url
      };
      
      setUploadedFiles(prev => [...prev, fileData]);
      
      // Insert file reference in editor
      if (editorRef.current) {
        const editor = editorRef.current;
        const position = editor.getPosition();
        let insertText = '';
        
        if (file.type.startsWith('image/')) {
          insertText = `![${file.name}](${url})\n`;
        } else if (file.type.startsWith('video/')) {
          insertText = `<video controls src="${url}" alt="${file.name}"></video>\n`;
        } else {
          insertText = `[${file.name}](${url})\n`;
        }
        
        editor.executeEdits('file-upload', [{
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          },
          text: insertText
        }]);
      }
    });
  };

  const handleYouTubeLink = (link: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      const videoId = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      const embedCode = videoId 
        ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>\n`
        : `[YouTube Video](${link})\n`;
      
      editor.executeEdits('youtube-embed', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: embedCode
      }]);
    }
  };

  const insertAtCursor = (text: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      editor.executeEdits('insert-element', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: text
      }]);
    }
  };

  const formatText = (format: string) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const selection = editor.getSelection();
    const selectedText = editor.getModel().getValueInRange(selection);
    
    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      default:
        break;
    }
    
    editor.executeEdits('format-text', [{
      range: selection,
      text: formattedText
    }]);
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

  const elementTemplates = [
    { name: "Table", icon: Table, template: "\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n" },
    { name: "Chart", icon: BarChart3, template: "\n```chart\ntype: bar\ndata:\n  labels: ['Jan', 'Feb', 'Mar']\n  values: [10, 20, 30]\n```\n" },
    { name: "YouTube Embed", icon: Youtube, template: "", action: "youtube" },
    { name: "Image Upload", icon: Image, template: "", action: "image" },
    { name: "Video Upload", icon: Video, template: "", action: "video" }
  ];

  return (
    <div className="h-full flex bg-background">
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Script Document</span>
            <span className="text-sm text-muted-foreground">• Auto-saved</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowElementsSidebar(!showElementsSidebar)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-card/50">
          <Button variant="ghost" size="sm" onClick={() => formatText('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => formatText('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" onClick={() => formatText('h1')}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => formatText('h2')}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" onClick={() => insertAtCursor('- ')}>
            <List className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button variant="ghost" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
            <Upload className="h-4 w-4" />
          </Button>
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
              ref={chatPopupRef}
              className="absolute z-50 w-80 shadow-elevated border border-border bg-chat-background"
              style={{
                left: Math.min(inlineChat.position.x, window.innerWidth - 320),
                top: inlineChat.position.y
              }}
              onMouseDown={(e) => e.stopPropagation()}
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

      {/* Elements Sidebar */}
      {showElementsSidebar && (
        <div className="w-80 border-l border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Elements</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowElementsSidebar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {elementTemplates.map((element, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => {
                    if (element.action === 'youtube') {
                      const link = prompt('Enter YouTube URL:');
                      if (link) handleYouTubeLink(link);
                    } else if (element.action === 'image' || element.action === 'video') {
                      document.getElementById('file-upload')?.click();
                    } else {
                      insertAtCursor(element.template);
                    }
                    setShowElementsSidebar(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <element.icon className="h-5 w-5" />
                    <span>{element.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;