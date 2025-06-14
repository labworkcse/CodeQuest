// src/app/questions/[id]/page.tsx
import AppLayout from '@/components/layout/AppLayout';
import { placeholderQuestions, placeholderUser } from '@/lib/placeholder-data';
import type { Question, Answer as AnswerType, Comment as CommentType } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TagBadge from '@/components/shared/TagBadge';
// import VoteButtons from '@/components/questions/VoteButtons'; // SO design is different
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, CalendarDays, CheckCircle, CornerDownRight, Share2, Bookmark, History } from 'lucide-react';
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
    author: { ...placeholderUser, username: "ReactGuru", avatarUrl: "https://placehold.co/40x40.png?text=RG" },
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
    author: { ...placeholderUser, username: "HelpfulHannah", avatarUrl: "https://placehold.co/40x40.png?text=HH" },
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];


interface QuestionPageProps {
  params: { id: string };
}

async function getQuestion(id: string): Promise<Question | undefined> {
  return placeholderQuestions.find(q => q.id === id);
}

const formatDate = (dateString: string) => format(new Date(dateString), "MMM d, yyyy 'at' HH:mm");

const VoteControls: React.FC<{ initialUpvotes: number, initialDownvotes: number, onVote?: (type: 'up' | 'down') => void }> = ({ initialUpvotes, initialDownvotes }) => {
    // Basic state for demo, real app would handle this server-side
    const [score, setScore] = React.useState(initialUpvotes - initialDownvotes);
    // Add actual voting logic if needed
    return (
        <div className="flex flex-col items-center space-y-1 text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10"><ThumbsUp className="h-5 w-5" /></Button>
            <span className="text-xl font-semibold text-foreground">{score}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"><ThumbsDown className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 mt-2" title="Bookmark"><Bookmark className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="History"><History className="h-5 w-5" /></Button>
        </div>
    );
};


const Answer: React.FC<{ answer: AnswerType }> = ({ answer }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(answer.createdAt), { addSuffix: true });
  const authorInitial = answer.author.username ? answer.author.username.charAt(0).toUpperCase() : "U";

  return (
    <div className={`py-4 border-b border-border last:border-b-0 flex`}>
        <div className="w-16 flex-shrink-0 mr-4">
             <VoteControls initialUpvotes={answer.upvotes} initialDownvotes={answer.downvotes} />
             {answer.isAccepted && <CheckCircle className="h-6 w-6 text-green-600 mt-2 mx-auto" title="Accepted Answer" />}
        </div>
        <div className="flex-grow">
            <div className="prose prose-sm max-w-none mb-4 text-foreground" dangerouslySetInnerHTML={{ __html: answer.body.replace(/\n/g, '<br />') }} />
            
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                     {/* SO doesn't typically have share/edit buttons directly on answer like this easily */}
                </div>
                <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded-md w-fit ml-auto">
                    <div>answered {timeAgo}</div>
                    <div className="flex items-center space-x-1 mt-1">
                        <Link href={`/users/${answer.author.username.toLowerCase()}`} className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                            <AvatarImage src={answer.author.avatarUrl} alt={answer.author.username} data-ai-hint="user avatar"/>
                            <AvatarFallback className="text-xs">{authorInitial}</AvatarFallback>
                            </Avatar>
                            <span className="text-primary hover:text-primary/80">{answer.author.username}</span>
                        </Link>
                        <span className="font-semibold text-foreground/70">{answer.author.reputation}</span>
                    </div>
                </div>
            </div>
            <div className="mt-3 pl-0"> {/* Comments on answer */}
                {mockComments.slice(0,1).map(comment => <Comment key={comment.id} comment={comment} parentId={answer.id}/>)}
                 <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1 text-muted-foreground hover:text-primary">Add a comment</Button>
            </div>
        </div>
    </div>
  );
};

const Comment: React.FC<{ comment: CommentType, parentId: string }> = ({ comment }) => {
    const timeAgo = formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true });
    return (
        <div className="text-xs text-muted-foreground py-1.5 flex items-start border-t border-border/50 mt-2">
            <span className="prose prose-xs max-w-none mr-1" dangerouslySetInnerHTML={{ __html: comment.body.replace(/\n/g, '<br />') }} />
            {' – '}
            <Link href={`/users/${comment.author.username.toLowerCase()}`} className="text-primary hover:underline mx-1">{comment.author.username}</Link>
            <span className="text-muted-foreground/70" title={formatDate(comment.createdAt)}>{timeAgo}</span>
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
          <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">Back to Questions</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const timeAgoAsked = formatDistanceToNowStrict(new Date(question.createdAt), { addSuffix: false });
  const timeAgoModified = formatDistanceToNowStrict(new Date(question.updatedAt), { addSuffix: false });
  const authorInitial = question.author.username ? question.author.username.charAt(0).toUpperCase() : "U";

  return (
    <AppLayout mainContentClassName="lg:max-w-none !px-0 sm:!px-4">
      <div className="pb-6 mb-4 border-b border-border">
        <div className="flex justify-between items-start">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 leading-tight">{question.title}</h1>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 ml-4 shrink-0">
                <Link href="/submit">Ask Question</Link>
            </Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
            <span>Asked <span className="text-foreground">{timeAgoAsked} ago</span></span>
            <span>Modified <span className="text-foreground">{timeAgoModified} ago</span></span>
            <span>Viewed <span className="text-foreground">{question.views} times</span></span>
        </div>
      </div>
      
      <div className="flex">
        <div className="w-16 flex-shrink-0 mr-4">
            <VoteControls initialUpvotes={question.upvotes} initialDownvotes={question.downvotes}/>
        </div>
        <div className="flex-grow min-w-0"> {/* Added min-w-0 for flex child to allow shrinking */}
            <div className="prose max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: question.body.replace(/\n/g, '<br />') }} />
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {question.tags.map(tag => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-1 h-auto">Share</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-1 h-auto">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-1 h-auto">Follow</Button>
                </div>
                <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded-md w-fit">
                    <div>asked {formatDistanceToNowStrict(new Date(question.createdAt), { addSuffix: true })}</div>
                    <div className="flex items-center space-x-1 mt-1">
                        <Link href={`/users/${question.author.username.toLowerCase()}`} className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={question.author.avatarUrl} alt={question.author.username} data-ai-hint="user avatar small"/>
                                <AvatarFallback className="text-xs">{authorInitial}</AvatarFallback>
                            </Avatar>
                            <span className="text-primary hover:text-primary/80">{question.author.username}</span>
                        </Link>
                        <span className="font-semibold text-foreground/70">{question.author.reputation}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pl-0"> {/* Comments on Question */}
                {mockComments.map(comment => <Comment key={comment.id} comment={comment} parentId={question.id}/>)}
                <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1 text-muted-foreground hover:text-primary">Add a comment</Button>
            </div>
        </div>
      </div>
      
      <Separator className="my-6"/>

      {mockAnswers.length > 0 && (
        <h2 className="text-xl font-semibold mb-4 text-foreground">{question.answersCount} Answer{question.answersCount === 1 ? '' : 's'}</h2>
      )}
      {mockAnswers.map(answer => (
        <Answer key={answer.id} answer={answer} />
      ))}

      <Separator className="my-8" />

      <Card className="border-border">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xl text-foreground">Your Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Write your answer here. Markdown is supported." rows={8} className="mb-4 border-input-border" />
        </CardContent>
        <CardFooter>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4">Post Your Answer</Button>
        </CardFooter>
      </Card>
    </AppLayout>
  );
}
