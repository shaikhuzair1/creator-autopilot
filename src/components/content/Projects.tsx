import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projects } from '@/data/mockData';
import { Folder, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const { toast } = useToast();
  
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

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleChangeStatus = (project: Project) => {
    setSelectedProject(project);
    setNewStatus(project.status);
    setIsStatusDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedProject && newStatus) {
      toast({
        title: "Status Updated",
        description: `Project "${selectedProject.title}" status changed to ${newStatus}`,
      });
      setIsStatusDialogOpen(false);
    }
  };

  const handleRemoveProject = (project: Project) => {
    toast({
      title: "Project Removed",
      description: `Project "${project.title}" has been removed`,
    });
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

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{project.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.platform}</TableCell>
                  <TableCell>{project.lastModified}</TableCell>
                  <TableCell>
                    {project.views ? project.views.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell>
                    {project.engagement ? `${project.engagement}%` : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(project)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRemoveProject(project)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

      {/* Project Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>Project details and information</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Platform</h4>
                  <p className="text-foreground">{selectedProject.platform}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Last Modified</h4>
                  <p className="text-foreground">{selectedProject.lastModified}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Views</h4>
                  <p className="text-foreground">{selectedProject.views ? selectedProject.views.toLocaleString() : 'N/A'}</p>
                </div>
              </div>
              {selectedProject.engagement && (
                <div>
                  <h4 className="font-semibold mb-2">Engagement Rate</h4>
                  <p className="text-foreground">{selectedProject.engagement}%</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button variant="default">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Project Status</DialogTitle>
            <DialogDescription>
              Update the status of "{selectedProject?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={handleUpdateStatus}>Update Status</Button>
              <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;