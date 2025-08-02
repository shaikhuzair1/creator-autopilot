import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import DocumentEditor from './DocumentEditor';
import ChatPanel from './ChatPanel';
import Sidebar from './Sidebar';
import RichTextEditor from 'reactjs-tiptap-editor';
import {BaseKit , Heading,Table,Emoji,Excalidraw,ExportPdf,ExportWord,Image,ImageGif,Iframe,
  ImportWord,TaskList,TableOfContents,TextDirection,TextAlign,Twitter} from 'reactjs-tiptap-editor/extension-bundle';
  import './editor.css'
interface CursorWorkspaceProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onCreateNewChat: () => void;
}
const extensions = [BaseKit , Heading,Table,Emoji,Excalidraw,ExportPdf,ExportWord,Image,ImageGif,Iframe,
  TaskList,
  TextDirection,
  TextAlign,
  Twitter,
  TableOfContents
]
const DEFAULT = '';
const CursorWorkspace: React.FC<CursorWorkspaceProps> = ({
  isCollapsed,
  activeTab,
  onToggle,
  onTabChange,
  onCreateNewChat
}) => {
   const [content, setContent] = useState(DEFAULT);

  const onChangeContent = (value: any) => {
    setContent(value);
  };

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [projects, setProjects] = useState<Array<{id: string, title: string, content: string}>>([
    { id: '1', title: 'Welcome Script', content: '# Welcome Script\n\nStart writing your content here...' }
  ]);

  const handleSaveDocument = (content: string) => {
    // Save document logic - for now just log
    console.log('Saving document:', content);
    // In a real app, this would save to database or file system
  };

  const handleAddToScript = (content: string) => {
    // Add content to the current cursor position in the editor
    console.log('Adding to script:', content);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between h-12 px-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">Content Creator</span>
        </div>
        
        {/* Chat Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-2"
        >
          {isChatOpen ? (
            <>
              <X className="h-4 w-4" />
              Close Chat
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" />
              AI Assistant
            </>
          )}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar
            isCollapsed={isCollapsed}
            activeTab={activeTab}
            onToggle={onToggle}
            onTabChange={onTabChange}
            onCreateNewChat={onCreateNewChat}
          />
        </div>

        {/* Document Editor and Chat */}
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Document Editor Panel */}
            <ResizablePanel defaultSize={isChatOpen ? 70 : 100} minSize={50}>
              {/* <DocumentEditor 
                onSave={handleSaveDocument} 
                onAddToScript={handleAddToScript}
              /> */}
                <RichTextEditor
                  contentClass={'content-container'}
                  output='html'
                  content={content}
                  onChangeContent={onChangeContent}
                  extensions={extensions}
                />
            </ResizablePanel>

            {/* Chat Panel */}
            {isChatOpen && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                  <ChatPanel 
                    onClose={() => setIsChatOpen(false)}
                    onAddToScript={handleAddToScript}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default CursorWorkspace;