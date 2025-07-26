import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { navigationItems } from '@/data/mockData';
import { NavigationItem } from '@/types';
import { ChevronDown, Menu, Plus, MessageSquare } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onCreateNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, activeTab, onToggle, onTabChange, onCreateNewChat }) => {
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isWorkflowsOpen, setIsWorkflowsOpen] = useState(false);
  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border transition-smooth flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-medium text-sidebar-foreground">
                  Creator Autopilot
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
      <nav className="flex-1 px-2 space-y-1">
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
            {navigationItems.filter(item => ['dashboard', 'chat', 'projects', 'case-studies'].includes(item.id)).map((item: NavigationItem) => (
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
            {navigationItems.filter(item => !['dashboard', 'chat', 'projects', 'case-studies'].includes(item.id)).map((item: NavigationItem) => (
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
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed ? (
          <Button className="w-full bg-sidebar-foreground text-sidebar-background hover:bg-sidebar-foreground/90 text-sm">
            Upgrade Your Plan
          </Button>
        ) : (
          <div className="flex justify-center">
            <Button size="icon" className="bg-sidebar-foreground text-sidebar-background hover:bg-sidebar-foreground/90">
              ⚡
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;