import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { templates } from '@/data/mockData';
import { Layout, Crown, Search, Filter } from 'lucide-react';

const Templates: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  
  const categories = ['All', 'Engagement', 'Reviews', 'Fitness', 'Gaming', 'Education'];
  const types = ['All', 'Caption', 'Script', 'Hook', 'Thumbnail'];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = filter === 'All' || template.category === filter;
    const matchesType = typeFilter === 'All' || template.type === typeFilter;
    return matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Caption': return 'bg-primary/10 text-primary border-primary/20';
      case 'Script': return 'bg-accent/10 text-accent border-accent/20';
      case 'Hook': return 'bg-success/10 text-success border-success/20';
      case 'Thumbnail': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Layout className="mr-2 h-5 w-5" />
            Content Templates
          </CardTitle>
          <CardDescription>
            Ready-to-use templates for captions, scripts, hooks, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg">
              <Crown className="mr-2 h-4 w-4" />
              Browse Premium
            </Button>
            <Button variant="outline" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Search Templates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Type</h3>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className="transition-all duration-200"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.title}
                    </CardTitle>
                    {template.isPremium && (
                      <Crown className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(template.type)}>
                      {template.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm text-muted-foreground italic">
                  "{template.preview}"
                </p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant={template.isPremium ? "creator" : "default"} 
                  size="sm" 
                  className="flex-1"
                  disabled={template.isPremium}
                >
                  {template.isPremium ? (
                    <>
                      <Crown className="mr-2 h-3 w-3" />
                      Premium
                    </>
                  ) : (
                    'Use Template'
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Templates Upsell */}
      <Card className="shadow-elevated bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-600">
            <Crown className="mr-2 h-5 w-5" />
            Premium Templates
          </CardTitle>
          <CardDescription>
            Unlock access to 500+ professional templates used by top creators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">500+</div>
              <div className="text-sm text-muted-foreground">Premium Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">10x</div>
              <div className="text-sm text-muted-foreground">Better Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">24/7</div>
              <div className="text-sm text-muted-foreground">New Templates</div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="creator" size="lg">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Template Categories */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>📂 Template Categories</CardTitle>
          <CardDescription>Explore templates by content type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Viral Hooks", count: 45, icon: "🎣" },
              { name: "Call-to-Actions", count: 32, icon: "📢" },
              { name: "Storytelling", count: 28, icon: "📖" },
              { name: "Product Reviews", count: 22, icon: "⭐" },
              { name: "Tutorials", count: 38, icon: "🎓" },
              { name: "Motivational", count: 25, icon: "💪" },
              { name: "Behind Scenes", count: 18, icon: "🎬" },
              { name: "Q&A Format", count: 15, icon: "❓" }
            ].map((category, index) => (
              <div key={index} className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} templates</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;