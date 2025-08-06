import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navigationItems } from '@/data/mockData';
import { NavigationItem } from '@/types';
import { ChevronDown, Menu, Plus, MessageSquare, User, Settings } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onCreateNewChat: () => void;
  projects?: Array<{id: string, title: string, content: string, createdAt: string, lastModified: string}>;
  currentProjectId?: string | null;
  onProjectSelect?: (projectId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  activeTab, 
  onToggle, 
  onTabChange, 
  onCreateNewChat,
  projects = [],
  currentProjectId,
  onProjectSelect
}) => {
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isWorkflowsOpen, setIsWorkflowsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col overflow-hidden flex-shrink-0",
      isCollapsed ? "w-16 min-w-16" : "w-64 min-w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-medium text-sidebar-foreground">
                  Cursor Studio
                </h1>
                <ChevronDown className="h-4 w-4 text-sidebar-text-muted" />
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-sidebar-accent text-sidebar-text-muted hover:text-sidebar-foreground"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Create New Chat Button */}
      {!isCollapsed && (
        <div className="px-4 py-2">
          <Button
            onClick={onCreateNewChat}
            className="w-full bg-black text-white hover:bg-gray-800 justify-start"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create new chat
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto"
           style={{ scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
        {/* General Section */}
        <Collapsible open={isGeneralOpen} onOpenChange={setIsGeneralOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-left h-9 px-3 text-sidebar-text-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              {!isCollapsed && <span className="text-sm font-medium">General</span>}
              {!isCollapsed && (
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  isGeneralOpen ? "rotate-180" : ""
                )} />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {navigationItems.filter(item => ['dashboard', 'chat', 'projects'].includes(item.id)).map((item: NavigationItem) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-9 px-3 transition-colors ml-4",
                  activeTab === item.id 
                    ? "bg-sidebar-accent text-sidebar-foreground" 
                    : "text-sidebar-text-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <span className="mr-3 text-base">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </Button>
            ))}
            
            {/* Projects Subsection */}
            {activeTab === 'projects' && !isCollapsed && projects.length > 0 && (
              <div className="ml-8 mt-2 space-y-1">
                <div className="text-xs text-sidebar-text-muted font-medium px-3 py-1">Recent Projects</div>
                {projects.slice(0, 5).map((project) => (
                  <Button
                    key={project.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left h-8 px-3 transition-colors text-xs",
                      currentProjectId === project.id 
                        ? "bg-primary/20 text-primary border-l-2 border-primary" 
                        : "text-sidebar-text-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                    onClick={() => onProjectSelect?.(project.id)}
                  >
                    <span className="truncate">{project.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Workflows Section */}
        <Collapsible open={isWorkflowsOpen} onOpenChange={setIsWorkflowsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-left h-9 px-3 text-sidebar-text-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              {!isCollapsed && <span className="text-sm font-medium">Workflows</span>}
              {!isCollapsed && (
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  isWorkflowsOpen ? "rotate-180" : ""
                )} />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {navigationItems.filter(item => ['templates', 'case-studies', 'prompt-library', 'video-editing'].includes(item.id)).map((item: NavigationItem) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-9 px-3 transition-colors ml-4",
                  activeTab === item.id 
                    ? "bg-sidebar-accent text-sidebar-foreground" 
                    : "text-sidebar-text-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <span className="mr-3 text-base">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Profile Section */}
        
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* User Profile */}
        {!isCollapsed && (
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer"
               onClick={() => onTabChange('profile')}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">John Doe</div>
              <div className="text-xs text-sidebar-text-muted truncate">Pro Plan</div>
            </div>
          </div>
        )}
        
        {/* Upgrade Button */}
        {!isCollapsed ? (
          <Button 
            className="w-full bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 text-sm font-medium"
            onClick={() => onTabChange('pricing')}
          >
            Upgrade Your Plan
          </Button>
        ) : (
          <div className="flex justify-center">
            <Button 
              size="icon" 
              className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
              onClick={() => onTabChange('pricing')}
            >
              ⚡
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;