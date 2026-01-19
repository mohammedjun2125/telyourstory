"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/explore", label: "Explore", icon: Library },
        { href: "/about", label: "About", icon: null },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-primary/50 transition-shadow">
                        t
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden md:block">
                        telyourstory
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 px-2 py-1.5 rounded-full shadow-lg">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href
                                    ? "bg-white/10 text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Link href="/write">
                        <Button variant="default" size="sm" className="gap-2 shadow-lg shadow-primary/20">
                            <PenTool className="size-4" />
                            <span className="hidden md:inline">Write Story</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
