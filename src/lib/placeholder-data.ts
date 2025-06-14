import type { Question, User, Tag, LanguageOption } from '@/types';

export const placeholderUser: User = {
  id: 'user1',
  username: 'DevNinja',
  avatarUrl: 'https://placehold.co/100x100.png',
  bio: 'Coding enthusiast, JavaScript lover, and lifelong learner.',
  reputation: 1250,
  badges: ['Code Master', 'Top Answerer'],
  friends: ['user2', 'user3'],
};

export const placeholderUser2: User = {
  id: 'user2',
  username: 'ReactGuru',
  avatarUrl: 'https://placehold.co/100x100.png',
  bio: 'Expert in React and Next.js.',
  reputation: 2500,
  badges: ['React Pro', 'Helpful User'],
  friends: ['user1'],
};

export const placeholderTags: Tag[] = [
  { id: 'tag1', name: 'javascript' },
  { id: 'tag2', name: 'react' },
  { id: 'tag3', name: 'nextjs' },
  { id: 'tag4', name: 'typescript' },
  { id: 'tag5', name: 'tailwindcss' },
];

export const placeholderQuestions: Question[] = [
  {
    id: 'q1',
    title: 'How to use useEffect in React for data fetching?',
    body: 'I am trying to fetch data from an API when my component mounts. What is the correct way to use `useEffect` for this purpose? I also need to handle loading and error states.\n\n```javascript\nfunction MyComponent() {\n  // ...\n}\n```\n\nAny help would be appreciated!',
    tags: [placeholderTags[0], placeholderTags[1]],
    author: placeholderUser,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    upvotes: 150,
    downvotes: 5,
    answersCount: 3,
    views: 1200,
  },
  {
    id: 'q2',
    title: 'Best practices for state management in large Next.js applications?',
    body: 'Our Next.js application is growing, and managing state is becoming complex. We are considering options like Zustand, Redux Toolkit, or React Context. What are the pros and cons of each in the context of Next.js, especially with App Router and Server Components?',
    tags: [placeholderTags[2], placeholderTags[1], placeholderTags[3]],
    author: placeholderUser2,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    upvotes: 280,
    downvotes: 2,
    answersCount: 5,
    views: 2500,
  },
  {
    id: 'q3',
    title: 'How to optimize images in Next.js using next/image?',
    body: 'I want to improve the performance of my Next.js site by optimizing images. Can someone explain the key features of `next/image` and how to use them effectively for different scenarios like local images, remote images, and responsive sizes?',
    tags: [placeholderTags[2]],
    author: placeholderUser,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    upvotes: 95,
    downvotes: 1,
    answersCount: 2,
    views: 800,
  },
];

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English (US)' },
  { code: 'fr', name: 'Français (French)', requiresEmailOtp: true },
  { code: 'hi', name: 'हिन्दी (Hindi)', requiresMobileOtp: true },
  { code: 'es', name: 'Español (Spanish)', requiresMobileOtp: true },
  { code: 'zh', name: '中文 (Chinese)', requiresMobileOtp: true },
  { code: 'pt', name: 'Português (Portuguese)', requiresMobileOtp: true },
];
