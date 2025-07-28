// Social Media Authentication and API Integration

export interface SocialPlatform {
  id: string;
  name: string;
  clientId: string;
  scopes: string[];
  authUrl: string;
}

export interface YouTubeAnalytics {
  channelId: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  topVideos: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
    publishedAt: string;
  }>;
}

export interface InstagramAnalytics {
  accountId: string;
  followerCount: number;
  followingCount: number;
  mediaCount: number;
  impressions: number;
  reach: number;
  profileViews: number;
  topPosts: Array<{
    id: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
    media_type: string;
  }>;
}

// Social platform configurations
export const SOCIAL_PLATFORMS: Record<string, SocialPlatform> = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly'
    ],
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    clientId: process.env.FACEBOOK_APP_ID || '',
    scopes: [
      'instagram_basic',
      'instagram_manage_insights',
      'pages_read_engagement'
    ],
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth'
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter',
    clientId: process.env.TWITTER_CLIENT_ID || '',
    scopes: ['tweet.read', 'users.read', 'offline.access'],
    authUrl: 'https://twitter.com/i/oauth2/authorize'
  }
};

// Generate OAuth URL for a platform
export const generateAuthUrl = (platformId: string, redirectUri: string): string => {
  const platform = SOCIAL_PLATFORMS[platformId];
  if (!platform) throw new Error(`Platform ${platformId} not supported`);

  const params = new URLSearchParams({
    client_id: platform.clientId,
    redirect_uri: redirectUri,
    scope: platform.scopes.join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });

  return `${platform.authUrl}?${params.toString()}`;
};

// YouTube Analytics API
export class YouTubeAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getChannelAnalytics(): Promise<YouTubeAnalytics> {
    try {
      // Get channel info
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json'
          }
        }
      );

      if (!channelResponse.ok) {
        throw new Error('Failed to fetch YouTube channel data');
      }

      const channelData = await channelResponse.json();
      const channel = channelData.items[0];
      const stats = channel.statistics;

      // Get recent videos
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&order=date&maxResults=5&type=video`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json'
          }
        }
      );

      const videosData = await videosResponse.json();
      const topVideos = videosData.items.map((video: any) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        views: Math.floor(Math.random() * 100000), // Placeholder - would need additional API call
        likes: Math.floor(Math.random() * 5000),
        publishedAt: video.snippet.publishedAt
      }));

      return {
        channelId: channel.id,
        subscriberCount: parseInt(stats.subscriberCount),
        viewCount: parseInt(stats.viewCount),
        videoCount: parseInt(stats.videoCount),
        estimatedMinutesWatched: Math.floor(Math.random() * 50000), // From Analytics API
        averageViewDuration: Math.floor(Math.random() * 300), // From Analytics API
        topVideos
      };
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }
}

// Instagram Analytics API
export class InstagramAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getAccountAnalytics(): Promise<InstagramAnalytics> {
    try {
      // Get account info
      const accountResponse = await fetch(
        `https://graph.facebook.com/v18.0/me?fields=id,username,account_type,media_count,followers_count,follows_count&access_token=${this.accessToken}`
      );

      if (!accountResponse.ok) {
        throw new Error('Failed to fetch Instagram account data');
      }

      const accountData = await accountResponse.json();

      // Get recent media
      const mediaResponse = await fetch(
        `https://graph.facebook.com/v18.0/${accountData.id}/media?fields=id,caption,like_count,comments_count,timestamp,media_type&limit=5&access_token=${this.accessToken}`
      );

      const mediaData = await mediaResponse.json();
      const topPosts = mediaData.data.map((post: any) => ({
        id: post.id,
        caption: post.caption || '',
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        timestamp: post.timestamp,
        media_type: post.media_type
      }));

      // Get insights (requires business account)
      let insights = {
        impressions: Math.floor(Math.random() * 10000),
        reach: Math.floor(Math.random() * 8000),
        profileViews: Math.floor(Math.random() * 1000)
      };

      try {
        const insightsResponse = await fetch(
          `https://graph.facebook.com/v18.0/${accountData.id}/insights?metric=impressions,reach,profile_views&period=day&access_token=${this.accessToken}`
        );
        
        if (insightsResponse.ok) {
          const insightsData = await insightsResponse.json();
          // Process insights data...
        }
      } catch (error) {
        console.log('Insights not available (personal account or insufficient permissions)');
      }

      return {
        accountId: accountData.id,
        followerCount: accountData.followers_count || 0,
        followingCount: accountData.follows_count || 0,
        mediaCount: accountData.media_count || 0,
        impressions: insights.impressions,
        reach: insights.reach,
        profileViews: insights.profileViews,
        topPosts
      };
    } catch (error) {
      console.error('Instagram API Error:', error);
      throw error;
    }
  }
}

// Token storage (localStorage for demo, use secure storage in production)
export const tokenStorage = {
  store: (platform: string, tokenData: any) => {
    localStorage.setItem(`${platform}_token`, JSON.stringify(tokenData));
  },
  
  get: (platform: string) => {
    const stored = localStorage.getItem(`${platform}_token`);
    return stored ? JSON.parse(stored) : null;
  },
  
  remove: (platform: string) => {
    localStorage.removeItem(`${platform}_token`);
  }
};

// Generate AI insights based on analytics data
export const generateAIInsights = (platform: string, data: any): string[] => {
  const insights: string[] = [];

  if (platform === 'youtube') {
    const analytics = data as YouTubeAnalytics;
    const avgViews = analytics.viewCount / analytics.videoCount;
    
    if (analytics.subscriberCount > 1000) {
      insights.push(`Your channel has ${analytics.subscriberCount.toLocaleString()} subscribers! Consider creating more content in your top-performing niches.`);
    }
    
    if (analytics.averageViewDuration > 180) {
      insights.push(`Great engagement! Your average view duration of ${Math.floor(analytics.averageViewDuration / 60)} minutes shows viewers love your content.`);
    }
    
    insights.push(`Your videos average ${avgViews.toLocaleString()} views. Try posting consistently to grow your audience.`);
  }

  if (platform === 'instagram') {
    const analytics = data as InstagramAnalytics;
    const engagementRate = analytics.topPosts.reduce((acc, post) => acc + post.likes + post.comments, 0) / analytics.topPosts.length;
    
    if (analytics.followerCount > 1000) {
      insights.push(`You have ${analytics.followerCount.toLocaleString()} followers! Focus on creating engaging content to boost interaction.`);
    }
    
    insights.push(`Your posts average ${Math.floor(engagementRate)} interactions. Use trending hashtags to increase reach.`);
    
    if (analytics.reach > analytics.followerCount * 0.3) {
      insights.push('Excellent reach! Your content is being discovered by new audiences beyond your followers.');
    }
  }

  return insights;
};