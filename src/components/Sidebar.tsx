import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { navigationItems } from '@/data/mockData';
import { NavigationItem } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, activeTab, onToggle, onTabChange }) => {
  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col shadow-soft",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Creator Autopilot
              </h1>
              <p className="text-xs text-muted-foreground">Content creation made easy</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-sidebar-accent transition-colors ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item: NavigationItem) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left transition-all duration-200 group",
              isCollapsed ? "px-2" : "px-3",
              activeTab === item.id 
                ? "bg-primary text-primary-foreground shadow-soft" 
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            {!isCollapsed && (
              <div className="flex-1 animate-slide-in">
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                )}
              </div>
            )}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="animate-fade-in">
            <div className="bg-sidebar-accent rounded-lg p-3 text-center border border-sidebar-border">
              <div className="text-sm font-semibold text-sidebar-foreground mb-1">Upgrade Your Plan</div>
              <div className="text-xs text-muted-foreground mb-2">Unlock unlimited features</div>
              <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">⭐</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;