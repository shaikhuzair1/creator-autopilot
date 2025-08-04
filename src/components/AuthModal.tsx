import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login with localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === loginData.email && u.password === loginData.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
      onClose();
      toast({ title: 'Success', description: 'Logged in successfully!' });
    } else {
      toast({ title: 'Error', description: 'Invalid credentials', variant: 'destructive' });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      setIsLoading(false);
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === signupData.email);
    
    if (existingUser) {
      toast({ title: 'Error', description: 'User already exists', variant: 'destructive' });
      setIsLoading(false);
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signupData.name}`
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    onLogin(newUser);
    onClose();
    toast({ title: 'Success', description: 'Account created successfully!' });
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to Content Creator</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </motion.form>
          </TabsContent>
          
          <TabsContent value="signup">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSignup}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </motion.form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;