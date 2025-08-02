// File: components/MergedDocumentEditor.tsx

import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Save, FileText, Plus, Undo, Redo, X, Send, MessageCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit, Katex, Video, Heading, Table, Emoji, Excalidraw, ExportPdf, ExportWord, Image, ImageGif, Iframe, TaskList, TableOfContents, TextDirection, TextAlign, Twitter } from 'reactjs-tiptap-editor/extension-bundle';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { callLLM } from '@/lib/llmServices';

const extensions = [
  BaseKit, Katex, Video, Heading, Table, Emoji, Excalidraw, ExportPdf, ExportWord, Image, ImageGif,
  Iframe, TaskList, TextDirection, TextAlign, Twitter, TableOfContents
];

const MergedDocumentEditor = ({ onSave, onAddToScript }) => {
  const [content, setContent] = useState('<h1>Welcome to Content Creator</h1><p>Start writing your scripts here...</p>');
  const [autoComplete, setAutoComplete] = useState('');
  const [inlineChat, setInlineChat] = useState({ isOpen: false, position: { x: 0, y: 0 }, selectedText: '' });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave?.(content);
    toast({ title: 'Document Saved', description: 'Your script has been saved successfully.' });
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading || !inlineChat.selectedText) return;
    setIsLoading(true);
    const response = await callLLM(chatMessage, 'gemini', 'gemini-1.5-flash', 'API_KEY', `Selected text: "${inlineChat.selectedText}"`);
    setContent(prevContent => prevContent.replace(inlineChat.selectedText, response.content));
    setInlineChat({ ...inlineChat, isOpen: false });
    setChatMessage('');
    toast({ title: 'Content Updated', description: 'AI has updated your selected text.' });
    setIsLoading(false);
  };

  const handleContentChange = (value) => {
    setContent(value);
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setInlineChat({ isOpen: true, position: { x: rect.left, y: rect.bottom + 10 }, selectedText: selection.toString() });
    } else {
      setInlineChat(prev => ({ ...prev, isOpen: false }));
    }

    const words = value.slice(-50);
    if (words.endsWith(' ')) {
      callLLM(`Continue: "${words}"`, 'gemini', 'gemini-1.5-flash', 'API_KEY').then(response => {
        setAutoComplete(response.content.substring(0, 50));
        setTimeout(() => setAutoComplete(''), 3000);
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={isChatOpen ? 70 : 100} minSize={50}>
            {autoComplete && <div className="px-4 py-2 bg-muted/30 text-sm">Suggestion: {autoComplete}</div>}
            <div className="flex-1 relative">
              <RichTextEditor
                contentClass={'content-container'}
                output='html'
                content={content}
                onChangeContent={handleContentChange}
                extensions={extensions}
              />
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
