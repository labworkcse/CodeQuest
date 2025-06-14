import Link from 'next/link';
import TagBadge from '@/components/shared/TagBadge';
import type { Question } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface QuestionItemProps {
  question: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(question.createdAt), { addSuffix: true });
  const authorInitial = question.author.username ? question.author.username.charAt(0).toUpperCase() : "U";

  // Basic body preview (first paragraph or limited characters)
  let bodyPreview = question.body.split('\\n')[0]; // Get first line or paragraph
  if (bodyPreview.length > 250) { // Limit length
    bodyPreview = bodyPreview.substring(0, 250) + '...';
  }
  // Remove markdown for preview if necessary, or keep simple for now
  bodyPreview = bodyPreview.replace(/```[\s\S]*?```/g, '[code block]'); // Replace code blocks

  return (
    <div className="flex py-4 border-b border-border last:border-b-0">
      <div className="flex flex-col items-end space-y-1 w-20 text-xs text-muted-foreground pr-4 text-right">
        <div>
          <span className="font-medium text-sm text-foreground">{question.upvotes - question.downvotes}</span> votes
        </div>
        <div className={`py-0.5 px-1 rounded ${question.answersCount > 0 ? (question.answersCount > 0 && question.tags.some(t=> t.name === 'answered') ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700') : ''}`}>
          <span className="font-medium text-sm">{question.answersCount}</span> answers
        </div>
        <div>{question.views} views</div>
      </div>
      <div className="flex-grow">
        <h3 className="text-lg text-primary hover:text-primary/80 mb-1 leading-tight">
          <Link href={`/questions/${question.id}`}>
            {question.title}
          </Link>
        </h3>
        <p className="text-sm text-foreground/80 mb-2 leading-relaxed line-clamp-2" title={question.body}>
            {bodyPreview}
        </p>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-0">
            {question.tags.map(tag => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground ml-auto">
            <Avatar className="h-5 w-5">
              <AvatarImage src={question.author.avatarUrl} alt={question.author.username} data-ai-hint="user avatar"/>
              <AvatarFallback className="text-xs">{authorInitial}</AvatarFallback>
            </Avatar>
            <Link href={`/users/${question.author.username.toLowerCase()}`} className="text-primary hover:text-primary/80">
              {question.author.username}
            </Link>
            <span className="font-semibold text-foreground/70">{question.author.reputation}</span>
            <span>asked {timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
