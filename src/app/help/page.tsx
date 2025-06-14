// src/app/help/page.tsx
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center">
              <HelpCircle className="mr-3 h-8 w-8 text-primary" /> Help & Support
            </CardTitle>
            <CardDescription>Find answers to your questions and get help.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Welcome to the CodeQuest help center. This page is currently under construction.
            </p>
            <p className="text-muted-foreground">
              In the meantime, if you have any questions, please imagine a comprehensive FAQ section here or a contact form to reach our support team.
            </p>
            {/* Placeholder for FAQ or contact form */}
            <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>How do I ask a question?</li>
                    <li>How does reputation work?</li>
                    <li>Can I edit my posts?</li>
                </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
