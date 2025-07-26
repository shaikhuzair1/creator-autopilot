import { CaseStudy } from '@/types/caseStudy';

export const caseStudies: CaseStudy[] = [
  {
    id: 'fitness-hiit-success',
    title: '10-Minute HIIT Videos Drive 2M Views',
    niche: 'Fitness',
    category: 'Short-form Content',
    description: 'How a fitness creator grew from 10K to 500K followers using 10-minute HIIT workout videos',
    metrics: {
      views: '2.1M',
      engagement: '12.3%',
      revenue: '$15,000/month',
      growth: '+4900%'
    },
    content: {
      overview: 'A fitness instructor leveraged short-form HIIT content to build a massive following and monetize through affiliate marketing and digital products.',
      strategy: 'Focus on quick, equipment-free workouts that busy professionals could do anywhere. Consistent posting schedule of 3x per week.',
      execution: 'Created bite-sized 10-minute workout videos with clear instructions, upbeat music, and progress tracking. Used trending hashtags and collaborated with other fitness creators.',
      results: 'Grew from 10K to 500K followers in 8 months. Generated $15K monthly revenue through affiliate partnerships with fitness brands and selling workout programs.',
      keyTakeaways: [
        'Consistency is key - posted 3x per week without fail',
        'Equipment-free workouts appeal to broader audience',
        'Engagement rates 3x higher than industry average',
        'Affiliate partnerships more profitable than sponsorships initially'
      ]
    },
    platform: 'TikTok, Instagram',
    createdAt: '2024-12-15',
    tags: ['hiit', 'fitness', 'short-form', 'affiliate-marketing']
  },
  {
    id: 'cooking-recipe-viral',
    title: 'Quick Recipe Videos Generate 5M+ Views',
    niche: 'Food & Cooking',
    category: 'Educational Content',
    description: 'How a home cook turned simple recipe videos into a viral sensation with massive engagement',
    metrics: {
      views: '5.2M',
      engagement: '15.7%',
      revenue: '$8,500/month',
      growth: '+2300%'
    },
    content: {
      overview: 'A home cooking enthusiast created simple, quick recipe videos that resonated with busy families and young professionals.',
      strategy: 'Focus on 30-second recipe videos with simple ingredients that anyone could make. Emphasis on visual appeal and quick cuts.',
      execution: 'Shot overhead cooking videos with quick transitions, trending audio, and simple text overlays. Posted daily during peak dinner planning hours.',
      results: 'Videos consistently hit 100K+ views, with several breaking 1M views. Built audience of 300K followers and monetized through cookbook sales and brand partnerships.',
      keyTakeaways: [
        'Overhead shots perform better than traditional cooking show angles',
        'Simple ingredients appeal to wider audience',
        'Timing posts around meal planning hours crucial',
        'Text overlays increase accessibility and engagement'
      ]
    },
    platform: 'TikTok, YouTube Shorts',
    createdAt: '2024-11-20',
    tags: ['cooking', 'recipes', 'quick-meals', 'viral-content']
  },
  {
    id: 'productivity-tips-growth',
    title: 'Productivity Tips Channel Reaches 1M Subscribers',
    niche: 'Productivity',
    category: 'Educational Content',
    description: 'A productivity expert built a million-subscriber YouTube channel through actionable tips and systems',
    metrics: {
      views: '15.3M',
      engagement: '8.9%',
      revenue: '$25,000/month',
      growth: '+1200%'
    },
    content: {
      overview: 'A productivity consultant transitioned from 1-on-1 coaching to creating educational content that scaled to millions of viewers.',
      strategy: 'Create comprehensive productivity systems that viewers could implement immediately. Mix of long-form and short-form content.',
      execution: 'Weekly deep-dive videos on productivity systems, daily shorts with quick tips, and live Q&A sessions. Consistent branding and thumbnail style.',
      results: 'Reached 1M subscribers in 18 months. Revenue streams include course sales, affiliate marketing, and high-ticket coaching programs.',
      keyTakeaways: [
        'Educational content has longer lifespan than entertainment',
        'Consistency in branding builds trust and recognition',
        'Mix of content lengths captures different audience segments',
        'Community engagement drives loyalty and word-of-mouth growth'
      ]
    },
    platform: 'YouTube, LinkedIn',
    createdAt: '2024-10-10',
    tags: ['productivity', 'education', 'long-form', 'systems']
  },
  {
    id: 'business-tips-linkedin',
    title: 'LinkedIn Business Tips Generate 500K+ Impressions',
    niche: 'Business',
    category: 'Professional Content',
    description: 'B2B consultant leverages LinkedIn to build authority and generate high-value leads',
    metrics: {
      views: '500K+',
      engagement: '6.2%',
      revenue: '$50,000/month',
      growth: '+800%'
    },
    content: {
      overview: 'A business consultant used LinkedIn content to establish thought leadership and attract enterprise clients.',
      strategy: 'Share actionable business insights, case studies, and industry trends. Focus on professional tone with personal storytelling.',
      execution: 'Daily posts mixing carousel content, text posts, and video content. Engaged actively in comments and shared behind-the-scenes content.',
      results: 'Generated over 500K impressions monthly, leading to $50K+ in consulting revenue. Built network of 50K+ followers including C-suite executives.',
      keyTakeaways: [
        'Professional platforms require different content strategy',
        'Authority content attracts higher-value clients',
        'Engagement in comments as important as post content',
        'Consistency builds professional credibility over time'
      ]
    },
    platform: 'LinkedIn',
    createdAt: '2024-09-05',
    tags: ['business', 'b2b', 'consulting', 'linkedin']
  },
  {
    id: 'tech-reviews-youtube',
    title: 'Tech Review Channel Monetizes Through Multiple Streams',
    niche: 'Technology',
    category: 'Review Content',
    description: 'Tech enthusiast builds profitable review channel with diverse revenue streams',
    metrics: {
      views: '8.7M',
      engagement: '11.4%',
      revenue: '$35,000/month',
      growth: '+1500%'
    },
    content: {
      overview: 'A tech enthusiast turned passion for gadgets into a profitable YouTube channel through honest reviews and buyer guides.',
      strategy: 'Focus on honest, detailed reviews of consumer tech products. Build trust through transparency about sponsorships and affiliate links.',
      execution: 'Weekly in-depth reviews, quick comparison videos, and seasonal buyer guides. High production value with professional lighting and audio.',
      results: 'Built audience of 450K subscribers with high engagement. Multiple revenue streams including sponsorships, affiliate marketing, and product placement.',
      keyTakeaways: [
        'Transparency builds long-term audience trust',
        'Seasonal content (gift guides) drives significant traffic',
        'High production value justifies premium sponsorship rates',
        'Diversified revenue reduces dependency on single income source'
      ]
    },
    platform: 'YouTube',
    createdAt: '2024-08-15',
    tags: ['tech', 'reviews', 'gadgets', 'monetization']
  }
];

export const niches = ['All', 'Fitness', 'Food & Cooking', 'Productivity', 'Business', 'Technology'];
export const categories = ['All', 'Short-form Content', 'Educational Content', 'Professional Content', 'Review Content'];