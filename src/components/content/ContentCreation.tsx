import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Wand2, Copy, Download, RefreshCw } from 'lucide-react';

const ContentCreation: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<string>('caption');

  const contentTypes = [
    { id: 'caption', label: 'Caption', description: 'Social media captions' },
    { id: 'script', label: 'Script', description: 'Video scripts' },
    { id: 'hashtags', label: 'Hashtags', description: 'Trending hashtags' },
    { id: 'hook', label: 'Hook', description: 'Attention-grabbing hooks' }
  ];

  const mockGeneratedContent = {
    caption: "🔥 Transform your fitness journey with this 10-minute HIIT workout! No equipment needed - just you and your determination. Perfect for busy professionals who want to stay fit. Save this for your next workout! 💪\n\n#HIIT #FitnessMotivation #WorkoutAtHome #BusyLifestyle #HealthyLiving #FitnessGoals #NoExcuses",
    script: "Hey fitness warriors! Today I'm sharing a game-changing 10-minute HIIT workout that's perfect for your busy schedule.\n\n[0:00-0:15] Hook: 'What if I told you that you could get an amazing workout in just 10 minutes?'\n\n[0:15-0:45] Problem: Talk about how busy schedules prevent us from working out\n\n[0:45-8:00] Solution: Demonstrate the HIIT routine\n\n[8:00-9:30] Benefits: Explain why this works\n\n[9:30-10:00] Call to action: 'Try this workout and let me know how it goes!'",
    hashtags: "#HIIT #FitnessMotivation #WorkoutAtHome #BusyLifestyle #HealthyLiving #FitnessGoals #NoExcuses #QuickWorkout #FitnessTips #HomeWorkout #Cardio #StrengthTraining #FitnessJourney #HealthyHabits #WorkoutWednesday",
    hook: "What if I told you that you could burn more calories in 10 minutes than most people do in an hour at the gym? 🔥\n\nThis HIIT workout is about to change everything you thought you knew about fitness...\n\n(And the best part? You don't need ANY equipment)"
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(mockGeneratedContent[contentType as keyof typeof mockGeneratedContent]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Input Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="mr-2 h-5 w-5 text-primary" />
            Create Content with AI
          </CardTitle>
          <CardDescription>
            Describe your topic or paste your draft content, and let AI generate optimized versions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Type Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content Type</label>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={contentType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentType(type.id)}
                  className="transition-all duration-200"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Input</label>
            <Textarea
              placeholder="Describe your content idea or paste your draft here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 resize-none"
            />
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={handleGenerate}
            disabled={!inputText.trim() || isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="shadow-elevated border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CardTitle className="text-primary">Generated Content</CardTitle>
                <Badge variant="secondary" className="ml-3">
                  {contentTypes.find(t => t.id === contentType)?.label}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {generatedContent}
              </pre>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex flex-wrap gap-2">
              <Button variant="creator" size="sm">
                Use This Content
              </Button>
              <Button variant="outline" size="sm" onClick={handleGenerate}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm">
                Save to Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card className="shadow-soft bg-gradient-to-r from-accent/5 to-accent-secondary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-accent">💡 Pro Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">• Be specific about your target audience and platform</p>
          <p className="text-sm">• Include key points you want to cover</p>
          <p className="text-sm">• Mention your brand tone (casual, professional, humorous)</p>
          <p className="text-sm">• Add any specific hashtags or mentions you want included</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreation;