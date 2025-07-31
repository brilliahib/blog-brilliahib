import { Blog } from "@/types/blog/blog";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { buildFromAppURL } from "@/utils/misc";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface CardTopBlogProps {
  data?: Blog[];
  isLoading?: boolean;
}

export default function CardTopBlog({ data, isLoading }: CardTopBlogProps) {
  const blog = data?.[0];

  if (isLoading) {
    return (
      <div className="bg-muted rounded-xl aspect-square sm:aspect-[3/1] lg:aspect-[4/1] overflow-hidden relative">
        <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-end">
          <div className="w-full sm:w-8/12 space-y-3 sm:space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div
        className="bg-white rounded-xl aspect-square sm:aspect-[3/1] lg:aspect-[4/1] bg-cover bg-no-repeat bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${buildFromAppURL(blog.image)})` }}
      >
        <div className="absolute inset-0 bg-black/30 p-4 lg:p-8 flex flex-col justify-end">
          <div className="w-full sm:w-8/12">
            <div className="space-y-3 sm:space-y-4">
              <Badge className="rounded-full px-4 text-sm font-semibold">
                {blog.category.name}
              </Badge>
              <div className="font-jkt font-bold text-2xl lg:text-3xl text-white">
                {blog.title}
              </div>
              <div className="font-medium text-sm text-white">
                {format(new Date(blog.created_at), "dd MMM yyyy", {
                  locale: id,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
