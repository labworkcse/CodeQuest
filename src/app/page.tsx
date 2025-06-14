
import AppLayout from '@/components/layout/AppLayout';
import QuestionList from '@/components/questions/QuestionList';
import { placeholderQuestions } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from 'lucide-react';

export default function Home() {
  const questions = placeholderQuestions;
  const totalQuestions = "24,222,735"; // Placeholder for dynamic count

  return (
    <AppLayout mainContentClassName="lg:max-w-none !px-0 sm:!px-4"> {/* Override default max-width for SO layout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Newest Questions</h1>
          <p className="text-sm text-muted-foreground mt-1">{totalQuestions} questions</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4">
          <Link href="/submit">Ask Question</Link>
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="newest" className="w-auto">
          <TabsList className="bg-background border border-border p-0 h-9 rounded-md">
            <TabsTrigger value="newest" className="text-xs px-3 py-1.5 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-l-md">Newest</TabsTrigger>
            <TabsTrigger value="active" className="text-xs px-3 py-1.5 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none border-l border-border">Active</TabsTrigger>
            <TabsTrigger value="bountied" className="text-xs px-3 py-1.5 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none border-l border-border">Bountied <span className="ml-1.5 bg-primary text-primary-foreground text-[0.625rem] px-1.5 py-0.5 rounded-sm">40</span></TabsTrigger>
            <TabsTrigger value="unanswered" className="text-xs px-3 py-1.5 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none border-l border-border">Unanswered</TabsTrigger>
            <TabsTrigger value="more" className="text-xs px-3 py-1.5 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none border-l border-border rounded-r-md">More</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm" className="h-9 border-input-border text-foreground hover:bg-muted">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <QuestionList questions={questions} />
    </AppLayout>
  );
}
