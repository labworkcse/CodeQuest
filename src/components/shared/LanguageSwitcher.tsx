'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import OtpDialog from './OtpDialog';
import type { LanguageOption } from '@/types';
import { languages as defaultLanguages } from '@/lib/placeholder-data'; // Using placeholder
import { useToast } from '@/hooks/use-toast';

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(defaultLanguages[0]);
  const [selectedLanguageForOtp, setSelectedLanguageForOtp] = useState<LanguageOption | null>(null);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Mock user details, in a real app this would come from auth context
  const mockUserEmail = "user@example.com";
  const mockUserPhone = "+1******1234";


  useEffect(() => setMounted(true), []);

  const handleLanguageSelect = (lang: LanguageOption) => {
    if (lang.code === currentLanguage.code) return;

    if (lang.requiresEmailOtp || lang.requiresMobileOtp) {
      setSelectedLanguageForOtp(lang);
      setIsOtpDialogOpen(true);
    } else {
      // Directly switch language if no OTP required (e.g., switching back to English)
      setCurrentLanguage(lang);
      toast({
        title: 'Language Changed',
        description: `Switched to ${lang.name}.`,
      });
      // Here you would typically call i18n.changeLanguage(lang.code)
    }
  };

  const handleOtpVerify = async (otp: string): Promise<boolean> => {
    // Mock OTP verification
    console.log(`Verifying OTP ${otp} for ${selectedLanguageForOtp?.name}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    if (otp === "123456") { // Mock successful OTP
      if (selectedLanguageForOtp) {
        setCurrentLanguage(selectedLanguageForOtp);
        // Here you would typically call i18n.changeLanguage(selectedLanguageForOtp.code)
      }
      setSelectedLanguageForOtp(null);
      return true;
    }
    return false; 
  };

  if (!mounted) {
    return <div className="h-10 w-10 bg-muted rounded-md animate-pulse"></div>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`Change language, current language ${currentLanguage.name}`}>
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {defaultLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={currentLanguage.code === lang.code ? "bg-accent text-accent-foreground" : ""}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedLanguageForOtp && (
        <OtpDialog
          isOpen={isOtpDialogOpen}
          onOpenChange={setIsOtpDialogOpen}
          verificationType={selectedLanguageForOtp.requiresEmailOtp ? 'email' : 'mobile'}
          onVerify={handleOtpVerify}
          target={selectedLanguageForOtp.requiresEmailOtp ? mockUserEmail : mockUserPhone}
        />
      )}
    </>
  );
};

export default LanguageSwitcher;
