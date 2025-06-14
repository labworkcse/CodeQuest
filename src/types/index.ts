
export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  reputation: number;
  badges: string[];
  friends: string[]; // Array of user IDs
}

export interface Tag {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  title: string;
  body: string; // Markdown content
  tags: Tag[];
  author: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  upvotes: number;
  downvotes: number;
  answersCount: number;
  views: number;
}

export interface Answer {
  id: string;
  body: string; // Markdown content
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  isAccepted?: boolean;
}

export interface Comment {
  id: string;
  body: string;
  author: User;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  author: User;
  caption?: string;
  mediaUrl?: string; // URL for image or video
  mediaType?: 'image' | 'video';
  createdAt: string;
  likes: number;
  shares: number;
  commentsCount: number;
}

export type LanguageOption = {
  code: string;
  name: string;
  requiresEmailOtp?: boolean;
  requiresMobileOtp?: boolean;
};
