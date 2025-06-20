// src/app/users/[username]/page.tsx
import AppLayout from '@/components/layout/AppLayout';
import { placeholderUser, placeholderQuestions } from '@/lib/placeholder-data';
import type { User, Question } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionList from '@/components/questions/QuestionList';
import { Badge } from '@/components/ui/badge';
import { Star, Users, HelpCircle, Briefcase, Edit3, Mail, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface UserProfilePageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<User | undefined> {
  if (placeholderUser.username.toLowerCase() === username.toLowerCase()) {
    return placeholderUser;
  }
  return undefined; 
}

async function getUserQuestions(userId: string): Promise<Question[]> {
  return placeholderQuestions.filter(q => q.author.id === userId);
}

const mockUserAnswers: Partial<Question>[] = placeholderQuestions.slice(0,1).map(q => ({
    ...q, 
    title: `Answer to: ${q.title}`,
    id: `ans-${q.id}`
}));


export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const user = await getUser(params.username);

  if (!user) {
    return (
      <AppLayout hideSidebars={true}>
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold">User not found</h1>
          <p className="text-muted-foreground">The user profile you are looking for does not exist.</p>
           <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const userQuestions = await getUserQuestions(user.id);
  const userAnswers = mockUserAnswers; 
  const authorInitial = user.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <AppLayout>
      <div className="md:flex md:space-x-6">
        <div className="md:w-1/4 space-y-6 mb-6 md:mb-0">
          <Card className="shadow-lg border-border">
            <CardHeader className="items-center text-center">
              <Avatar className="h-32 w-32 mb-4 border-4 border-primary shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.username} data-ai-hint="profile avatar large"/>
                <AvatarFallback className="text-4xl">{authorInitial}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-headline">{user.username}</CardTitle>
              <CardDescription className="text-primary">{user.reputation} Reputation</CardDescription>
               <Button variant="outline" size="sm" className="mt-2 border-input-border">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardHeader>
            <CardContent className="text-sm">
              {user.bio && <p className="text-muted-foreground mb-4">{user.bio}</p>}
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-primary" />
                  <span>Developer at Tech Solutions</span> 
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                  <a href="#" className="text-blue-600 hover:underline">portfolio.example.com</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <a href={`mailto:${user.username.toLowerCase()}@example.com`} className="text-blue-600 hover:underline">
                    {user.username.toLowerCase()}@example.com
                  </a>
                </div>
              </div>

              <h3 className="font-semibold mt-6 mb-2 text-lg">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map(badgeText => (
                  <Badge key={badgeText} variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" /> {badgeText}
                  </Badge>
                ))}
                {user.badges.length === 0 && <p className="text-xs text-muted-foreground">No badges yet.</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-foreground">
                <Users className="h-5 w-5 mr-2 text-primary" /> Friends ({user.friends.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.friends.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {user.friends.map(friendId => (
                    <li key={friendId} className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${friendId.charAt(0)}`} data-ai-hint="friend avatar"/>
                        <AvatarFallback>{friendId.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Link href={`/users/${friendId.toLowerCase()}`} className="hover:text-primary">{friendId}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No friends yet.</p>
              )}
               <Button variant="outline" size="sm" className="w-full mt-4 border-input-border">View All Friends</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-muted p-1 rounded-md">
              <TabsTrigger value="questions" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><HelpCircle className="h-4 w-4 mr-1.5 hidden sm:inline"/> Questions</TabsTrigger>
              <TabsTrigger value="answers" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Star className="h-4 w-4 mr-1.5 hidden sm:inline"/> Answers</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Briefcase className="h-4 w-4 mr-1.5 hidden sm:inline"/> Activity</TabsTrigger>
               <TabsTrigger value="bookmarks" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Briefcase className="h-4 w-4 mr-1.5 hidden sm:inline"/> Bookmarks</TabsTrigger>
            </TabsList>
            <TabsContent value="questions">
              <Card className="shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Questions Posted ({userQuestions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userQuestions.length > 0 ? <QuestionList questions={userQuestions} /> : <p className="text-muted-foreground">No questions posted yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="answers">
              <Card className="shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Answers Provided ({userAnswers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userAnswers.length > 0 ? <QuestionList questions={userAnswers as Question[]} /> : <p className="text-muted-foreground">No answers provided yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="activity">
              <Card className="shadow-lg border-border">
                <CardHeader><CardTitle className="text-xl text-foreground">Recent Activity</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Activity feed coming soon.</p></CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bookmarks">
              <Card className="shadow-lg border-border">
                <CardHeader><CardTitle className="text-xl text-foreground">Bookmarked Items</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Bookmarks coming soon.</p></CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
