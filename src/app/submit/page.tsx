// src/app/submit/page.tsx
'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Tag as TagIcon, AlertTriangle } from 'lucide-react';

// Basic client-side validation before actual form libraries like react-hook-form
const validateQuestion = (title: string, body: string, tags: string) => {
  const errors: string[] = [];
  if (!title.trim()) errors.push("Title is required.");
  if (title.length < 15) errors.push("Title must be at least 15 characters long.");
  if (!body.trim()) errors.push("Body is required.");
  if (body.length < 30) errors.push("Body must be at least 30 characters long.");
  if (!tags.trim()) errors.push("At least one tag is required.");
  const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
  if (tagArray.length > 5) errors.push("Maximum 5 tags allowed.");
  if (tagArray.some(t => t.length > 20)) errors.push("Tag length cannot exceed 20 characters.");
  return errors;
};


export default function SubmitQuestionPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated tags
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    const validationErrors = validateQuestion(title, body, tags);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach(err => toast({ title: "Validation Error", description: err, variant: "destructive" }));
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Submitting question:', { title, body, tags });
    toast({
      title: 'Question Submitted!',
      description: 'Your question has been posted successfully.',
    });
    // Reset form or redirect
    setTitle('');
    setBody('');
    setTags('');
    setIsLoading(false);
    // router.push('/questions/newly-created-id'); // Example redirect
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center">
              <PlusCircle className="mr-3 h-8 w-8 text-primary" /> Ask a Public Question
            </CardTitle>
            <CardDescription>
              Share your programming challenge with the community. Be specific and provide context.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {errors.length > 0 && (
                <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h4 className="font-semibold">Please fix the following issues:</h4>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                  </ul>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-medium">Title</Label>
                <p className="text-xs text-muted-foreground">
                  Be specific and imagine you&apos;re asking a question to another person.
                </p>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., How to implement authentication in Next.js with App Router?"
                  disabled={isLoading}
                  required
                  minLength={15}
                  aria-describedby={errors.some(e => e.toLowerCase().includes('title')) ? "title-error" : undefined}
                />
                {errors.some(e => e.toLowerCase().includes('title')) && <p id="title-error" className="text-sm text-destructive mt-1">Title related error from list above.</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="body" className="text-lg font-medium">Body</Label>
                <p className="text-xs text-muted-foreground">
                  Include all the information someone would need to answer your question. Markdown is supported.
                </p>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe your problem in detail..."
                  rows={10}
                  disabled={isLoading}
                  required
                  minLength={30}
                  aria-describedby={errors.some(e => e.toLowerCase().includes('body')) ? "body-error" : undefined}
                />
                 {errors.some(e => e.toLowerCase().includes('body')) && <p id="body-error" className="text-sm text-destructive mt-1">Body related error from list above.</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-lg font-medium">Tags</Label>
                <p className="text-xs text-muted-foreground">
                  Add up to 5 tags to describe what your question is about. Use comma to separate tags.
                </p>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., react, nextjs, typescript, authentication"
                    className="pl-10"
                    disabled={isLoading}
                    required
                    aria-describedby={errors.some(e => e.toLowerCase().includes('tag')) ? "tags-error" : undefined}
                  />
                </div>
                 {errors.some(e => e.toLowerCase().includes('tag')) && <p id="tags-error" className="text-sm text-destructive mt-1">Tag related error from list above.</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Post Your Question'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
