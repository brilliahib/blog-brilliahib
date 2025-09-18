"use client";

import DialogSearchBlog from "@/components/molecules/dialog/DialogSearchBlog";
import { ThemeToggler } from "@/components/theme-toggler";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex items-center md:gap-2">
        <Button
          variant={"secondary"}
          className="text-muted-foreground md:pr-3! flex items-center md:rounded-md rounded-full cursor-pointer"
          onClick={handleOpenDialog}
        >
          <Search className="md:mr-1" />

          <span className="hidden md:inline-flex items-center gap-2">
            Search blog…
            <div className="flex gap-1">
              <Badge
                variant={"outline"}
                className="dark:bg-black/50 text-muted-foreground"
              >
                Ctrl
              </Badge>
              <Badge
                variant={"outline"}
                className="dark:bg-black/50 text-muted-foreground"
              >
                K
              </Badge>
            </div>
          </span>
        </Button>

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <ThemeToggler />
      </div>
      <DialogSearchBlog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}
