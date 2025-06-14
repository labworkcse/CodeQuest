import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Tag } from "@/types";

interface TagBadgeProps {
  tag: Tag;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  return (
    <Link href={`/tags/${tag.name.toLowerCase()}`} passHref>
      <Badge 
        variant="secondary" 
        className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
        aria-label={`View questions tagged with ${tag.name}`}
      >
        {tag.name}
      </Badge>
    </Link>
  );
};

export default TagBadge;
