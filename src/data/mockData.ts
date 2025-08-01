// Mock data for Content Creation Autopilot

import { NavigationItem, ContentIdea, Project, Template, VideoClip, AnalyticsData, ScheduledPost } from '@/types';

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard', description: 'Overview and stats' },
  { id: 'creation', label: 'Script Editor', icon: '📝', path: '/creation', description: 'Write & edit scripts with AI' },
  { id: 'chat', label: 'AI Assistant', icon: '🤖', path: '/chat', description: 'AI-powered assistant' },
  { id: 'projects', label: 'Projects', icon: '📂', path: '/projects', description: 'Manage campaigns' },
  { id: 'case-studies', label: 'Case Studies', icon: '📋', path: '/case-studies', description: 'Success stories & examples' },
  { id: 'ideation', label: 'Content Ideation', icon: '💡', path: '/ideation', description: 'Generate content ideas' },
  { id: 'script-templates', label: 'Script Templates', icon: '📜', path: '/script-templates', description: 'Professional script templates' },
  { id: 'scheduling', label: 'Scheduling', icon: '📅', path: '/scheduling', description: 'Content calendar' },
  { id: 'analytics', label: 'Analytics', icon: '📊', path: '/analytics', description: 'Performance insights' },
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

export const scriptTemplates = [
  {
    id: '1',
    title: 'Comedy Skit Template',
    category: 'Comedy',
    description: 'A structured format for creating engaging comedy content',
    content: `# Comedy Skit Template

## Hook (0-3 seconds)
Start with an unexpected statement or visual that grabs attention immediately.
Example: "I just discovered the weirdest thing about [relatable topic]..."

## Setup (3-10 seconds)
Establish the scenario and characters. Keep it simple and relatable.

## Build-Up (10-20 seconds)
Add layers of absurdity or unexpected twists. Each beat should escalate the comedy.

## Punchline/Payoff (20-25 seconds)
Deliver the biggest laugh. This should be your strongest comedic moment.

## Call to Action (25-30 seconds)
End with engagement - "Which one are you?" or "Tag someone who does this!"

## Tips:
- Use physical comedy and facial expressions
- Timing is everything - practice your beats
- Relatability is key to viral comedy
- Keep it under 30 seconds for maximum engagement`,
    tags: ['comedy', 'viral', 'tiktok', 'instagram', 'reels'],
    difficulty: 'Beginner',
    estimatedTime: '15-30 minutes',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts']
  },
  {
    id: '2',
    title: 'Educational Tutorial Script',
    category: 'Education',
    description: 'Perfect structure for teaching and educational content',
    content: `# Educational Tutorial Script

## Hook (0-5 seconds)
Start with a problem or intriguing question your audience faces.
Example: "Here's the mistake 90% of people make when [topic]..."

## Promise (5-10 seconds)
Tell them exactly what they'll learn and why it matters.
"By the end of this video, you'll know how to [specific outcome]"

## Main Content (10-45 seconds)
Break into 3-5 clear steps:
1. Step 1: [Action + Brief explanation]
2. Step 2: [Action + Brief explanation]
3. Step 3: [Action + Brief explanation]

## Demonstration (45-60 seconds)
Show the process in action. Use screen recordings, close-ups, or visual examples.

## Recap & CTA (60-70 seconds)
Summarize the key points and ask for engagement.
"Remember: [key takeaway]. Try this and let me know how it works!"

## Tips:
- Use simple language and avoid jargon
- Show, don't just tell
- Include captions for accessibility
- Keep each step under 10 seconds`,
    tags: ['education', 'tutorial', 'howto', 'tips', 'learning'],
    difficulty: 'Intermediate',
    estimatedTime: '30-60 minutes',
    platforms: ['YouTube', 'TikTok', 'Instagram', 'LinkedIn']
  },
  {
    id: '3',
    title: 'Product Review Format',
    category: 'Reviews',
    description: 'Comprehensive template for honest product reviews',
    content: `# Product Review Script Template

## Introduction (0-10 seconds)
"I've been testing [product] for [time period], and here's my honest review..."

## First Impressions (10-20 seconds)
- Unboxing/packaging experience
- Initial thoughts and expectations
- Price point context

## Key Features Testing (20-50 seconds)
Test 3-4 main features:
1. Feature 1: What it claims vs. reality
2. Feature 2: Performance in real-world use
3. Feature 3: Comparison to competitors
4. Feature 4: Value for money

## Pros & Cons (50-70 seconds)
Honest assessment:
Pros:
- [Specific benefit 1]
- [Specific benefit 2]
- [Specific benefit 3]

Cons:
- [Specific drawback 1]
- [Specific drawback 2]

## Final Verdict (70-80 seconds)
"Would I recommend this? [Yes/No] and here's why..."
Include who this product is best for.

## Tips:
- Be genuinely honest - builds trust
- Include both positives and negatives
- Show the product in use
- Mention if it's sponsored/gifted`,
    tags: ['review', 'product', 'honest', 'comparison', 'recommendation'],
    difficulty: 'Intermediate',
    estimatedTime: '45-90 minutes',
    platforms: ['YouTube', 'TikTok', 'Instagram', 'Amazon']
  },
  {
    id: '4',
    title: 'Motivational Speech Template',
    category: 'Motivation',
    description: 'Inspire and motivate your audience with this powerful structure',
    content: `# Motivational Speech Script

## Attention Grabber (0-5 seconds)
Start with a powerful statement or question.
"What if I told you that everything you think you know about [topic] is wrong?"

## Personal Story/Struggle (5-25 seconds)
Share a brief, relatable struggle:
- Where you were
- What you were facing
- How you felt

## The Turning Point (25-35 seconds)
The moment everything changed:
- What you discovered
- The action you took
- The mindset shift

## The Transformation (35-50 seconds)
Show the results:
- What changed in your life
- Specific improvements
- How it felt to overcome

## The Universal Truth (50-65 seconds)
Connect your story to their life:
"The same principle that worked for me will work for you because..."

## Call to Action (65-75 seconds)
Give them one specific action to take:
"Starting today, I want you to [specific action]. Comment below when you've done it!"

## Tips:
- Be vulnerable and authentic
- Use emotion in your delivery
- Keep the message simple and clear
- End with actionable advice`,
    tags: ['motivation', 'inspiration', 'mindset', 'personal-growth', 'success'],
    difficulty: 'Advanced',
    estimatedTime: '30-45 minutes',
    platforms: ['TikTok', 'Instagram', 'YouTube', 'LinkedIn']
  },
  {
    id: '5',
    title: 'Day in My Life Vlog',
    category: 'Lifestyle',
    description: 'Engaging format for lifestyle and daily routine content',
    content: `# Day in My Life Vlog Script

## Morning Introduction (0-10 seconds)
"Good morning! Today I'm taking you through a typical day in my life as a [your role/profession]"

## Morning Routine (10-30 seconds)
Show 3-4 key morning activities:
- Wake up time and energy level
- Morning habits (workout, meditation, coffee)
- Getting ready process
- Mindset for the day

## Work/Main Activity (30-60 seconds)
Document your primary focus:
- Key tasks or projects
- Behind-the-scenes moments
- Challenges you face
- Interesting discoveries

## Afternoon/Break Time (60-80 seconds)
Show balance and personality:
- Lunch or snack time
- Brief relaxation
- Social interactions
- Quick wins or frustrations

## Evening Wind Down (80-100 seconds)
- How you decompress
- Evening routine
- Reflections on the day
- Preparation for tomorrow

## Key Insights/Takeaways (100-110 seconds)
"Here's what I learned today..." or "The biggest challenge was..."

## Tips:
- Show both highs and lows
- Include timestamps for pacing
- Add music to set mood
- Be authentic, not perfect`,
    tags: ['lifestyle', 'vlog', 'routine', 'behind-the-scenes', 'authentic'],
    difficulty: 'Beginner',
    estimatedTime: '2-4 hours (filming + editing)',
    platforms: ['YouTube', 'TikTok', 'Instagram', 'Snapchat']
  },
  {
    id: '6',
    title: 'Trending Challenge Participation',
    category: 'Trends',
    description: 'How to participate in trends while adding your unique twist',
    content: `# Trending Challenge Script Template

## Quick Hook (0-3 seconds)
"Doing the [trend name] challenge but make it [your niche/twist]"

## Setup/Explanation (3-8 seconds)
Briefly explain the trend if needed:
"For those who don't know, this challenge is about [brief explanation]"

## Your Unique Twist (8-25 seconds)
Add your personality/expertise:
- Your professional take
- Your humor style
- Your skills/talents
- Your perspective

## Execute the Challenge (25-45 seconds)
Perform the trend with your modifications:
- Follow the basic format
- Add your creative elements
- Show your personality
- Include unexpected moments

## Results/Reaction (45-55 seconds)
Show the outcome:
- Your reaction
- What went wrong/right
- Funny moments
- Authentic responses

## Engagement Hook (55-60 seconds)
"Now you try it with [your twist]! Tag me when you do!"

## Tips:
- Research the trend thoroughly
- Add value, don't just copy
- Time your participation right (not too late)
- Make it authentically yours
- Use trending sounds/music`,
    tags: ['trending', 'challenge', 'viral', 'creative', 'engagement'],
    difficulty: 'Beginner',
    estimatedTime: '20-40 minutes',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts']
  }
];

// Niche-based topic suggestions
export const nicheTipics = {
  fitness: [
    'Quick 5-minute morning workout routines',
    'Healthy meal prep ideas for busy professionals',
    'Home gym equipment reviews under $100',
    'Pre and post-workout nutrition tips',
    'Mental health benefits of exercise'
  ],
  cooking: [
    'One-pot meals for easy cleanup',
    'Budget-friendly grocery shopping tips',
    'International cuisine made simple',
    'Healthy substitutions for favorite recipes',
    'Kitchen gadgets that actually save time'
  ],
  business: [
    'Productivity hacks for entrepreneurs',
    'Personal branding on social media',
    'Side hustle ideas that actually work',
    'Networking strategies for introverts',
    'Financial planning for creative professionals'
  ],
  lifestyle: [
    'Minimalist living tips and tricks',
    'Self-care routines that fit any budget',
    'Organization hacks for small spaces',
    'Sustainable living practices',
    'Work-life balance strategies'
  ],
  technology: [
    'Latest AI tools for content creators',
    'Smartphone photography tips',
    'Best apps for productivity',
    'Tech reviews for everyday users',
    'Digital privacy and security basics'
  ]
};

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