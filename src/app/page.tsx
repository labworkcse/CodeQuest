import AppLayout from '@/components/layout/AppLayout';
import QuestionList from '@/components/questions/QuestionList';
import { placeholderQuestions } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  // In a real app, fetch questions from an API
  const questions = placeholderQuestions;

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary">Recent Questions</h1>
        <Button asChild>
          <Link href="/submit">Ask Question</Link>
        </Button>
      </div>
      <QuestionList questions={questions} />
    </AppLayout>
  );
}
