// Types for Content Creation Autopilot

import { ReactNode } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  description?: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  platform: 'YouTube' | 'TikTok' | 'Instagram' | 'Twitter';
  description: string;
  tags: string[];
  trending: boolean;
  estimatedViews: string;
}

export interface Project {
  id: string;
  title: string;
  status: 'Draft' | 'In Progress' | 'Published' | 'Scheduled';
  platform: string;
  lastModified: string;
  views?: number;
  engagement?: number;
}

export interface Template {
  id: string;
  title: string;
  type: 'Caption' | 'Script' | 'Thumbnail' | 'Hook';
  preview: string;
  category: string;
  isPremium: boolean;
}

export interface VideoClip {
  id: string;
  title: string;
  duration: string;
  platform: 'TikTok' | 'Instagram Reels' | 'YouTube Shorts';
  thumbnail: string;
  views: string;
}

export interface AnalyticsData {
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  period: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: string;
  scheduledDate: string;
  status: 'Scheduled' | 'Posted' | 'Failed';
  type: 'Video' | 'Post' | 'Story';
}