import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scheduledPosts } from '@/data/mockData';
import { Calendar, Clock, Plus, Edit, Trash2 } from 'lucide-react';

const Scheduling: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-primary/10 text-primary';
      case 'Posted': return 'bg-success/10 text-success';
      case 'Failed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted-foreground/10 text-muted-foreground';
    }
  };

  const getPlatformEmoji = (platform: string) => {
    switch (platform) {
      case 'TikTok': return '📱';
      case 'Instagram': return '📷';
      case 'YouTube': return '🎬';
      case 'Twitter': return '🐦';
      default: return '📄';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Quick Actions */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Calendar className="mr-2 h-5 w-5" />
            Content Calendar
          </CardTitle>
          <CardDescription>
            Schedule your content across all platforms for maximum engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Post
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
            <Button variant="outline" size="lg">
              <Clock className="mr-2 h-4 w-4" />
              Optimal Times
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Posts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Upcoming Posts</h2>
          <Button variant="outline">
            View All Scheduled
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scheduledPosts.map((post) => (
            <Card key={post.id} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getPlatformEmoji(post.platform)}</div>
                    <div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {post.platform}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(post.status)} text-xs`}>
                    {post.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {post.scheduledDate}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Posting Times */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>⏰ Optimal Posting Times</CardTitle>
          <CardDescription>AI-recommended posting times based on your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
              <div className="text-lg font-bold text-primary">TikTok</div>
              <div className="text-sm text-muted-foreground mt-1">7-9 PM</div>
              <div className="text-xs text-muted-foreground">Weekdays</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-lg border border-accent/20">
              <div className="text-lg font-bold text-accent">Instagram</div>
              <div className="text-sm text-muted-foreground mt-1">8-10 AM</div>
              <div className="text-xs text-muted-foreground">Tue-Thu</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/20 rounded-lg border border-success/20">
              <div className="text-lg font-bold text-success">YouTube</div>
              <div className="text-sm text-muted-foreground mt-1">2-4 PM</div>
              <div className="text-xs text-muted-foreground">Sat-Sun</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-muted/50 to-muted rounded-lg border border-border">
              <div className="text-lg font-bold text-foreground">Twitter</div>
              <div className="text-sm text-muted-foreground mt-1">12-1 PM</div>
              <div className="text-xs text-muted-foreground">Mon-Fri</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View Preview */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>📅 This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="space-y-2">
                <div className="font-semibold text-sm text-muted-foreground">{day}</div>
                <div className="space-y-1">
                  {index < 4 && (
                    <div className="bg-primary/20 text-primary text-xs p-1 rounded">
                      Post
                    </div>
                  )}
                  {index === 2 && (
                    <div className="bg-accent/20 text-accent text-xs p-1 rounded">
                      Story
                    </div>
                  )}
                  {index === 5 && (
                    <div className="bg-success/20 text-success text-xs p-1 rounded">
                      Video
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scheduling;