// Mock data for Content Creation Autopilot

import { NavigationItem, ContentIdea, Project, Template, VideoClip, AnalyticsData, ScheduledPost } from '@/types';

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard', description: 'Overview and stats' },
  { id: 'chat', label: 'Chat', icon: '💬', path: '/chat', description: 'AI-powered assistant' },
  { id: 'ideation', label: 'Content Ideation', icon: '💡', path: '/ideation', description: 'Generate content ideas' },
  { id: 'creation', label: 'Content Creation', icon: '✍️', path: '/creation', description: 'Create captions & scripts' },
  { id: 'video', label: 'Video Editing', icon: '🎥', path: '/video', description: 'Generate video clips' },
  { id: 'scheduling', label: 'Scheduling', icon: '📅', path: '/scheduling', description: 'Content calendar' },
  { id: 'analytics', label: 'Analytics', icon: '📊', path: '/analytics', description: 'Performance insights' },
  { id: 'projects', label: 'Projects', icon: '📂', path: '/projects', description: 'Manage campaigns' },
  { id: 'templates', label: 'Templates', icon: '🖼️', path: '/templates', description: 'Ready-to-use templates' },
];

export const contentIdeas: ContentIdea[] = [
  {
    id: '1',
    title: '10-Minute HIIT Workout for Busy Professionals',
    platform: 'YouTube',
    description: 'High-intensity workout that can be done anywhere, perfect for office workers',
    tags: ['fitness', 'workout', 'hiit', 'busy'],
    trending: true,
    estimatedViews: '50K-100K'
  },
  {
    id: '2',
    title: 'Morning Routine That Changed My Life',
    platform: 'TikTok',
    description: 'Quick morning habits that boost productivity and mental health',
    tags: ['morning', 'routine', 'productivity', 'wellness'],
    trending: true,
    estimatedViews: '25K-75K'
  },
  {
    id: '3',
    title: 'Healthy Meal Prep in 30 Minutes',
    platform: 'Instagram',
    description: 'Easy meal prep ideas for a full week of healthy eating',
    tags: ['mealprep', 'healthy', 'cooking', 'nutrition'],
    trending: false,
    estimatedViews: '15K-35K'
  },
  {
    id: '4',
    title: 'Side Hustle Ideas That Actually Work',
    platform: 'YouTube',
    description: 'Proven ways to make extra income in your spare time',
    tags: ['sidehustle', 'money', 'business', 'income'],
    trending: true,
    estimatedViews: '75K-150K'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Fitness Campaign - Summer 2025',
    status: 'In Progress',
    platform: 'YouTube, TikTok',
    lastModified: '2 hours ago',
    views: 45200,
    engagement: 8.5
  },
  {
    id: '2',
    title: 'Productivity Series',
    status: 'Draft',
    platform: 'Instagram',
    lastModified: '1 day ago',
    views: 12800,
    engagement: 6.2
  },
  {
    id: '3',
    title: 'Cooking Tutorial Collection',
    status: 'Published',
    platform: 'TikTok',
    lastModified: '3 days ago',
    views: 78500,
    engagement: 12.3
  },
  {
    id: '4',
    title: 'Business Tips Weekly',
    status: 'Scheduled',
    platform: 'YouTube',
    lastModified: '5 hours ago',
    views: 23400,
    engagement: 9.1
  }
];

