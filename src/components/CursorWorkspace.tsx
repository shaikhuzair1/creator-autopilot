import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ChatPanel from './ChatPanel';
import Sidebar from './Sidebar';
import AuthModal from './AuthModal';
import './editor.css'
import MergedDocumentEditor from './DocumentEditor';
interface CursorWorkspaceProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onCreateNewChat: () => void;
}
const DEFAULT = '';
const CursorWorkspace: React.FC<CursorWorkspaceProps> = ({
  isCollapsed,
  activeTab,
  onToggle,
  onTabChange,
  onCreateNewChat
}) => {
  const [content, setContent] = useState(DEFAULT);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [projects, setProjects] = useState<Array<{id: string, title: string, content: string, createdAt: string, lastModified: string}>>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('contentProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      if (parsedProjects.length > 0) {
        setCurrentProjectId(parsedProjects[0].id);
      }
    } else {
      // Create default project
      const defaultProject = {
        id: '1',
        title: 'Welcome Script',
        content: '<h1>Welcome to Content Creator</h1><p>Start writing your scripts here...</p>',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };
      setProjects([defaultProject]);
      setCurrentProjectId(defaultProject.id);
      localStorage.setItem('contentProjects', JSON.stringify([defaultProject]));
    }
  }, []);

  const handleSaveDocument = (content: string) => {
    if (!currentProjectId) return;
    
    const updatedProjects = projects.map(project => 
      project.id === currentProjectId 
        ? { ...project, content, lastModified: new Date().toISOString() }
        : project
    );
    
    setProjects(updatedProjects);
    localStorage.setItem('contentProjects', JSON.stringify(updatedProjects));
  };

  const [addToScriptFunction, setAddToScriptFunction] = useState<((content: string) => void) | null>(null);

  const handleAddToScript = (content: string) => {
    if (addToScriptFunction) {
      addToScriptFunction(content);
    }
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between h-12 px-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <span className="font-medium text-sm">Content Creator</span>
          
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
        
        {/* User Menu */}
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => setIsAuthModalOpen(true)} size="sm">
            Login
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-0' : 'w-64'}`}>
          <Sidebar
            isCollapsed={isCollapsed}
            activeTab={activeTab}
            onToggle={onToggle}
            onTabChange={onTabChange}
            onCreateNewChat={onCreateNewChat}
            projects={projects}
            currentProjectId={currentProjectId}
            onProjectSelect={setCurrentProjectId}
          />
        </div>

        {/* Document Editor and Chat */}
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Document Editor Panel */}
            <ResizablePanel defaultSize={isChatOpen ? 70 : 100} minSize={50}>
              <MergedDocumentEditor 
                onSave={handleSaveDocument} 
                onAddToScript={setAddToScriptFunction}
                content={projects.find(p => p.id === currentProjectId)?.content || ''}
                projectTitle={projects.find(p => p.id === currentProjectId)?.title || 'Untitled'}
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          // Don't force auth if user cancels
          if (!currentUser) {
            const guestUser = { name: 'Guest User', email: 'guest@example.com' };
            setCurrentUser(guestUser);
            localStorage.setItem('currentUser', JSON.stringify(guestUser));
          }
        }}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default CursorWorkspace;