'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag as TagIcon, Briefcase, Users, Building, BadgeHelp, MessageSquare, BookOpen } from 'lucide-react'; // Using BadgeHelp for Challenges
import { Button } from '@/components/ui/button';

const mainNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/questions', label: 'Questions', icon: Briefcase }, // Using Briefcase as Q icon
  { href: '/tags', label: 'Tags', icon: TagIcon },
];

const secondaryNavItems = [
  { href: '/users', label: 'Users', icon: Users },
  { href: '/companies', label: 'Companies', icon: Building },
];

const communityNavItems = [
    { href: '/challenges', label: 'Challenges', icon: BadgeHelp, new: true },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/articles', label: 'Articles', icon: BookOpen },
];


const LeftSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:block w-48 xl:w-56 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-sidebar-border py-6 pr-4">
      <nav className="flex flex-col space-y-1">
        {mainNavItems.map(item => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${isActive(item.href)
                ? 'bg-sidebar-active text-sidebar-active-foreground border-l-4 border-primary font-semibold' 
                : 'text-sidebar-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'}`} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-sidebar-border">
         <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Public</h3>
        <nav className="flex flex-col space-y-1">
          {communityNavItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors
                ${isActive(item.href)
                  ? 'bg-sidebar-active text-sidebar-active-foreground font-semibold' 
                  : 'text-sidebar-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
            >
              <div className="flex items-center">
                <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'}`} />
                {item.label}
              </div>
              {item.new && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">NEW</span>}
            </Link>
          ))}
          {secondaryNavItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors
                ${isActive(item.href)
                  ? 'bg-sidebar-active text-sidebar-active-foreground font-semibold' 
                  : 'text-sidebar-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'}`} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-6 pt-6 border-t border-sidebar-border">
        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex justify-between items-center">
          Collectives
          <span className="text-primary font-bold cursor-pointer">+</span>
        </h3>
        <p className="px-3 text-xs text-muted-foreground mb-2">Communities for your favorite technologies.</p>
        <Link href="#" className="px-3 text-xs text-primary hover:underline">Explore all Collectives</Link>
      </div>

      <div className="mt-6 pt-6 border-t border-sidebar-border">
         <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Teams</h3>
         <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-xs text-orange-700 mb-2">
                <strong>CodeQuest for Teams</strong> – Ask questions, find answers and collaborate at work with Stack Overflow for Teams.
            </p>
            <Button variant="default" size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-8 text-xs">
                Try Teams for free
            </Button>
         </div>
      </div>

    </aside>
  );
};

export default LeftSidebar;
