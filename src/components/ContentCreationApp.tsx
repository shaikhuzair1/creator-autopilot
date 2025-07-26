import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentHeader from './ContentHeader';
import Dashboard from './content/Dashboard';
import ContentIdeation from './content/ContentIdeation';
import ContentCreation from './content/ContentCreation';
import VideoEditing from './content/VideoEditing';
import Scheduling from './content/Scheduling';
import Analytics from './content/Analytics';
import Projects from './content/Projects';
import Templates from './content/Templates';
import Chat from './content/Chat';
import CaseStudies from './content/CaseStudies';
import CaseStudyDetail from './content/CaseStudyDetail';
import { CaseStudy } from '@/types/caseStudy';

const ContentCreationApp: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    if (activeTab === 'case-studies' && selectedCaseStudy) {
      return (
        <CaseStudyDetail 
          caseStudy={selectedCaseStudy} 
          onBack={() => setSelectedCaseStudy(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <Chat />;
      case 'ideation':
        return <ContentIdeation />;
      case 'creation':
        return <ContentCreation />;
      case 'video':
        return <VideoEditing />;
      case 'scheduling':
        return <Scheduling />;
      case 'analytics':
        return <Analytics />;
      case 'projects':
        return <Projects />;
      case 'templates':
        return <Templates />;
      case 'case-studies':
        return <CaseStudies onSelectCaseStudy={setSelectedCaseStudy} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        activeTab={activeTab}
        onToggle={handleToggle}
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ContentHeader activeTab={activeTab} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ContentCreationApp;