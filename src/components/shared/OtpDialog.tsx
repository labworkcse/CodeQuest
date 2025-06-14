'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface OtpDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  verificationType: 'email' | 'mobile';
  onVerify: (otp: string) => Promise<boolean>; // Returns true if successful
  target: string; // Email or phone number
}

const OtpDialog: React.FC<OtpDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  verificationType, 
  onVerify,
  target
}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'OTP must be 6 digits long.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await onVerify(otp);
      if (success) {
        toast({
          title: 'Verification Successful',
          description: `Language preference updated.`,
        });
        onOpenChange(false);
        setOtp('');
      } else {
        toast({
          title: 'Verification Failed',
          description: 'Invalid OTP. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    // Placeholder for resend OTP logic
    toast({
      title: 'OTP Resent',
      description: `A new OTP has been sent to ${target}.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
          <DialogDescription>
            An OTP has been sent to your {verificationType === 'email' ? 'email address' : 'mobile number'}{' '}
            <span className="font-medium">{target}</span>. Please enter it below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="otp" className="text-right">
              OTP
            </Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="col-span-3"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center">
           <Button variant="link" onClick={handleResendOtp} disabled={isLoading} className="p-0 h-auto">
            Resend OTP
          </Button>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading || otp.length !== 6}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
