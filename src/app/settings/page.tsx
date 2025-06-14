// src/app/settings/page.tsx
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center">
              <SettingsIcon className="mr-3 h-8 w-8 text-primary" /> Settings
            </CardTitle>
            <CardDescription>Manage your account and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Settings page is under construction. Check back soon!
            </p>
            {/* Placeholder for settings options */}
            <div className="mt-6 space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">Update your username, bio, avatar, etc.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Change email, password, manage linked accounts.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">Configure your email and push notifications.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
