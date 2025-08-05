import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Save, X, Send, Bold, Italic, List, ListOrdered, Heading1, Heading2, Image, Youtube, Table } from 'lucide-react';
import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { callLLM } from '@/lib/llmServices';

const extensions = [BaseKit];

const MergedDocumentEditor = ({ onSave, onAddToScript }) => {
  const [content, setContent] = useState('<h1>Welcome to Content Creator</h1><p>Start writing your scripts here...</p>');
  const [autoComplete, setAutoComplete] = useState('');
  const [inlineChat, setInlineChat] = useState({ isOpen: false, position: { x: 0, y: 0 }, selectedText: '' });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const { toast } = useToast();

  // Function to insert content at cursor position
  const insertContent = (newContent) => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.chain().focus().insertContent(newContent).run();
      toast({ title: 'Content Added', description: 'AI response added to document.' });
    }
  };

  // Expose insertContent through onAddToScript
  React.useEffect(() => {
    if (onAddToScript) {
      (window as any).addToScript = insertContent;
    }
  }, [onAddToScript]);

  const handleSave = () => {
    onSave?.(content);
    toast({ title: 'Document Saved', description: 'Your script has been saved successfully.' });
  };

  const handleInlineChatSend = async () => {
    if (!chatMessage.trim() || isLoading || !inlineChat.selectedText) return;
    setIsLoading(true);
    try {
      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      const response = await callLLM(chatMessage, 'gemini', 'gemini-1.5-flash', apiKey, `Selected text: "${inlineChat.selectedText}"`);
      
      setContent(prevContent => prevContent.replace(inlineChat.selectedText, response.content));
      setInlineChat({ ...inlineChat, isOpen: false });
      setChatMessage('');
      toast({ title: 'Content Updated', description: 'AI has updated your selected text.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get AI response.', variant: 'destructive' });
    }
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

    // Auto-completion functionality
    const words = value.slice(-50);
    if (words.endsWith(' ')) {
      const apiKey = 'AIzaSyBHwP9KH6Lg4h7YqGP3H_JoKvQMqRtdWz8';
      callLLM(`Continue this text: "${words}"`, 'gemini', 'gemini-1.5-flash', apiKey).then(response => {
        setAutoComplete(response.content.substring(0, 50));
        setTimeout(() => setAutoComplete(''), 3000);
      }).catch(() => {});
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-card">
        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleBold().run()}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleItalic().run()}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleBulletList().run()}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editorRef.current?.editor?.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Auto-complete suggestion */}
      {autoComplete && (
        <div className="px-4 py-2 bg-muted/30 text-sm border-b border-border">
          <span className="text-muted-foreground">Suggestion: </span>
          <span className="text-foreground">{autoComplete}</span>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full overflow-y-auto">
          <RichTextEditor
            ref={editorRef}
            output='html'
            content={content}
            onChangeContent={handleContentChange}
            extensions={extensions}
          />
        </div>
        
        {/* Inline Chat Panel */}
        {inlineChat.isOpen && (
          <Card className="absolute z-50 w-80 shadow-lg border border-border bg-background"
            style={{ 
              left: Math.min(inlineChat.position.x, window.innerWidth - 320), 
              top: Math.min(inlineChat.position.y, window.innerHeight - 200)
            }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">AI Assistant</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setInlineChat({ ...inlineChat, isOpen: false })}
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
              <div className="space-y-2">
                <Textarea 
                  value={chatMessage} 
                  onChange={(e) => setChatMessage(e.target.value)} 
                  placeholder="Ask AI to improve this text..."
                  className="min-h-[80px] text-sm resize-none"
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
                  className="w-full"
                >
                  {isLoading ? 'Processing...' : 'Send'}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MergedDocumentEditor;