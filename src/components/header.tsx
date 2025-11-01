"use client";

import { Activity, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-sm"
          : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Activity className="h-6 w-6 text-primary" />
          <span>DataPulse</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="border-b pb-6">
                 <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                      <Activity className="h-6 w-6 text-primary" />
                      <span>DataPulse</span>
                    </Link>
                 </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                 <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                            <Link
                                href={item.href}
                                className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                            >
                                {item.name}
                            </Link>
                        </SheetClose>
                    ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
