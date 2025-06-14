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
        variant="outline" // Changed from secondary for SO look
        className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300 text-xs font-normal px-1.5 py-0.5"
        aria-label={`View questions tagged with ${tag.name}`}
      >
        {tag.name}
      </Badge>
    </Link>
  );
};

export default TagBadge;
