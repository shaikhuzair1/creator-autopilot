import React from 'react';
import { navigationItems } from '@/data/mockData';

interface ContentHeaderProps {
  activeTab: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ activeTab }) => {
  const currentTab = navigationItems.find(item => item.id === activeTab);
  
  return (
    <div className="bg-gradient-to-r from-background to-muted border-b border-border p-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="text-3xl animate-float">
          {currentTab?.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {currentTab?.label || 'Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentTab?.description || 'Welcome to your content creation hub'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;