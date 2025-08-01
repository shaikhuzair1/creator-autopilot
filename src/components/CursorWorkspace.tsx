import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import DocumentEditor from './DocumentEditor';
import ChatPanel from './ChatPanel';
import Sidebar from './Sidebar';

interface CursorWorkspaceProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onCreateNewChat: () => void;
}

const CursorWorkspace: React.FC<CursorWorkspaceProps> = ({
  isCollapsed,
  activeTab,
  onToggle,
  onTabChange,
  onCreateNewChat
}) => {
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [projects, setProjects] = useState<Array<{id: string, title: string, content: string}>>([
    { id: '1', title: 'Welcome Script', content: '# Welcome Script\n\nStart writing your content here...' }
  ]);

  const handleSaveDocument = (content: string) => {
    // Save document logic - for now just log
    console.log('Saving document:', content);
    // In a real app, this would save to database or file system
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
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

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Document Editor Panel */}
          <ResizablePanel defaultSize={isChatMinimized ? 100 : 70} minSize={50}>
            <DocumentEditor onSave={handleSaveDocument} />
          </ResizablePanel>

          {/* Chat Panel */}
          {!isChatMinimized && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <ChatPanel 
                  isMinimized={isChatMinimized}
                  onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
                  onAddToScript={(content) => {
                    // Add content to the current cursor position in the editor
                    console.log('Adding to script:', content);
                  }}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {/* Minimized Chat Button */}
        {isChatMinimized && (
          <ChatPanel 
            isMinimized={true}
            onToggleMinimize={() => setIsChatMinimized(false)}
            onAddToScript={(content) => {
              console.log('Adding to script:', content);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CursorWorkspace;