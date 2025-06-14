// src/app/feed/page.tsx
'use client'; // Feed will likely be dynamic, so client component for now.

import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { placeholderUser } from '@/lib/placeholder-data';
import type { FeedPost } from '@/types';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Send } from 'lucide-react';
import Image from 'next/image'; // next/image for optimized images
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';


// Mock Feed Data
const mockFeedPosts: FeedPost[] = [
  {
    id: 'post1',
    author: placeholderUser,
    caption: 'Just launched my new project! Check it out. #coding #newproject #webdev',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 120,
    shares: 15,
    commentsCount: 8,
  },
  {
    id: 'post2',
    author: { ...placeholderUser, username: "FrontendFan", avatarUrl: "https://placehold.co/100x100.png" },
    caption: 'Learning about server components in Next.js 14. Mind blown! 🤯 #nextjs #react #serverside',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 250,
    shares: 30,
    commentsCount: 12,
  },
  {
    id: 'post3',
    author: placeholderUser,
    caption: 'Working on a new video tutorial about Tailwind CSS. Coming soon! 🎬',
    mediaUrl: 'https://placehold.co/600x338.png', // Placeholder for video thumbnail
    mediaType: 'video',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 88,
    shares: 5,
    commentsCount: 3,
  }
];


interface CreatePostCardProps {
  user: typeof placeholderUser;
  onPost: (newPost: FeedPost) => void;
  postLimitReached: boolean;
}

const CreatePostCard: React.FC<CreatePostCardProps> = ({ user, onPost, postLimitReached }) => {
  const [caption, setCaption] = useState('');
  // In a real app, handle file uploads
  // const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handlePost = () => {
    if (postLimitReached) {
        alert("You've reached your post limit for today."); // Replace with proper toast/notification
        return;
    }
    if (!caption.trim()) {
        alert("Caption cannot be empty."); // Replace with proper toast/notification
        return;
    }
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: user,
      caption,
      // mediaUrl: mediaFile ? URL.createObjectURL(mediaFile) : undefined,
      // mediaType: mediaFile?.type.startsWith('image') ? 'image' : (mediaFile?.type.startsWith('video') ? 'video' : undefined),
      createdAt: new Date().toISOString(),
      likes: 0,
      shares: 0,
      commentsCount: 0,
    };
    onPost(newPost);
    setCaption('');
    // setMediaFile(null);
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.username} data-ai-hint="user avatar"/>
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Textarea 
            placeholder={`What's on your mind, ${user.username}?`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            className="flex-1"
            disabled={postLimitReached}
          />
        </div>
        {postLimitReached && <p className="text-sm text-destructive mt-2">You have reached your daily post limit.</p>}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" aria-label="Add image" disabled={postLimitReached}>
            <ImageIcon className="h-5 w-5 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Add video" disabled={postLimitReached}>
            <Video className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
        <Button onClick={handlePost} disabled={!caption.trim() || postLimitReached}>
          <Send className="mr-2 h-4 w-4" /> Post
        </Button>
      </CardFooter>
    </Card>
  );
};

interface FeedPostCardProps {
  post: FeedPost;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({ post }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true });
  const authorInitial = post.author.username ? post.author.username.charAt(0).toUpperCase() : "U";

  return (
    <Card className="mb-6 shadow-lg overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Link href={`/users/${post.author.username.toLowerCase()}`}>
            <Avatar>
              <AvatarImage src={post.author.avatarUrl} alt={post.author.username} data-ai-hint="user avatar"/>
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/users/${post.author.username.toLowerCase()}`}>
                <p className="font-semibold hover:text-primary">{post.author.username}</p>
            </Link>
            <p className="text-xs text-muted-foreground" title={new Date(post.createdAt).toLocaleString()}>{timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {post.caption && <p className="mb-3 text-sm whitespace-pre-line">{post.caption}</p>}
        {post.mediaUrl && post.mediaType === 'image' && (
          <div className="rounded-md overflow-hidden border aspect-video relative bg-muted">
            <Image src={post.mediaUrl} alt={`Post by ${post.author.username}`} layout="fill" objectFit="cover" data-ai-hint="social media" />
          </div>
        )}
        {post.mediaUrl && post.mediaType === 'video' && (
          <div className="rounded-md overflow-hidden border aspect-video relative bg-black flex items-center justify-center">
            {/* Basic video placeholder */}
            <Video className="h-16 w-16 text-muted-foreground" />
            <p className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-1.5 py-0.5 rounded">Video Preview</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-around items-center border-t pt-3 pb-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
          <Heart className="h-5 w-5 mr-1.5" /> {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <MessageCircle className="h-5 w-5 mr-1.5" /> {post.commentsCount}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
          <Share2 className="h-5 w-5 mr-1.5" /> {post.shares}
        </Button>
      </CardFooter>
    </Card>
  );
};


export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(mockFeedPosts);
  const [currentUser, setCurrentUser] = useState(placeholderUser); // Mock current user
  const [postLimitReached, setPostLimitReached] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate fetching current user and their friend count
    const friendsCount = currentUser.friends.length;
    if (friendsCount === 0) {
        // For demo, let's say they already posted once
        // setPostLimitReached(userPostsToday >= 0); // This would be complex to track without a backend
    } else if (friendsCount >= 1 && friendsCount <=2 ) {
        // setPostLimitReached(userPostsToday >= 2);
    } else {
        // friendsCount >= 10 implies unlimited, so never limit.
        setPostLimitReached(false); 
    }
  }, [currentUser]);


  const handleNewPost = (newPost: FeedPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  if (!mounted) {
      return (
          <AppLayout>
               <div className="max-w-2xl mx-auto">
                <Card className="mb-8 shadow-lg animate-pulse">
                    <CardHeader><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader>
                    <CardContent><div className="h-20 bg-muted rounded"></div></CardContent>
                    <CardFooter className="flex justify-between"><div className="h-10 w-1/4 bg-muted rounded"></div><div className="h-10 w-1/5 bg-muted rounded"></div></CardFooter>
                </Card>
                {[1,2,3].map(i => (
                    <Card key={i} className="mb-6 shadow-lg animate-pulse">
                        <CardHeader><div className="flex items-center space-x-3"><div className="h-10 w-10 bg-muted rounded-full"></div><div><div className="h-4 w-24 bg-muted rounded mb-1"></div><div className="h-3 w-16 bg-muted rounded"></div></div></div></CardHeader>
                        <CardContent><div className="h-8 bg-muted rounded mb-3"></div><div className="h-48 bg-muted rounded"></div></CardContent>
                        <CardFooter className="flex justify-around"><div className="h-8 w-16 bg-muted rounded"></div><div className="h-8 w-16 bg-muted rounded"></div><div className="h-8 w-16 bg-muted rounded"></div></CardFooter>
                    </Card>
                ))}
               </div>
          </AppLayout>
      )
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold font-headline text-primary mb-6">Public Feed</h1>
        <CreatePostCard user={currentUser} onPost={handleNewPost} postLimitReached={postLimitReached}/>
        {posts.length > 0 ? (
          posts.map(post => <FeedPostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-muted-foreground py-8">No posts in the feed yet. Be the first!</p>
        )}
      </div>
    </AppLayout>
  );
}
