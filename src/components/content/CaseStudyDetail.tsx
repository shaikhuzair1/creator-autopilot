import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, TrendingUp, DollarSign, Users } from 'lucide-react';
import { CaseStudy } from '@/types/caseStudy';

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
  onBack: () => void;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ caseStudy, onBack }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Case Studies
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{caseStudy.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{caseStudy.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">{caseStudy.niche}</Badge>
              <Badge variant="outline">{caseStudy.category}</Badge>
              <Badge variant="secondary">{caseStudy.platform}</Badge>
              {caseStudy.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-foreground">{caseStudy.metrics.views}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold text-foreground">{caseStudy.metrics.engagement}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {caseStudy.metrics.revenue && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-foreground">{caseStudy.metrics.revenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold text-green-600">{caseStudy.metrics.growth}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Overview</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.content.overview}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Strategy</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.content.strategy}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Execution</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.content.execution}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Results</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.content.results}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Key Takeaways</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {caseStudy.content.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{takeaway}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseStudyDetail;