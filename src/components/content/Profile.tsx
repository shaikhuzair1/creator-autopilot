import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, CreditCard, Settings, Crown, Zap, Edit, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Content Creator Inc.',
    plan: 'Pro',
    avatar: ''
  });

  const [editData, setEditData] = useState(profileData);

  const creditInfo = {
    used: 750,
    total: 1000,
    percentage: 75,
    resetDate: '2024-08-01'
  };

  const planFeatures = {
    Pro: {
      chatLimit: '1,000 messages/month',
      analytics: 'Advanced analytics',
      aiInsights: 'AI-powered insights',
      support: 'Priority support',
      storage: '10GB storage'
    }
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                <CardDescription className="text-base">{profileData.email}</CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Crown className="h-3 w-3" />
                    <span>{profileData.plan} Plan</span>
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Credit Usage */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Credit Usage</span>
          </CardTitle>
          <CardDescription>
            Track your monthly usage and limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Messages Used</span>
              <span className="font-medium">{creditInfo.used.toLocaleString()} / {creditInfo.total.toLocaleString()}</span>
            </div>
            <Progress value={creditInfo.percentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{creditInfo.percentage}% used</span>
              <span>Resets on {creditInfo.resetDate}</span>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{creditInfo.used}</div>
              <div className="text-xs text-muted-foreground">Messages Used</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{creditInfo.total - creditInfo.used}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground">Days until reset</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Plan Details</span>
          </CardTitle>
          <CardDescription>
            Your current subscription and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Plan Features</h4>
              {Object.entries(planFeatures[profileData.plan as keyof typeof planFeatures]).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Billing Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date:</span>
                  <span className="font-medium">August 1, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">$29.99/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment method:</span>
                  <span className="font-medium">•••• 4242</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Billing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <User className="h-4 w-4 mr-2" />
              Update Password
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
            <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
              <X className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={editData.company}
                onChange={(e) => setEditData({...editData, company: e.target.value})}
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-6">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;