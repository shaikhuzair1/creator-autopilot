export interface CaseStudy {
  id: string;
  title: string;
  niche: string;
  category: string;
  description: string;
  metrics: {
    views: string;
    engagement: string;
    revenue?: string;
    growth: string;
  };
  content: {
    overview: string;
    strategy: string;
    execution: string;
    results: string;
    keyTakeaways: string[];
  };
  platform: string;
  createdAt: string;
  tags: string[];
}

export interface CaseStudyFilters {
  search: string;
  niche: string;
  category: string;
}