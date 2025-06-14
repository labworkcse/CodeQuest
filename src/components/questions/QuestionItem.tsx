import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Eye, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TagBadge from '@/components/shared/TagBadge';
import VoteButtons from './VoteButtons';
import type { Question } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';

interface QuestionItemProps {
  question: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(question.createdAt), { addSuffix: true });
  const authorInitial = question.author.username ? question.author.username.charAt(0).toUpperCase() : "U";

  // Basic Markdown preview (first paragraph or first 150 chars)
  let bodyPreview = question.body.split('\\n\\n')[0];
  if (bodyPreview.length > 200) {
    bodyPreview = bodyPreview.substring(0, 200) + '...';
  }
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex">
        <div className="p-4 bg-muted/50 flex flex-col items-center justify-start space-y-2">
          <VoteButtons 
            initialUpvotes={question.upvotes} 
            initialDownvotes={question.downvotes} 
            orientation="vertical" 
          />
        </div>
        <div className="flex-grow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl lg:text-2xl font-headline">
              <Link href={`/questions/${question.id}`} className="hover:text-primary transition-colors">
                {question.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-sm text-muted-foreground mb-3 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: bodyPreview.replace(/\n/g, '<br />') }} />
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map(tag => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between items-center text-xs text-muted-foreground pt-0">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Link href={`/users/${question.author.username.toLowerCase()}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.author.avatarUrl} alt={question.author.username} data-ai-hint="user avatar" />
                  <AvatarFallback>{authorInitial}</AvatarFallback>
                </Avatar>
                <span>{question.author.username}</span>
              </Link>
              <span className="hidden sm:inline">• Rep: {question.author.reputation}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <MessageSquare className="h-3.5 w-3.5 mr-1" /> {question.answersCount} Answers
              </span>
              <span className="flex items-center">
                <Eye className="h-3.5 w-3.5 mr-1" /> {question.views} Views
              </span>
              <span className="flex items-center" title={new Date(question.createdAt).toLocaleString()}>
                <CalendarDays className="h-3.5 w-3.5 mr-1" /> {timeAgo}
              </span>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default QuestionItem;
