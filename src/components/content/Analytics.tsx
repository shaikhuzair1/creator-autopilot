import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { analyticsData, aiInsights } from '@/data/mockData';
import { TrendingUp, TrendingDown, BarChart3, Download, RefreshCw, Youtube, Instagram, Twitter, Facebook, Linkedin, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const Analytics: React.FC = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>(['youtube', 'instagram']);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);

  const socialPlatforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-blue-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  ];

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

  const handleConnectPlatform = (platformId: string) => {
    if (!connectedPlatforms.includes(platformId)) {
      setConnectedPlatforms([...connectedPlatforms, platformId]);
    }
    setIsConnectDialogOpen(false);
  };

  const getDetailedAnalytics = (platformId: string) => {
    const baseData = {
      youtube: {
        subscribers: '125K',
        views: '2.3M',
        watchTime: '12.5K hours',
        engagement: '8.7%',
        trend: 'up',
        suggestions: [
          'Your gaming content performs 40% better than average. Consider uploading more frequently.',
          'Thumbnails with bright colors get 23% more clicks on your channel.',
          'Your audience is most active on weekends between 2-6 PM.'
        ],
        competitors: [
          { name: 'GameMaster Pro', subscribers: '890K', avgViews: '45K' },
          { name: 'TechReviewer', subscribers: '650K', avgViews: '35K' }
        ]
      },
      instagram: {
        followers: '89K',
        reach: '1.2M',
        interactions: '156K',
        engagement: '12.3%',
        trend: 'up',
        suggestions: [
          'Stories with polls get 67% more engagement. Use them more often.',
          'Your fitness content has the highest save rate. Create more workout guides.',
          'Posting at 7 PM on weekdays gives you 15% better reach.'
        ],
        competitors: [
          { name: 'FitnessInfluencer', followers: '456K', avgLikes: '12K' },
          { name: 'WellnessCoach', followers: '234K', avgLikes: '8K' }
        ]
      }
    };
    return baseData[platformId as keyof typeof baseData];
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header Actions */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <BarChart3 className="mr-2 h-5 w-5" />
            Social Media Analytics
          </CardTitle>
          <CardDescription>
            Track your content performance across platforms and get AI-powered insights
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
            <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Platform
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Social Media Platform</DialogTitle>
                  <DialogDescription>
                    Connect your social media accounts to get detailed analytics and AI insights.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    const isConnected = connectedPlatforms.includes(platform.id);
                    return (
                      <div
                        key={platform.id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          isConnected ? 'border-green-200 bg-green-50' : 'border-border hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${platform.color}`} />
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        {isConnected ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleConnectPlatform(platform.id)}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Connected Platforms Analytics */}
      {connectedPlatforms.length > 0 ? (
        <>
          {/* Overview Metrics */}
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

          {/* Platform-Specific Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedPlatforms.map((platformId) => {
              const platform = socialPlatforms.find(p => p.id === platformId);
              const analytics = getDetailedAnalytics(platformId);
              const Icon = platform?.icon || BarChart3;
              
              if (!analytics) return null;

              return (
                <Card key={platformId} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon className={`h-5 w-5 mr-2 ${platform?.color}`} />
                      {platform?.name} Analytics
                    </CardTitle>
                    <CardDescription>Detailed performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analytics).filter(([key]) => !['trend', 'suggestions', 'competitors'].includes(key)).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground capitalize">{key}</div>
                          <div className="text-lg font-bold text-primary">{value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Insights for Connected Platforms */}
          {connectedPlatforms.map((platformId) => {
            const platform = socialPlatforms.find(p => p.id === platformId);
            const analytics = getDetailedAnalytics(platformId);
            const Icon = platform?.icon || BarChart3;
            
            if (!analytics) return null;

            return (
              <Card key={`insights-${platformId}`} className="shadow-soft border-accent/20 bg-gradient-to-r from-accent/5 to-accent-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent">
                    <Icon className={`h-5 w-5 mr-2 ${platform?.color}`} />
                    AI Insights for {platform?.name}
                  </CardTitle>
                  <CardDescription>Data-driven recommendations to improve your {platform?.name} performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.suggestions.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border shadow-soft">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-glow-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{insight}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        High Impact
                      </Badge>
                    </div>
                  ))}
                  
                  {/* Competitor Analysis */}
                  <div className="mt-6">
                    <h4 className="font-medium text-foreground mb-3">Competitor Analysis</h4>
                    <div className="space-y-2">
                      {analytics.competitors.map((competitor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                          <div className="font-medium">{competitor.name}</div>
                           <div className="text-sm text-muted-foreground">
                             {Object.entries(competitor).filter(([key]) => key !== 'name').map(([key, value]) => (
                               <span key={key} className="ml-2">{String(value)} {key}</span>
                             ))}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Market Trends */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Market Trends
              </CardTitle>
              <CardDescription>Current trends in your niche</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Rising Trend</span>
                  </div>
                  <p className="text-sm text-green-700">Short-form educational content is gaining 45% more engagement across all platforms</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Stable Trend</span>
                  </div>
                  <p className="text-sm text-blue-700">Behind-the-scenes content maintains consistent high engagement rates</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Opportunity</span>
                  </div>
                  <p className="text-sm text-yellow-700">Your niche has 23% less competition on LinkedIn - consider expanding there</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* No Connected Platforms State */
        <Card className="shadow-soft text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Connect Your Social Media</h3>
                <p className="text-muted-foreground mb-6">
                  Connect your social media accounts to get detailed analytics, AI insights, and competitor analysis.
                </p>
                <Button onClick={() => setIsConnectDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Your First Platform
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Analytics;