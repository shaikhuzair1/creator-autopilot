import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { videoClips } from '@/data/mockData';
import { Upload, Video, Play, Download, Scissors } from 'lucide-react';

const VideoEditing: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Upload Section */}
      <Card className="shadow-elevated bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Upload className="mr-2 h-5 w-5" />
            Upload & Generate Clips
          </CardTitle>
          <CardDescription>
            Upload your long-form video and let AI create optimized clips for different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Video className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop your video here</h3>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <Button variant="gradient" onClick={handleUpload} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Scissors className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Select Video File
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Clips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Generated Clips</h2>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoClips.map((clip) => (
            <Card key={clip.id} className="shadow-soft hover:shadow-elevated transition-all duration-200 hover-scale">
              <CardHeader className="pb-2">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden group cursor-pointer">
                  <div className="text-4xl">{clip.thumbnail}</div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {clip.duration}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-base">{clip.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{clip.platform}</Badge>
                  <span className="text-muted-foreground flex items-center">
                    <Play className="mr-1 h-3 w-3" />
                    {clip.views} views
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Platform Optimization */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>🎯 Platform Optimization</CardTitle>
          <CardDescription>AI automatically optimizes clips for each platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold">TikTok</h3>
              <p className="text-sm text-muted-foreground">9:16 ratio, 15-60s, vertical</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">📷</div>
              <h3 className="font-semibold">Instagram Reels</h3>
              <p className="text-sm text-muted-foreground">9:16 ratio, 15-90s, captions</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">🎬</div>
              <h3 className="font-semibold">YouTube Shorts</h3>
              <p className="text-sm text-muted-foreground">9:16 ratio, up to 60s, thumbnails</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoEditing;