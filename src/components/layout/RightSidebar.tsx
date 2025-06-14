import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, MessageSquareText, AlertTriangle, Award } from 'lucide-react'; // Example icons

const RightSidebar = () => {
  const blogPosts = [
    { title: "Better vibes and vibe coding with Gemini 2.5", icon: Pencil },
    { title: "\"We're not worried about compute anymore\": The future of AI models", icon: Pencil },
  ];

  const metaPosts = [
    { title: "How Can We Bring More Fun to the Stack Ecosystem? Community Ideas Welcome!", icon: MessageSquareText },
    { title: "Thoughts on the future of Stack Exchange site customisation", icon: MessageSquareText },
    { title: "How can I revert the style/layout changes to comments?", icon: AlertTriangle },
    { title: "Policy: Generative AI (e.g., ChatGPT) is banned", icon: AlertTriangle },
    { title: "2025 Community Moderator Election Results", icon: Award },
  ];

  const collectives = [
    { name: "Google Cloud", members: "63k Members", logo: "https://placehold.co/32x32.png?text=G", dataAiHint: "cloud logo" },
    { name: "PHP", members: "45k Members", logo: "https://placehold.co/32x32.png?text=P", dataAiHint: "php logo" },
    // Add more collectives if needed
  ];


  return (
    <aside className="hidden xl:block w-80 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] py-6 pl-6 space-y-6 overflow-y-auto">
      <Card className="shadow-so-card border-border">
        <CardHeader className="bg-orange-50 p-3 border-b border-border">
          <CardTitle className="text-sm font-semibold">The Overflow Blog</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {blogPosts.map((post, index) => (
              <li key={index} className="p-3 text-xs flex items-start space-x-2">
                <post.icon className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                <a href="#" className="hover:text-primary">{post.title}</a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-so-card border-border">
        <CardHeader className="bg-orange-50 p-3 border-b border-border">
          <CardTitle className="text-sm font-semibold">Featured on Meta</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <ul className="divide-y divide-border">
            {metaPosts.map((post, index) => (
              <li key={index} className="p-3 text-xs flex items-start space-x-2">
                <post.icon className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                <a href="#" className="hover:text-primary">{post.title}</a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="shadow-so-card border-border">
        <CardHeader className="p-3 border-b border-border flex flex-row justify-between items-center">
          <CardTitle className="text-sm font-semibold">Collectives</CardTitle>
          <a href="#" className="text-xs text-primary hover:underline">See all</a>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {collectives.map((collective, index) => (
              <li key={index} className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={collective.logo} alt={`${collective.name} logo`} className="h-8 w-8 rounded" data-ai-hint={collective.dataAiHint} />
                  <div>
                    <a href="#" className="text-sm font-medium text-primary hover:underline">{collective.name}</a>
                    <p className="text-xs text-muted-foreground">{collective.members}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7 px-2 border-primary text-primary hover:bg-primary/10">Join</Button>
              </li>
            ))}
          </ul>
          <div className="p-3 text-xs">
             A collective for developers who utilize Google Cloud's infrastructure and platform.
          </div>
        </CardContent>
      </Card>
       {/* Placeholder for Ads or other content */}
       <div className="p-4 border border-dashed border-border rounded-md text-center text-sm text-muted-foreground">
            Ad Placeholder
        </div>
    </aside>
  );
};

export default RightSidebar;
