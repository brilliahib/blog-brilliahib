"use client";

import CardListSearchBlog from "@/components/atoms/card/CardListSearchBlog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetSearchBlog } from "@/http/blog/get-search-blog";
import { Search } from "lucide-react";
import { useState } from "react";

interface DialogSearchBlogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogSearchBlog({
  open,
  setOpen,
}: DialogSearchBlogProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending } = useGetSearchBlog(
    { q: debouncedSearch },
    { enabled: !!debouncedSearch }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-3 rounded-xl">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search blog..."
            className="pl-10 text-sm md:h-10 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {debouncedSearch && (
          <>
            <ScrollArea className="md:max-h-[600px] max-h-[400px]">
              <CardListSearchBlog
                data={data?.data}
                isLoading={isPending}
                onCardClick={() => setOpen(false)}
              />
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
