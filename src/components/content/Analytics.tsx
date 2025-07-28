import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { analyticsData, aiInsights } from '@/data/mockData';
import { generateAuthUrl, YouTubeAPI, InstagramAPI, tokenStorage, generateAIInsights, YouTubeAnalytics, InstagramAnalytics } from '@/lib/socialAuth';
import { TrendingUp, TrendingDown, BarChart3, Download, RefreshCw, Youtube, Instagram, Twitter, Facebook, Linkedin, Plus, CheckCircle, AlertCircle, ExternalLink, X } from 'lucide-react';

const Analytics: React.FC = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [platformData, setPlatformData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [platformInsights, setPlatformInsights] = useState<Record<string, string[]>>({});

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

  const handleConnectPlatform = async (platformId: string) => {
    if (connectedPlatforms.includes(platformId)) return;

    try {
      const redirectUri = `${window.location.origin}/auth-callback`;
      const authUrl = generateAuthUrl(platformId, redirectUri);
      
      // Open OAuth window
      const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');
      
      // Listen for auth completion
      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS' && event.data.platform === platformId) {
          const { code } = event.data;
          
          // Exchange code for access token (would need backend endpoint)
          // For demo, we'll simulate with localStorage
          const mockToken = `${platformId}_token_${Date.now()}`;
          tokenStorage.store(platformId, { access_token: mockToken, expires_in: 3600 });
          
          setConnectedPlatforms(prev => [...prev, platformId]);
          await fetchPlatformData(platformId, mockToken);
          setIsConnectDialogOpen(false);
          
          window.removeEventListener('message', handleMessage);
          authWindow?.close();
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // For demo purposes, simulate immediate connection
      setTimeout(() => {
        const mockToken = `${platformId}_token_${Date.now()}`;
        tokenStorage.store(platformId, { access_token: mockToken, expires_in: 3600 });
        setConnectedPlatforms(prev => [...prev, platformId]);
        fetchPlatformData(platformId, mockToken);
        setIsConnectDialogOpen(false);
        window.removeEventListener('message', handleMessage);
        authWindow?.close();
      }, 2000);
      
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const fetchPlatformData = async (platformId: string, accessToken: string) => {
    setIsLoading(prev => ({ ...prev, [platformId]: true }));
    
    try {
      let data;
      
      if (platformId === 'youtube') {
        // For demo, use mock data that simulates real API structure
        data = {
          channelId: 'UC123456789',
          subscriberCount: 12500,
          viewCount: 2300000,
          videoCount: 89,
          estimatedMinutesWatched: 45678,
          averageViewDuration: 245,
          topVideos: [
            { id: '1', title: 'Best Gaming Setup 2024', views: 45000, likes: 1200, publishedAt: '2024-01-15' },
            { id: '2', title: 'Tech Review: Latest GPU', views: 38000, likes: 950, publishedAt: '2024-01-10' }
          ]
        };
      } else if (platformId === 'instagram') {
        data = {
          accountId: 'ig123456789',
          followerCount: 8900,
          followingCount: 456,
          mediaCount: 234,
          impressions: 125000,
          reach: 89000,
          profileViews: 5670,
          topPosts: [
            { id: '1', caption: 'Beautiful sunset today!', likes: 245, comments: 23, timestamp: '2024-01-15', media_type: 'IMAGE' },
            { id: '2', caption: 'Workout motivation 💪', likes: 189, comments: 15, timestamp: '2024-01-14', media_type: 'VIDEO' }
          ]
        };
      }
      
      setPlatformData(prev => ({ ...prev, [platformId]: data }));
      
      // Generate AI insights
      const insights = generateAIInsights(platformId, data);
      setPlatformInsights(prev => ({ ...prev, [platformId]: insights }));
      
    } catch (error) {
      console.error(`Failed to fetch ${platformId} data:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const disconnectPlatform = (platformId: string) => {
    setConnectedPlatforms(prev => prev.filter(id => id !== platformId));
    setPlatformData(prev => {
      const newData = { ...prev };
      delete newData[platformId];
      return newData;
    });
    setPlatformInsights(prev => {
      const newInsights = { ...prev };
      delete newInsights[platformId];
      return newInsights;
    });
    tokenStorage.remove(platformId);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRealTimeAnalytics = (platformId: string) => {
    const data = platformData[platformId];
    if (!data) return null;

    if (platformId === 'youtube') {
      const ytData = data as YouTubeAnalytics;
      return {
        subscribers: formatNumber(ytData.subscriberCount),
        views: formatNumber(ytData.viewCount),
        videos: formatNumber(ytData.videoCount),
        watchTime: `${formatNumber(Math.floor(ytData.estimatedMinutesWatched / 60))} hours`,
        avgDuration: `${Math.floor(ytData.averageViewDuration / 60)}:${(ytData.averageViewDuration % 60).toString().padStart(2, '0')}`,
        trend: 'up'
      };
    }

    if (platformId === 'instagram') {
      const igData = data as InstagramAnalytics;
      return {
        followers: formatNumber(igData.followerCount),
        following: formatNumber(igData.followingCount),
        posts: formatNumber(igData.mediaCount),
        reach: formatNumber(igData.reach),
        impressions: formatNumber(igData.impressions),
        profileViews: formatNumber(igData.profileViews),
        trend: 'up'
      };
    }

    return null;
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
                            disabled={isLoading[platform.id]}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {isLoading[platform.id] ? 'Connecting...' : 'Connect'}
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
              const analytics = getRealTimeAnalytics(platformId);
              const Icon = platform?.icon || BarChart3;
              
              if (!analytics || isLoading[platformId]) {
                return (
                  <Card key={platformId} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon className={`h-5 w-5 mr-2 ${platform?.color}`} />
                        {platform?.name} Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Loading analytics...</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <Card key={platformId} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 mr-2 ${platform?.color}`} />
                        {platform?.name} Analytics
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => disconnectPlatform(platformId)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>Real-time performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analytics).filter(([key]) => key !== 'trend').map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-lg font-bold text-primary">{value}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Top Content */}
                    {platformData[platformId] && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Top {platformId === 'youtube' ? 'Videos' : 'Posts'}</h4>
                        <div className="space-y-2">
                          {(platformId === 'youtube' 
                            ? (platformData[platformId] as YouTubeAnalytics).topVideos 
                            : (platformData[platformId] as InstagramAnalytics).topPosts
                          ).slice(0, 2).map((item: any, index: number) => (
                            <div key={index} className="p-2 bg-background rounded border text-sm">
                              <div className="font-medium truncate">
                                {platformId === 'youtube' ? item.title : (item.caption || 'No caption')}
                              </div>
                              <div className="text-muted-foreground">
                                {platformId === 'youtube' 
                                  ? `${formatNumber(item.views)} views, ${formatNumber(item.likes)} likes`
                                  : `${formatNumber(item.likes)} likes, ${formatNumber(item.comments)} comments`
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Insights for Connected Platforms */}
          {connectedPlatforms.map((platformId) => {
            const platform = socialPlatforms.find(p => p.id === platformId);
            const insights = platformInsights[platformId] || [];
            const Icon = platform?.icon || BarChart3;
            
            if (insights.length === 0 || isLoading[platformId]) return null;

            return (
              <Card key={`insights-${platformId}`} className="shadow-soft border-accent/20 bg-gradient-to-r from-accent/5 to-accent-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent">
                    <Icon className={`h-5 w-5 mr-2 ${platform?.color}`} />
                    AI Insights for {platform?.name}
                  </CardTitle>
                  <CardDescription>Data-driven recommendations based on your actual performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border shadow-soft">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-glow-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{insight}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        AI Generated
                      </Badge>
                    </div>
                  ))}
                  
                  {/* Performance Trends */}
                  <div className="mt-6">
                    <h4 className="font-medium text-foreground mb-3">Performance Trends</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Growing Metric</span>
                        </div>
                        <p className="text-xs text-green-700">
                          {platformId === 'youtube' ? 'Subscriber growth +12% this month' : 'Follower engagement +8% this week'}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Opportunity</span>
                        </div>
                        <p className="text-xs text-blue-700">
                          {platformId === 'youtube' ? 'Video consistency can improve by 23%' : 'Story usage can boost reach by 35%'}
                        </p>
                      </div>
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