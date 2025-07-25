import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { contentIdeas } from '@/data/mockData';
import { Lightbulb, TrendingUp, Eye, Tag } from 'lucide-react';

const ContentIdeation: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const platforms = ['All', 'YouTube', 'TikTok', 'Instagram', 'Twitter'];

  const filteredIdeas = contentIdeas.filter(idea => 
    selectedPlatform === 'All' || idea.platform === selectedPlatform
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Generate New Ideas Section */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Lightbulb className="mr-2 h-5 w-5" />
            Generate Fresh Ideas
          </CardTitle>
          <CardDescription>Let AI create platform-specific content ideas for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform(platform)}
                className="transition-all duration-200"
              >
                {platform}
              </Button>
            ))}
          </div>
          <Button variant="gradient" size="lg" className="w-full md:w-auto">
            <Lightbulb className="mr-2 h-4 w-4" />
            Generate New Ideas
          </Button>
        </CardContent>
      </Card>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {idea.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {idea.platform}
                    </Badge>
                    {idea.trending && (
                      <Badge variant="default" className="text-xs bg-success">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{idea.description}</p>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="mr-1 h-4 w-4" />
                Estimated views: {idea.estimatedViews}
              </div>

              <div className="flex flex-wrap gap-1">
                <Tag className="h-3 w-3 text-muted-foreground mr-1 mt-0.5" />
                {idea.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-muted-foreground">
                    #{tag}{index < idea.tags.length - 1 && ', '}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="creator" size="sm" className="flex-1">
                  Use This Idea
                </Button>
                <Button variant="outline" size="sm">
                  Save for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Ideas
        </Button>
      </div>
    </div>
  );
};

export default ContentIdeation;