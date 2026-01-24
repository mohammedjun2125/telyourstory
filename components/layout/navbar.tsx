"use client";

import { Button } from "@/components/ui/button";
import { PenTool, Share2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/components/auth-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4 rounded-2xl glass shadow-lg pointer-events-auto transition-all">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Share2 className="size-5" />
                    </div>
                    <span className="hidden md:inline">telyourstory</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                        Explore
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <ModeToggle />

                    <Link href="/write">
                        <Button size="sm" className="hidden md:flex rounded-full gap-2 shadow-lg shadow-primary/20">
                            <PenTool className="size-4" />
                            Write Story
                        </Button>
                    </Link>

                    {/* Mobile Write Button */}
                    <Link href="/write">
                        <Button size="icon" variant="ghost" className="md:hidden rounded-full">
                            <PenTool className="size-5" />
                        </Button>
                    </Link>

                    {/* Optional: Keep Login hidden or minimal if user wants to re-enable later, 
                        but for now removing to comply with "remove login system" request fully. */}
                </div>
            </div>
        </nav>
    );
}
