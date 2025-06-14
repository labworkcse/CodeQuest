'use client';

import Link from 'next/link';
import { Search as SearchIcon, Menu } from 'lucide-react'; // Using Menu for mobile nav toggle
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook exists

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder for auth status - in a real app, this would come from context or a hook
  const isAuthenticated = false; 

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/ai', label: 'OverflowAI' },
  ];

  return (
    <header className="bg-card border-b border-border shadow-so-header sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        Stack Overflow's 2025 Annual Developer Survey is still open —{' '}
        <a href="#" className="font-semibold underline hover:text-blue-200">
          take the Survey before it closes
        </a>
        <button className="absolute top-1 right-2 text-white/70 hover:text-white text-xl leading-none">&times;</button>
      </div>

      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-foreground/70 hover:text-foreground"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <svg width="32" height="37" viewBox="0 0 32 37" className="h-8 w-auto text-orange-500 fill-current">
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
              <path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14.9 8.9h-18v4h18v-4Z" fill="#F48024"></path>
            </svg>
            <span className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
              CodeQuest
            </span>
          </Link>
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1 ml-4">
              {navLinks.map(link => (
                <Button variant="ghost" size="sm" asChild key={link.href} className="text-foreground/70 hover:text-foreground px-3">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
          )}
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 h-9 bg-background border-input-border focus:border-primary focus:ring-primary focus:ring-1"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!mounted ? (
            <>
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
            </>
          ) : isAuthenticated ? (
            <>
              {/* Placeholder for authenticated user icons (e.g., inbox, achievements, profile) */}
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/10 h-8 px-3">
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-3">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {isMobile && mobileNavOpen && mounted && (
         <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-2">
               <Input type="search" placeholder="Search..." className="w-full h-9 bg-background border-input-border focus:border-primary focus:ring-primary focus:ring-1" />
            </div>
            <nav className="flex flex-col space-y-1 p-2">
              {navLinks.map(link => (
                <Button variant="ghost" asChild key={link.href} className="justify-start text-foreground/80 hover:text-foreground">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
