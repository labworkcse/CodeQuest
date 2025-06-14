'use client';

import Link from 'next/link';
import { CodeXml, Search, UserCircle, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserProfileIcon from '@/components/auth/UserProfileIcon';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In a real app, check auth status here
    // For now, let's simulate it
    setIsAuthenticated(Math.random() > 0.5);
  }, []);


  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <CodeXml className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">CodeQuest</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/questions">Questions</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/feed">Feed</Link>
            </Button>
          </nav>
        </div>

        <div className="flex-1 max-w-md hidden md:flex items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search questions..." className="pl-10" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="primary" asChild className="hidden sm:inline-flex">
             <Link href="/submit">Ask Question</Link>
          </Button>
          <LanguageSwitcher />
          {mounted && (
            isAuthenticated ? (
              <UserProfileIcon avatarUrl="https://placehold.co/40x40.png" username="DevUser" />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Link>
                </Button>
              </div>
            )
          )}
          {!mounted && ( // Skeleton/placeholder for auth icons during SSR/initial load
            <div className="flex items-center space-x-2">
               <div className="h-8 w-8 bg-muted rounded-full animate-pulse md:h-10 md:w-10"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
