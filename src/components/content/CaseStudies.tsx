import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, TrendingUp, DollarSign } from 'lucide-react';
import { caseStudies, niches, categories } from '@/data/caseStudies';
import { CaseStudy, CaseStudyFilters } from '@/types/caseStudy';

interface CaseStudiesProps {
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCaseStudy }) => {
  const [filters, setFilters] = useState<CaseStudyFilters>({
    search: '',
    niche: 'All',
    category: 'All'
  });

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         study.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         study.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesNiche = filters.niche === 'All' || study.niche === filters.niche;
    const matchesCategory = filters.category === 'All' || study.category === filters.category;
    
    return matchesSearch && matchesNiche && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Case Studies</h1>
        <p className="text-muted-foreground">
          Learn from successful creators across different niches and platforms
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search case studies..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.niche} onValueChange={(value) => setFilters(prev => ({ ...prev, niche: value }))}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select niche" />
              </SelectTrigger>
              <SelectContent>
                {niches.map(niche => (
                  <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredCaseStudies.length} Case Studies Found
            </h2>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Niche</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCaseStudies.map((study) => (
                  <TableRow key={study.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="max-w-xs">
                        <h3 className="font-medium text-foreground">{study.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{study.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{study.niche}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{study.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {study.platform}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="font-medium">{study.metrics.views}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="font-medium">{study.metrics.engagement}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{study.metrics.growth}</span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectCaseStudy?.(study)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No case studies found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudies;