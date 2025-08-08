import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, X, Send, Bold, Italic, List, ListOrdered, Heading1, Heading2, Image, YoutubeIcon, TableIcon, Code, Quote, Undo, Redo, Edit2, Check } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import { Table as TiptapTable } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TiptapYoutube from '@tiptap/extension-youtube';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const MergedDocumentEditor = ({ onSave, onAddToScript, content, projectTitle, isFullWidth = false }) => {
  const [autoComplete, setAutoComplete] = useState('');
  const [inlineChat, setInlineChat] = useState({ isOpen: false, position: { x: 0, y: 0 }, selectedText: '' });
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(projectTitle);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TiptapImage.configure({
        inline: false,
        allowBase64: true,
      }),
      TiptapTable.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TiptapYoutube.configure({
        width: 640,
        height: 480,
      }),
    ],
    content: content || '<h1>Welcome to Content Creator</h1><p>Start writing your scripts here...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Auto-completion functionality
      const text = editor.getText();
      const words = text.slice(-50);
      if (words.endsWith(' ') && words.trim().length > 10) {
        // Simulate auto-completion suggestion
        const suggestions = [
          "Consider adding more detail about this topic...",
          "You might want to expand on this idea...",
          "This could benefit from an example...",
          "Perhaps include some statistics here...",
          "A quote would strengthen this point..."
        ];
        setAutoComplete(suggestions[Math.floor(Math.random() * suggestions.length)]);
        setTimeout(() => setAutoComplete(''), 3000);
      }
    }
  });

  const editorRef = useRef(editor);

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Function to insert content at cursor position
  const insertContent = useCallback((newContent: string) => {
    if (editor) {
      editor.chain().focus().insertContent(`<p>${newContent}</p>`).run();
      toast({ title: 'Content Added', description: 'AI response added to document.' });
    }
  }, [editor, toast]);

  // Expose insertContent through onAddToScript
  useEffect(() => {
    if (onAddToScript) {
      onAddToScript(insertContent);
    }
  }, [onAddToScript, insertContent]);

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      onSave?.(content, editTitle);
      toast({ title: 'Document Saved', description: 'Your script has been saved successfully.' });
    }
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    handleSave();
  };

  const handleTitleCancel = () => {
    setEditTitle(projectTitle);
    setIsEditingTitle(false);
  };

  useEffect(() => {
    setEditTitle(projectTitle);
  }, [projectTitle]);

  const handleInlineChatSend = () => {
    if (!chatMessage.trim() || isLoading || !inlineChat.selectedText) return;
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Here's an improved version of your text...",
        "I've enhanced this section for better clarity...",
        "This revision should be more engaging...",
        "Here's a more professional way to phrase this..."
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      if (editor) {
        // Replace selected text with AI response
        editor.chain().focus().deleteSelection().insertContent(response).run();
      }
      
      setInlineChat({ ...inlineChat, isOpen: false });
      setChatMessage('');
      toast({ title: 'Content Updated', description: 'AI has updated your selected text.' });
      setIsLoading(false);
    }, 1000);
  };

  const handleSelection = useCallback(() => {
    if (!editor) return;
    
    const { from, to, empty } = editor.state.selection;
    if (!empty) {
      const selectedText = editor.state.doc.textBetween(from, to);
      if (selectedText.trim().length > 0) {
        const coords = editor.view.coordsAtPos(from);
        setInlineChat({ 
          isOpen: true, 
          position: { x: coords.left, y: coords.bottom + 10 }, 
          selectedText 
        });
      }
    } else {
      setInlineChat(prev => ({ ...prev, isOpen: false }));
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.on('selectionUpdate', handleSelection);
      return () => {
        editor.off('selectionUpdate', handleSelection);
      };
    }
  }, [editor, handleSelection]);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card flex-wrap">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="h-8 w-64"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleTitleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleTitleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{projectTitle}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsEditingTitle(true)}
                className="h-6 w-6 p-0"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="h-4 w-px bg-border mx-2" />
          
          {/* Formatting Tools */}
          <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-4 w-px bg-border mx-2" />
        
        <div className="flex items-center gap-1">
          <Button 
            variant={editor?.isActive('bold') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant={editor?.isActive('italic') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant={editor?.isActive('code') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleCode().run()}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-4 w-px bg-border mx-2" />
        
        <div className="flex items-center gap-1">
          <Button 
            variant={editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant={editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button 
            variant={editor?.isActive('blockquote') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-4 w-px bg-border mx-2" />
        
        <div className="flex items-center gap-1">
          <Button 
            variant={editor?.isActive('bulletList') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={editor?.isActive('orderedList') ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
             onClick={() => {
               const rows = prompt('Enter number of rows:', '3');
               const cols = prompt('Enter number of columns:', '3');
               if (rows && cols && !isNaN(parseInt(rows)) && !isNaN(parseInt(cols))) {
                 const numRows = Math.max(1, Math.min(20, parseInt(rows)));
                 const numCols = Math.max(1, Math.min(10, parseInt(cols)));
                 editor?.chain().focus().insertTable({ 
                   rows: numRows, 
                   cols: numCols, 
                   withHeaderRow: true 
                 }).run();
                 toast({ title: 'Table Added', description: `Created ${numRows}x${numCols} table successfully.` });
               }
             }}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-4 w-px bg-border mx-2" />
        
        <div className="flex items-center gap-1">
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
            <Image className="h-4 w-4" />
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
            <YoutubeIcon className="h-4 w-4" />
          </Button>
        </div>
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
        <div className={`h-full overflow-y-auto transition-all duration-300 ${isFullWidth ? 'px-8 max-w-5xl mx-auto' : 'p-4'}`}>
          <EditorContent 
            editor={editor} 
            className="prose prose-invert max-w-none min-h-screen focus:outline-none font-sans"
          />
        </div>
        
        {/* Inline Chat Panel */}
        {inlineChat.isOpen && (
          <Card className="fixed z-50 w-80 shadow-lg border border-border bg-background"
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