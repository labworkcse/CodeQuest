'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  onVote?: (type: 'upvote' | 'downvote') => void;
  orientation?: 'vertical' | 'horizontal';
  userVote?: 'upvoted' | 'downvoted' | null;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  initialUpvotes,
  initialDownvotes,
  onVote,
  orientation = 'vertical',
  userVote: initialUserVote = null,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'upvoted' | 'downvoted' | null>(initialUserVote);

  const handleUpvote = () => {
    if (userVote === 'upvoted') {
      // Remove upvote
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      // Add upvote
      setUpvotes(prev => prev + 1);
      if (userVote === 'downvoted') {
        setDownvotes(prev => prev - 1); // Remove downvote if exists
      }
      setUserVote('upvoted');
    }
    onVote?.('upvote');
  };

  const handleDownvote = () => {
     if (userVote === 'downvoted') {
      // Remove downvote
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      // Add downvote
      setDownvotes(prev => prev + 1);
      if (userVote === 'upvoted') {
        setUpvotes(prev => prev - 1); // Remove upvote if exists
      }
      setUserVote('downvoted');
    }
    onVote?.('downvote');
  };

  const score = upvotes - downvotes;

  return (
    <div className={cn(
      "flex items-center gap-1",
      orientation === 'vertical' ? "flex-col" : "flex-row space-x-2"
    )}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleUpvote} 
        aria-label={`Upvote. Current upvotes: ${upvotes}`}
        className={cn(
          "text-muted-foreground hover:text-green-500 hover:bg-green-500/10",
          userVote === 'upvoted' && "text-green-500 bg-green-500/10"
        )}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>
      <span className={cn(
        "font-semibold text-lg",
        orientation === 'vertical' ? "my-1" : ""
        )}
        aria-live="polite"
        aria-label={`Current score: ${score}`}
      >
        {score}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDownvote} 
        aria-label={`Downvote. Current downvotes: ${downvotes}`}
        className={cn(
          "text-muted-foreground hover:text-red-500 hover:bg-red-500/10",
          userVote === 'downvoted' && "text-red-500 bg-red-500/10"
        )}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default VoteButtons;
