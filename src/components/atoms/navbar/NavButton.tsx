import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NavButton() {
  return (
    <>
      <div className="flex items-center">
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2 rounded-full border text-muted-foreground bg-white py-2 text-sm font-medium"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="hidden sm:inline">Cari Artikel</span>
        </Button>
      </div>
    </>
  );
}
