"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Cloud, CloudOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function WritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const router = useRouter();

    const handlePublish = async () => {
        if (!title || !content) return;

        setIsPublishing(true);
        try {
            await addDoc(collection(db, "stories"), {
                title,
                content,
                author: "Anonymous", // TODO: Auth
                excerpt: content.substring(0, 150) + "...",
                category: "Life", // TODO: Category selector
                createdAt: serverTimestamp(),
                tags: ["New", "Story"] // TODO: Tag selector
            });

            // Redirect to explore after publish
            router.push("/explore");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to publish story. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">

            {/* Editor Header */}
            <header className="border-b border-border bg-background/50 backdrop-blur sticky top-0 z-40 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="size-5" />
                        </Button>
                    </Link>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="flex items-center gap-1.5">
                            {title || content ? <Cloud className="size-3" /> : <CloudOff className="size-3" />}
                            {title || content ? "Draft" : "Empty"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Category: Life</Button>
                    <Button size="sm" className="gap-2" onClick={handlePublish} disabled={isPublishing || !title || !content}>
                        {isPublishing ? <Loader2 className="size-4 animate-spin" /> : "Publish Story"}
                    </Button>
                </div>
            </header>

            {/* Editor Workspace */}
            <main className="flex-1 container max-w-3xl mx-auto py-12 px-4">
                <Input
                    className="text-4xl md:text-5xl font-bold border-none shadow-none px-0 h-auto placeholder:text-muted-foreground/30 focus-visible:ring-0 bg-transparent mb-8"
                    placeholder="Your Title Here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full h-[60vh] resize-none bg-transparent border-none focus:outline-none text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/30"
                    placeholder="Tell your story..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </main>
        </div>
    );
}
