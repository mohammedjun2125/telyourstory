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

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link href="/write">
                                <Button size="sm" className="hidden md:flex rounded-full gap-2 shadow-lg shadow-primary/20">
                                    <PenTool className="size-4" />
                                    Write Story
                                </Button>
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="size-9 cursor-pointer border border-border hover:border-primary transition-colors">
                                        <AvatarImage src={user.photoURL || ""} />
                                        <AvatarFallback>{user.displayName?.[0] || user.email?.[0] || "U"}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href="/write">
                                        <DropdownMenuItem className="md:hidden">
                                            <PenTool className="mr-2 size-4" />
                                            Write Story
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => logout()}>
                                        <LogOut className="mr-2 size-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
