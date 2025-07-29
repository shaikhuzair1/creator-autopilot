import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Star, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  isPremium: boolean;
  views: number;
  rating: number;
  duration: string;
  platform: string[];
}

export const ScriptTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<ScriptTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const categories = ["All", "Comedy", "Educational", "Review", "Tutorial", "Storytelling", "Product Demo", "Interview", "Vlog"];

  const scriptTemplates: ScriptTemplate[] = [
    {
      id: "1",
      title: "Comedy Sketch Template",
      category: "Comedy",
      description: "Perfect structure for creating engaging comedy content",
      content: `# Comedy Sketch Template

## Hook (0-3 seconds)
Start with a relatable problem or absurd situation that immediately grabs attention.

## Setup (3-15 seconds)
- Introduce the characters/situation
- Establish the premise clearly
- Build anticipation

## Development (15-45 seconds)
- Escalate the absurdity
- Add unexpected twists
- Use callbacks to earlier jokes

## Punchline/Resolution (45-60 seconds)
- Deliver the biggest laugh
- Tie everything together
- End on a high note

## Call to Action
- Ask for likes/comments
- Tease next video
- Subscribe reminder

**Key Tips:**
- Keep energy high throughout
- Use visual comedy when possible
- Time your pauses for maximum impact`,
      isPremium: false,
      views: 15420,
      rating: 4.8,
      duration: "60-90 sec",
      platform: ["TikTok", "YouTube Shorts", "Instagram"]
    },
    {
      id: "2",
      title: "Educational Explainer",
      category: "Educational",
      description: "Structured approach for teaching complex topics simply",
      content: `# Educational Explainer Template

## Hook (0-5 seconds)
"Did you know [surprising fact]? By the end of this video, you'll understand..."

## Problem Statement (5-15 seconds)
- What misconception exists?
- Why is this topic important?
- Who struggles with this?

## Solution Overview (15-30 seconds)
- Break down into 3 main points
- Use simple analogies
- Preview what they'll learn

## Deep Dive (30-120 seconds)
### Point 1: [Core Concept]
- Explanation
- Example
- Visual aid

### Point 2: [Application]
- How to use it
- Common mistakes
- Pro tips

### Point 3: [Advanced Insight]
- Next level understanding
- Real-world application

## Summary & CTA (120-150 seconds)
- Recap the 3 main points
- Challenge or homework
- Subscribe for more learning`,
      isPremium: true,
      views: 28750,
      rating: 4.9,
      duration: "2-3 min",
      platform: ["YouTube", "LinkedIn", "TikTok"]
    },
    {
      id: "3",
      title: "Product Review Structure",
      category: "Review",
      description: "Comprehensive template for honest product reviews",
      content: `# Product Review Template

## Introduction (0-10 seconds)
- Show the product
- State your experience level
- Set expectations

## First Impressions (10-30 seconds)
- Unboxing/initial thoughts
- Build quality assessment
- Design and aesthetics

## Features Breakdown (30-90 seconds)
### Key Feature 1
- How it works
- Performance test
- Comparison to competitors

### Key Feature 2
- Real-world usage
- Pros and cons
- Value assessment

## Honest Assessment (90-120 seconds)
### What I Loved
- Top 3 positives
- Unexpected benefits

### What Could Be Better
- Areas for improvement
- Deal-breakers (if any)

## Final Verdict (120-150 seconds)
- Overall rating
- Who should buy this
- Where to get best price
- Subscribe for more reviews`,
      isPremium: false,
      views: 34200,
      rating: 4.7,
      duration: "2-3 min",
      platform: ["YouTube", "Instagram", "TikTok"]
    },
    {
      id: "4",
      title: "Tutorial Step-by-Step",
      category: "Tutorial",
      description: "Clear structure for teaching any skill or process",
      content: `# Tutorial Template

## Hook & Promise (0-10 seconds)
"In the next [X] minutes, I'll teach you exactly how to [achieve result]"

## Prerequisites (10-20 seconds)
- What you need to know
- Tools/materials required
- Estimated time

## Overview (20-30 seconds)
- Show the end result
- Break down into steps
- Set realistic expectations

## Step-by-Step Process

### Step 1: [Foundation]
- Detailed explanation
- Common mistakes to avoid
- Progress checkpoint

### Step 2: [Building]
- Next level techniques
- Troubleshooting tips
- Visual demonstrations

### Step 3: [Finishing]
- Final touches
- Quality checks
- Variations to try

## Results & Next Steps (Final 30 seconds)
- Show completed result
- Suggest improvements
- Related tutorials
- Call to action`,
      isPremium: true,
      views: 45600,
      rating: 4.8,
      duration: "3-5 min",
      platform: ["YouTube", "Instagram", "LinkedIn"]
    },
    {
      id: "5",
      title: "Storytelling Arc",
      category: "Storytelling",
      description: "Compelling narrative structure for engaging stories",
      content: `# Storytelling Template

## Hook (0-5 seconds)
Start in the middle of action or with an intriguing statement

## Setup (5-20 seconds)
- Introduce the characters
- Establish the setting
- Hint at what's coming

## Inciting Incident (20-40 seconds)
- The moment everything changes
- Create tension or conflict
- Raise the stakes

## Rising Action (40-80 seconds)
- Build tension progressively
- Add obstacles or complications
- Develop character responses

## Climax (80-100 seconds)
- The turning point
- Highest tension moment
- The big reveal or confrontation

## Resolution (100-120 seconds)
- How it all ends
- Lessons learned
- Emotional payoff

## Reflection & CTA (120-150 seconds)
- What this means
- Ask audience to share similar stories
- Subscribe for more stories`,
      isPremium: false,
      views: 22800,
      rating: 4.6,
      duration: "2-3 min",
      platform: ["TikTok", "YouTube", "Instagram"]
    }
  ];

  const filteredTemplates = scriptTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (template: ScriptTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const handleCopyTemplate = (template: ScriptTemplate) => {
    navigator.clipboard.writeText(template.content);
    toast({
      title: "Template Copied!",
      description: "The script template has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Script Templates</CardTitle>
          <CardDescription>
            Professional script templates to create engaging content. Use @ in chat to access these templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{template.title}</span>
                        {template.isPremium && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{template.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {template.platform.slice(0, 2).map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                      {template.platform.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.platform.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{template.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{template.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{template.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(template)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyTemplate(template)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Template Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate?.title}
              {selectedTemplate?.isPremium && (
                <Badge variant="outline">
                  <Star className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Category: {selectedTemplate.category}</span>
                <span>Duration: {selectedTemplate.duration}</span>
                <span>Rating: ⭐ {selectedTemplate.rating}</span>
                <span>Views: {selectedTemplate.views.toLocaleString()}</span>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm">{selectedTemplate.content}</pre>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => handleCopyTemplate(selectedTemplate)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Template
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};