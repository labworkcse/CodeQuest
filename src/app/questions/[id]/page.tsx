// src/app/questions/[id]/page.tsx
import AppLayout from '@/components/layout/AppLayout';
import { placeholderQuestions, placeholderUser } from '@/lib/placeholder-data';
import type { Question, Answer as AnswerType, Comment as CommentType } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TagBadge from '@/components/shared/TagBadge';
import VoteButtons from '@/components/questions/VoteButtons';
import { MessageSquare, Eye, CalendarDays, CheckCircle, CornerDownRight } from 'lucide-react';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

// Mock data for answers and comments
const mockAnswers: AnswerType[] = [
  {
    id: 'ans1',
    body: 'This is a great answer to the question! \n\n```javascript\nconst solution = "awesome";\n```\nMake sure to test it thoroughly.',
    author: placeholderUser,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    upvotes: 25,
    downvotes: 1,
    isAccepted: true,
  },
  {
    id: 'ans2',
    body: 'Another perspective: you could also try using a different approach involving `useReducer` for more complex state logic.',
    author: placeholderUser, // Using same user for simplicity
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    upvotes: 10,
    downvotes: 0,
  },
];

const mockComments: CommentType[] = [
 {
    id: 'comment1',
    body: 'Great question! I was wondering about this too.',
    author: placeholderUser,
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'comment2',
    body: 'Thanks for the detailed explanation in the answer.',
    author: placeholderUser,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];


interface QuestionPageProps {
  params: { id: string };
}

// Helper function to get question by ID (replace with actual data fetching)
async function getQuestion(id: string): Promise<Question | undefined> {
  return placeholderQuestions.find(q => q.id === id);
}

// Helper to format date nicely
const formatDate = (dateString: string) => format(new Date(dateString), "MMM d, yyyy 'at' HH:mm");

const Answer: React.FC<{ answer: AnswerType }> = ({ answer }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(answer.createdAt), { addSuffix: true });
  const authorInitial = answer.author.username ? answer.author.username.charAt(0).toUpperCase() : "U";

  return (
    <Card className={`mb-6 ${answer.isAccepted ? 'border-green-500 border-2 shadow-green-100' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <VoteButtons initialUpvotes={answer.upvotes} initialDownvotes={answer.downvotes} orientation="vertical" />
            {answer.isAccepted && <CheckCircle className="h-6 w-6 text-green-500 mt-2" titleAccess="Accepted Answer" />}
          </div>
          <div className="flex-grow">
            <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: answer.body.replace(/\n/g, '<br />') }} />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <Link href={`/users/${answer.author.username.toLowerCase()}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={answer.author.avatarUrl} alt={answer.author.username} data-ai-hint="user avatar"/>
                  <AvatarFallback>{authorInitial}</AvatarFallback>
                </Avatar>
                <span>{answer.author.username}</span>
              </Link>
              <span title={formatDate(answer.createdAt)}>{timeAgo}</span>
            </div>
            {/* Placeholder for comments on answer */}
            <div className="mt-3 pl-4 border-l-2">
                {mockComments.slice(0,1).map(comment => <Comment key={comment.id} comment={comment} parentId={answer.id}/>)}
                 <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">Add a comment</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Comment: React.FC<{ comment: CommentType, parentId: string }> = ({ comment }) => {
    const timeAgo = formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true });
    return (
        <div className="text-xs text-muted-foreground py-1.5 flex items-start">
            <CornerDownRight className="h-3 w-3 mr-1.5 mt-0.5 shrink-0" />
            <div>
                <span className="prose prose-xs max-w-none" dangerouslySetInnerHTML={{ __html: comment.body.replace(/\n/g, '<br />') }} />
                {' – '}
                <Link href={`/users/${comment.author.username.toLowerCase()}`} className="text-primary hover:underline">{comment.author.username}</Link>
                <span className="ml-1" title={formatDate(comment.createdAt)}>{timeAgo}</span>
            </div>
        </div>
    );
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const question = await getQuestion(params.id);

  if (!question) {
    return (
      <AppLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold">Question not found</h1>
          <p className="text-muted-foreground">The question you are looking for does not exist or has been removed.</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Questions</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const timeAgo = formatDistanceToNowStrict(new Date(question.createdAt), { addSuffix: true });
  const authorInitial = question.author.username ? question.author.username.charAt(0).toUpperCase() : "U";

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline leading-tight">{question.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {question.tags.map(tag => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center" title={`Asked ${formatDate(question.createdAt)}`}>
                <CalendarDays className="h-4 w-4 mr-1.5" /> Asked {timeAgo}
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1.5" /> {question.views} views
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex">
              <div className="mr-6 flex flex-col items-center space-y-2">
                <VoteButtons initialUpvotes={question.upvotes} initialDownvotes={question.downvotes} orientation="vertical" />
              </div>
              <div className="flex-grow prose max-w-none" dangerouslySetInnerHTML={{ __html: question.body.replace(/\n/g, '<br />') }} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm">
              {/* Placeholder for share/edit buttons */}
            </div>
            <Link href={`/users/${question.author.username.toLowerCase()}`} className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={question.author.avatarUrl} alt={question.author.username} data-ai-hint="user avatar" />
                <AvatarFallback>{authorInitial}</AvatarFallback>
              </Avatar>
              <div>
                <div>Asked by <span className="font-semibold">{question.author.username}</span></div>
                <div className="text-xs text-muted-foreground">Reputation: {question.author.reputation}</div>
              </div>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Comments on Question */}
        <div className="mb-8 pl-4 border-l-2 ml-4">
             <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {mockComments.map(comment => <Comment key={comment.id} comment={comment} parentId={question.id}/>)}
            <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-2">Add a comment</Button>
        </div>
        <Separator className="my-6"/>


        <h2 className="text-2xl font-semibold mb-6">{question.answersCount} Answer{question.answersCount === 1 ? '' : 's'}</h2>
        {mockAnswers.map(answer => (
          <Answer key={answer.id} answer={answer} />
        ))}

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Write your answer here. Markdown is supported." rows={8} className="mb-4" />
            {/* Add Markdown preview if needed */}
          </CardContent>
          <CardFooter>
            <Button>Post Your Answer</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
