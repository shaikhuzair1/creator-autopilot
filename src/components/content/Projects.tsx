import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/mockData';
import { Folder, Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', 'Draft', 'In Progress', 'Published', 'Scheduled'];

  const filteredProjects = projects.filter(project => 
    filter === 'All' || project.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-success/10 text-success border-success/20';
      case 'In Progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'Scheduled': return 'bg-accent/10 text-accent border-accent/20';
      case 'Draft': return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
      default: return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Folder className="mr-2 h-5 w-5" />
            Content Projects
          </CardTitle>
          <CardDescription>
            Organize and manage your content campaigns and projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" size="lg">
              <Folder className="mr-2 h-4 w-4" />
              Import Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption)}
            className="transition-all duration-200"
          >
            {filterOption}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Platform:</strong> {project.platform}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Last modified:</strong> {project.lastModified}
                </div>
              </div>

              {(project.views || project.engagement) && (
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                  {project.views && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{project.views.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                  )}
                  {project.engagement && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{project.engagement}%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="default" size="sm" className="flex-1">
                  <Edit className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-3 w-3" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Templates */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>🚀 Project Templates</CardTitle>
          <CardDescription>Start with pre-built campaign templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Fitness Challenge", description: "30-day fitness content series", icon: "💪" },
              { name: "Product Launch", description: "Complete launch campaign", icon: "🚀" },
              { name: "Educational Series", description: "Multi-part tutorial series", icon: "📚" }
            ].map((template, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{template.icon}</div>
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collaboration */}
      <Card className="shadow-soft bg-gradient-to-r from-accent/5 to-accent-secondary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-accent">👥 Team Collaboration</CardTitle>
          <CardDescription>Invite team members to collaborate on projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Share projects with your team and work together in real-time.</p>
              <p className="text-xs text-muted-foreground mt-1">Available in Pro and Enterprise plans</p>
            </div>
            <Button variant="accent">
              Invite Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;