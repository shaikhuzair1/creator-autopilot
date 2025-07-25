import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { analyticsData, aiInsights } from '@/data/mockData';
import { TrendingUp, TrendingDown, BarChart3, Download, RefreshCw } from 'lucide-react';

const Analytics: React.FC = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header Actions */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <BarChart3 className="mr-2 h-5 w-5" />
            Performance Analytics
          </CardTitle>
          <CardDescription>
            Track your content performance and get AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsData.map((metric, index) => (
          <Card key={index} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">{metric.value}</div>
                <div className={`flex items-center text-sm ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                  <span className="ml-1">{metric.change}</span>
                  <span className="ml-1 text-muted-foreground">{metric.period}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>📈 Views Over Time</CardTitle>
            <CardDescription>Your content performance trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg flex items-center justify-center border border-primary/20">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive chart would appear here</p>
                <p className="text-sm text-muted-foreground">Showing growth trends and patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>🎯 Platform Performance</CardTitle>
            <CardDescription>Breakdown by social media platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📱</span>
                  <span className="font-medium">TikTok</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">1.2M views</div>
                  <div className="text-sm text-success">+18.5%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📷</span>
                  <span className="font-medium">Instagram</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">856K views</div>
                  <div className="text-sm text-success">+12.3%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎬</span>
                  <span className="font-medium">YouTube</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">342K views</div>
                  <div className="text-sm text-destructive">-2.1%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="shadow-soft border-accent/20 bg-gradient-to-r from-accent/5 to-accent-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center text-accent">
            🤖 AI Performance Insights
          </CardTitle>
          <CardDescription>Data-driven recommendations to improve your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border shadow-soft">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-glow-pulse"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{insight}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {index < 2 ? 'High Impact' : index < 4 ? 'Medium Impact' : 'Low Impact'}
              </Badge>
            </div>
          ))}
          <Button variant="accent" className="w-full mt-4">
            Get Detailed Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>🏆 Top Performing Content</CardTitle>
          <CardDescription>Your most successful posts this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "10-Minute HIIT Workout", platform: "TikTok", views: "245K", engagement: "12.5%" },
              { title: "Healthy Breakfast Ideas", platform: "Instagram", views: "189K", engagement: "9.8%" },
              { title: "Productivity Morning Routine", platform: "YouTube", views: "156K", engagement: "8.7%" }
            ].map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{content.title}</div>
                    <div className="text-sm text-muted-foreground">{content.platform}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{content.views}</div>
                  <div className="text-sm text-muted-foreground">{content.engagement} engagement</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;