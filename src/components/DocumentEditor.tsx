// File: components/MergedDocumentEditor.tsx

import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Save, FileText, Plus, Undo, Redo, X, Send, MessageCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Youtube } from '@tiptap/extension-youtube';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { callLLM } from '@/lib/llmServices';

const extensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'max-w-full h-auto',
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube.configure({
    width: 640,
    height: 480,
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
];

const MergedDocumentEditor = ({ onSave, onAddToScript }) => {
  const [autoComplete, setAutoComplete] = useState('');
  const [inlineChat, setInlineChat] = useState({ isOpen: false, position: { x: 0, y: 0 }, selectedText: '' });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const editor = useEditor({
    extensions,
    content: '<h1>Welcome to Content Creator</h1><p>Start writing your scripts here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-screen p-8',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      handleContentChange(content);
    },
  });

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      onSave?.(content);
      toast({ title: 'Document Saved', description: 'Your script has been saved successfully.' });
    }
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading || !inlineChat.selectedText || !editor) return;
    setIsLoading(true);
    try {
      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      const response = await callLLM(chatMessage, 'gemini', 'gemini-1.5-flash', apiKey, `Selected text: "${inlineChat.selectedText}"`);
      
      // Replace selected text with AI response
      const content = editor.getHTML().replace(inlineChat.selectedText, response.content);
      editor.commands.setContent(content);
      
      setInlineChat({ ...inlineChat, isOpen: false });
      setChatMessage('');
      toast({ title: 'Content Updated', description: 'AI has updated your selected text.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get AI response.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleContentChange = (content) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setInlineChat({ isOpen: true, position: { x: rect.left, y: rect.bottom + 10 }, selectedText: selection.toString() });
    } else {
      setInlineChat(prev => ({ ...prev, isOpen: false }));
    }

    // Auto-completion functionality
    const words = content.slice(-50);
    if (words.endsWith(' ')) {
      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      callLLM(`Continue this text: "${words}"`, 'gemini', 'gemini-1.5-flash', apiKey).then(response => {
        setAutoComplete(response.content.substring(0, 50));
        setTimeout(() => setAutoComplete(''), 3000);
      }).catch(() => {});
    }
  };

  const addContentAtCursor = (content) => {
    if (editor) {
      editor.chain().focus().insertContent(content).run();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={isChatOpen ? 70 : 100} minSize={50}>
            {autoComplete && <div className="px-4 py-2 bg-muted/30 text-sm">Suggestion: {autoComplete}</div>}
            <div className="flex-1 relative">
              {/* Toolbar */}
              <div className="border-b border-border bg-background p-2 flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'bg-muted' : ''}
                >
                  <strong>B</strong>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'bg-muted' : ''}
                >
                  <em>I</em>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor?.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
                >
                  H1
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor?.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
                >
                  H2
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={editor?.isActive('bulletList') ? 'bg-muted' : ''}
                >
                  • List
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const url = prompt('Enter YouTube URL:');
                    if (url) {
                      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
                    }
                  }}
                >
                  📹 YouTube
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) {
                      editor?.chain().focus().setImage({ src: url }).run();
                    }
                  }}
                >
                  🖼️ Image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                >
                  📊 Table
                </Button>
              </div>
              
              <EditorContent editor={editor} className="min-h-[500px]" />
              {inlineChat.isOpen && (
                <Card className="absolute z-50 w-80 shadow-elevated border border-border bg-background"
                  style={{ left: Math.min(inlineChat.position.x, window.innerWidth - 320), top: inlineChat.position.y }}>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">AI Assistant</span>
                      <Button variant="ghost" size="sm" onClick={() => setInlineChat({ ...inlineChat, isOpen: false })}><X className="h-4 w-4" /></Button>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1">Selected text:</div>
                      <div className="text-xs bg-muted p-2 rounded max-h-20 overflow-y-auto">"{inlineChat.selectedText}"</div>
                    </div>
                    <div className="flex gap-2">
                      <Textarea value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Ask AI to improve this text..."
                        className="flex-1 min-h-[80px] text-sm"
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInlineChatSend(); } }}
                      />
                      <Button onClick={handleInlineChatSend} disabled={!chatMessage.trim() || isLoading} size="sm" className="self-end"><Send className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </ResizablePanel>

          {isChatOpen && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <ChatPanel onClose={() => setIsChatOpen(false)} onAddToScript={onAddToScript} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MergedDocumentEditor;
