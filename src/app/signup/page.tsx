// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, User, Mail, Key, Phone, AlertTriangle } from 'lucide-react';

// Basic client-side validation
const validateSignup = (username: string, email: string, phone: string, password: string,confirmPassword: string ) => {
  const errors: string[] = [];
  if (!username.trim()) errors.push("Username is required.");
  if (!email.trim()) errors.push("Email is required.");
  else if (!/\S+@\S+\.\S+/.test(email)) errors.push("Email is invalid.");
  if (!phone.trim()) errors.push("Phone number is required.");
  else if (!/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, ''))) errors.push("Phone number is invalid. Include country code e.g. +12223334444");
  if (!password) errors.push("Password is required.");
  else if (password.length < 6) errors.push("Password must be at least 6 characters long.");
  if (password !== confirmPassword) errors.push("Passwords do not match.");
  return errors;
};


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateSignup(username, email, phone, password, confirmPassword);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach(err => toast({ title: "Validation Error", description: err, variant: "destructive" }));
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Account Created!',
      description: 'Welcome to CodeQuest! Please login.',
    });
    setIsLoading(false);
    // router.push('/login'); // Example redirect
  };

  return (
    <AppLayout>
      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline flex items-center justify-center">
              <UserPlus className="mr-3 h-8 w-8 text-primary" /> Create Account
            </CardTitle>
            <CardDescription>Join the CodeQuest community.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
               {errors.length > 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md">
                  <div className="flex items-center mb-1.5">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <h4 className="font-semibold text-sm">Please fix the issues:</h4>
                  </div>
                  <ul className="list-disc list-inside text-xs space-y-0.5">
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                  </ul>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your unique username"
                        required
                        disabled={isLoading}
                        className="pl-10"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+12345678900"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                     <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10"
                    />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