export const templates: Template[] = [
  {
    id: '1',
    title: 'Viral Hook Template',
    type: 'Hook',
    preview: 'Did you know that 90% of people...',
    category: 'Engagement',
    isPremium: false
  },
  {
    id: '2',
    title: 'Product Review Script',
    type: 'Script',
    preview: 'Today I\'m testing [product] so you don\'t have to...',
    category: 'Reviews',
    isPremium: true
  },
  {
    id: '3',
    title: 'Fitness Motivation Caption',
    type: 'Caption',
    preview: 'Transform your body in just 30 days! 💪 Here\'s how...',
    category: 'Fitness',
    isPremium: false
  },
  {
    id: '4',
    title: 'YouTube Thumbnail - Gaming',
    type: 'Thumbnail',
    preview: 'Bold text overlay with shocked face expression',
    category: 'Gaming',
    isPremium: true
  },
  {
    id: '5',
    title: 'Tutorial Introduction',
    type: 'Script',
    preview: 'In this video, I\'ll show you exactly how to...',
    category: 'Education',
    isPremium: false
  },
  {
    id: '6',
    title: 'Call-to-Action Template',
    type: 'Caption',
    preview: 'If this helped you, smash that like button and...',
    category: 'Engagement',
    isPremium: false
  }
];

export const videoClips: VideoClip[] = [
  {
    id: '1',
    title: 'Workout Highlights',
    duration: '0:45',
    platform: 'TikTok',
    thumbnail: '🏋️‍♀️',
    views: '12.5K'
  },
  {
    id: '2',
    title: 'Recipe Quick Tips',
    duration: '0:30',
    platform: 'Instagram Reels',
    thumbnail: '👨‍🍳',
    views: '8.2K'
  },
  {
    id: '3',
    title: 'Productivity Hack',
    duration: '0:60',
    platform: 'YouTube Shorts',
    thumbnail: '⚡',
    views: '25.1K'
  },
  {
    id: '4',
    title: 'Before & After',
    duration: '0:40',
    platform: 'TikTok',
    thumbnail: '✨',
    views: '18.7K'
  }
];

export const analyticsData: AnalyticsData[] = [
  {
    metric: 'Total Views',
    value: '2.4M',
    change: '+15.3%',
    trend: 'up',
    period: 'vs last month'
  },
  {
    metric: 'Engagement Rate',
    value: '8.7%',
    change: '+2.1%',
    trend: 'up',
    period: 'vs last month'
  },
  {
    metric: 'Subscribers',
    value: '45.2K',
    change: '+8.9%',
    trend: 'up',
    period: 'vs last month'
  },
  {
    metric: 'Watch Time',
    value: '125.3h',
    change: '-3.2%',
    trend: 'down',
    period: 'vs last month'
  },
  {
    metric: 'Revenue',
    value: '$3,247',
    change: '+22.4%',
    trend: 'up',
    period: 'vs last month'
  },
  {
    metric: 'CPM',
    value: '$4.25',
    change: '0%',
    trend: 'neutral',
    period: 'vs last month'
  }
];

export const scheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'Morning Workout Routine',
    platform: 'TikTok',
    scheduledDate: 'Today, 7:00 PM',
    status: 'Scheduled',
    type: 'Video'
  },
  {
    id: '2',
    title: 'Healthy Breakfast Ideas',
    platform: 'Instagram',
    scheduledDate: 'Tomorrow, 8:00 AM',
    status: 'Scheduled',
    type: 'Post'
  },
  {
    id: '3',
    title: 'Productivity Tips Thread',
    platform: 'Twitter',
    scheduledDate: 'Jul 27, 2:00 PM',
    status: 'Scheduled',
    type: 'Post'
  },
  {
    id: '4',
    title: 'Weekend Motivation',
    platform: 'YouTube',
    scheduledDate: 'Jul 28, 10:00 AM',
    status: 'Scheduled',
    type: 'Video'
  }
];

export const dashboardStats = {
  totalProjects: 12,
  activeProjects: 4,
  totalViews: '2.4M',
  monthlyGrowth: '+15.3%',
  engagementRate: '8.7%',
  revenueThisMonth: '$3,247'
};

export const aiInsights = [
  'Short-form videos perform 25% better on TikTok during 7-9 PM',
  'Your fitness content has 3x higher engagement than other topics',
  'Adding captions increases watch time by 40% on average',
  'Tuesday and Thursday posts get the most shares',
  'Videos under 60 seconds have 85% completion rates'
];