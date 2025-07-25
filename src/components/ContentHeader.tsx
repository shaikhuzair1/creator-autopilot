import React from 'react';
import { Button } from '@/components/ui/button';
import { navigationItems } from '@/data/mockData';
import { ChevronDown, Plus } from 'lucide-react';

interface ContentHeaderProps {
  activeTab: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ activeTab }) => {
  const currentTab = navigationItems.find(item => item.id === activeTab);

  if (activeTab === 'chat') {
    return (
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Chats</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium text-foreground">2025-07-25 Untitled</span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-blue-600 font-medium">
              0/2,000 Words Used (0%)
            </div>
            <div className="text-sm text-muted-foreground">•••</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">GPT-3.5</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Active tab info */}
        <div className="flex items-center space-x-3">
          <div className="text-xl">{currentTab?.icon}</div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {currentTab?.label || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;