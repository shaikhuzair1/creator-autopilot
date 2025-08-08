import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentHeader from '@/components/ContentHeader';
import ProjectsContent from '@/components/content/Projects';
import { useSidebar } from '@/hooks/use-sidebar';

const Projects = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <div className="flex h-screen bg-background w-full overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar
          isCollapsed={isCollapsed}
          activeTab="projects"
          onToggle={toggleCollapse}
          onTabChange={() => {}}
          onCreateNewChat={() => {}}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <ContentHeader activeTab="projects" />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20">
          <ProjectsContent />
        </main>
      </div>
    </div>
  );
};

export default Projects;