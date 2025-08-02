import React, { useState, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Save, FileText, Settings, X, Send, Upload, Image as ImageIcon, Video, Bold, Italic, 
  Heading1, Heading2, List, Table as TableIcon, 
  BarChart3, Plus, Youtube as YoutubeIcon, Undo, Redo, Quote, Code
} from 'lucide-react';
import { callLLM } from '@/lib/llmServices';
import { useToast } from '@/hooks/use-toast';

interface InlineChat {
  isOpen: boolean;
  position: { x: number; y: number };
  selectedText: string;
}

interface DocumentEditorProps {
  onSave?: (content: string) => void;
  onAddToScript?: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ onSave, onAddToScript }) => {
  const [inlineChat, setInlineChat] = useState<InlineChat>({
    isOpen: false,
    position: { x: 0, y: 0 },
    selectedText: ''
  });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showElementsSidebar, setShowElementsSidebar] = useState(false);
  const [autoComplete, setAutoComplete] = useState('');
  const chatPopupRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
      <h1>Content Creation Script</h1>
      
      <h2>Introduction</h2>
      <p>Welcome to your content creation workspace. This is where you can write, edit, and refine your scripts with AI assistance.</p>
      
      <h2>Features</h2>
      <ul>
        <li>TipTap rich text editor</li>
        <li>Inline AI assistance</li>
        <li>Auto-completion functionality</li>
        <li>Text selection chat</li>
        <li>YouTube video embedding</li>
        <li>Image and media support</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Select any text in this editor and start chatting with AI to improve your content.</p>
      
      <h2>Example Script Structure</h2>
      
      <h3>Hook</h3>
      <p>Start with an attention-grabbing hook...</p>
      
      <h3>Main Content</h3>
      <p>Develop your main points...</p>
      
      <h3>Call to Action</h3>
      <p>End with a strong call to action...</p>
    `,
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        const selectedText = editor.state.doc.textBetween(from, to);
        if (selectedText.trim().length > 0) {
          const domSelection = window.getSelection();
          if (domSelection && domSelection.rangeCount > 0) {
            const range = domSelection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setInlineChat({
              isOpen: true,
              position: { x: rect.left, y: rect.bottom + 10 },
              selectedText: selectedText.trim()
            });
          }
        }
      } else {
        setInlineChat(prev => ({ ...prev, isOpen: false }));
      }
    },
    onUpdate: ({ editor }) => {
      handleAutoComplete(editor);
    },
  });

  const handleAutoComplete = async (editorInstance: any) => {
    const { from, to } = editorInstance.state.selection;
    const textBefore = editorInstance.state.doc.textBetween(Math.max(0, from - 50), from);
    
    if (textBefore.length > 10 && textBefore.endsWith(' ')) {
      try {
        const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
        const prompt = `Based on this text: "${textBefore}", suggest a short continuation (max 10 words):`;
        
        const response = await callLLM(prompt, 'gemini', 'gemini-1.5-flash', apiKey);
        setAutoComplete(response.content.substring(0, 50));
        
        setTimeout(() => setAutoComplete(''), 3000);
      } catch (error) {
        console.error('Auto-complete error:', error);
      }
    }
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading || !editor) return;

    setIsLoading(true);
    try {
      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      const context = `Selected text: "${inlineChat.selectedText}"`;
      const prompt = `${chatMessage}\n\nPlease provide a response that I can use to improve or replace the selected text.`;
      
      const response = await callLLM(prompt, 'gemini', 'gemini-1.5-flash', apiKey, context);
      
      const { from, to } = editor.state.selection;
      editor.chain().focus().deleteRange({ from, to }).insertContent(response.content).run();

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
    if (!files || !editor) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      
      if (file.type.startsWith('image/')) {
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      } else if (file.type.startsWith('video/')) {
        editor.chain().focus().insertContent(`<video controls src="${url}" class="rounded-lg max-w-full h-auto"></video>`).run();
      }
    });
  };

  const handleYouTubeLink = (link: string) => {
    if (!editor) return;
    editor.chain().focus().setYoutubeVideo({ src: link }).run();
  };

  const insertAtCursor = (content: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(content).run();
  };

  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      onSave?.(content);
      toast({
        title: "Document Saved",
        description: "Your script has been saved successfully.",
      });
    }
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

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
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-card/50">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-muted' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-muted' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Auto-completion suggestion */}
        {autoComplete && (
          <div className="px-4 py-2 bg-muted/30 text-sm text-muted-foreground">
            Suggestion: {autoComplete}
          </div>
        )}

        {/* Editor */}
        <div className="flex-1 relative">
          <EditorContent 
            editor={editor} 
            className="h-full prose prose-sm max-w-none p-6 focus:outline-none"
          />

          {/* Inline Chat Popup */}
          {inlineChat.isOpen && (
            <Card 
              ref={chatPopupRef}
              className="absolute z-50 w-80 shadow-elevated border border-border bg-background"
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
    </div>
  );
};

export default DocumentEditor;