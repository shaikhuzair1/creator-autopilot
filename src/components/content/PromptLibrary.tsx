import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Plus } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  isSaved?: boolean;
}

interface PromptLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

const defaultPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Social Media Caption',
    content: 'Write an engaging social media caption for [topic/product] that includes relevant hashtags and encourages engagement.',
    category: 'social-media'
  },
  {
    id: '2',
    title: 'Blog Post Outline',
    content: 'Create a detailed blog post outline for "[topic]" including introduction, main points, and conclusion.',
    category: 'content'
  },
  {
    id: '3',
    title: 'Email Marketing',
    content: 'Write a compelling email subject line and body for [product/service] that drives conversions.',
    category: 'email'
  },
  {
    id: '4',
    title: 'Video Script',
    content: 'Create a 60-second video script for [platform] about [topic] that hooks viewers in the first 3 seconds.',
    category: 'video'
  },
  {
    id: '5',
    title: 'Product Description',
    content: 'Write a persuasive product description for [product] highlighting key benefits and features.',
    category: 'ecommerce'
  },
  {
    id: '6',
    title: 'LinkedIn Post',
    content: 'Create a professional LinkedIn post about [topic] that encourages networking and engagement.',
    category: 'social-media'
  }
];

const PromptLibrary: React.FC<PromptLibraryProps> = ({ isOpen, onClose, onSelectPrompt }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);

  const categories = [
    { id: 'all', name: 'All Prompts' },
    { id: 'social-media', name: 'Social Media' },
    { id: 'content', name: 'Content Writing' },
    { id: 'email', name: 'Email Marketing' },
    { id: 'video', name: 'Video Scripts' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPrompts = defaultPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePromptClick = (prompt: Prompt) => {
    onSelectPrompt(prompt.content);
    onClose();
  };

  const savePrompt = (prompt: Prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, isSaved: true }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Prompt Library</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs defaultValue="browse" className="flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Prompts</TabsTrigger>
              <TabsTrigger value="saved">Saved Prompts ({savedPrompts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Prompts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredPrompts.map(prompt => (
                  <div key={prompt.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{prompt.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => savePrompt(prompt)}
                        className="h-8 w-8 p-0"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {prompt.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === prompt.category)?.name}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        Use Prompt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              {savedPrompts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No saved prompts yet</p>
                  <p className="text-sm">Save prompts from the Browse tab to see them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {savedPrompts.map(prompt => (
                    <div key={prompt.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium mb-2">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {prompt.content}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full"
                      >
                        Use Prompt
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromptLibrary;