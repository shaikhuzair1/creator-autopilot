import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, projects, aiInsights } from '@/data/mockData';
import { TrendingUp, TrendingDown, Play, Eye, Heart, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-primary-foreground shadow-elevated">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Creator! 👋</h2>
        <p className="text-primary-foreground/80 mb-4">Ready to create amazing content today?</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="lg" className="shadow-soft hover:shadow-elevated">
            <Play className="mr-2 h-4 w-4" />
            Quick Create
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Eye className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalViews}</div>
            <div className="flex items-center text-sm text-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              {dashboardStats.monthlyGrowth}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.engagementRate}</div>
            <div className="flex items-center text-sm text-success">
              <Heart className="mr-1 h-3 w-3" />
              Above average
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.activeProjects}</div>
            <div className="text-sm text-muted-foreground">
              of {dashboardStats.totalProjects} total
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.revenueThisMonth}</div>
            <div className="flex items-center text-sm text-success">
              <DollarSign className="mr-1 h-3 w-3" />
              +22.4%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">📂</span>
              Recent Projects
            </CardTitle>
            <CardDescription>Your latest content campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex-1">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">{project.platform} • {project.lastModified}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Published' ? 'bg-success/10 text-success' :
                    project.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                    project.status === 'Scheduled' ? 'bg-accent/10 text-accent' :
                    'bg-muted-foreground/10 text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-3">View All Projects</Button>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🤖</span>
              AI Insights
            </CardTitle>
            <CardDescription>Data-driven recommendations for your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.slice(0, 4).map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-lg border border-primary/10">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-glow-pulse"></div>
                <p className="text-sm text-foreground flex-1">{insight}</p>
              </div>
            ))}
            <Button variant="gradient" className="w-full mt-3">
              Get More Insights
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;