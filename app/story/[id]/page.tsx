"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Heart, Share2, Loader2, AlertCircle, ArrowLeft, PenSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function StoryPage() {
    const params = useParams();
    const id = params.id as string;
    const { user } = useAuth();
    const [story, setStory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const docRef = doc(db, "stories", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setStory(docSnap.data());
                } else {
                    setError("Story not found");
                }
            } catch (err) {
                console.error("Error fetching story:", err);
                setError("Failed to load story");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStory();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !story) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <AlertCircle className="size-12 text-destructive" />
                <h1 className="text-2xl font-bold">{error || "Story not found"}</h1>
                <Button asChild><Link href="/explore">Go Back</Link></Button>
            </div>
        );
    }

    const isAuthor = user && story.authorId && user.uid === story.authorId;

    return (
        <article className="min-h-screen pb-20">
            {/* Hero Image */}
            <div className="h-[50vh] w-full bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

                {story.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                    <div className="w-full h-full bg-indigo-900/20 flex items-center justify-center text-white/10 text-9xl font-bold select-none">
                        {story.category?.[0] || "S"}
                    </div>
                )}

                <Link href="/explore" className="absolute top-4 left-4 z-20">
                    <Button variant="outline" size="icon" className="rounded-full bg-background/20 border-white/10 hover:bg-background/40 text-white">
                        <ArrowLeft className="size-5" />
                    </Button>
                </Link>

                {isAuthor && (
                    <Button className="absolute top-4 right-4 z-20 gap-2 rounded-full shadow-xl" asChild>
                        {/* Placeholder for edit functionality - for now it just goes to write page */}
                        <Link href={`/write?id=${id}`}>
                            <PenSquare className="size-4" />
                            Edit Story
                        </Link>
                    </Button>
                )}
            </div>

            <div className="container max-w-4xl mx-auto px-4 -mt-32 relative z-20">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="space-y-6"
                >
                    <div className="flex gap-2 mb-4">
                        {story.category && (
                            <Badge variant="secondary" className="glass border-none text-white bg-primary/80 hover:bg-primary">
                                {story.category}
                            </Badge>
                        )}
                        {story.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="glass border-none text-white bg-white/10 hover:bg-white/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white shadow-black/50 drop-shadow-lg leading-tight">
                        {story.title}
                    </h1>

                    <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                            <Avatar className="size-8 border border-white/20">
                                <AvatarImage src="" />
                                <AvatarFallback>{story.author?.[0] || "A"}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{story.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5 text-sm">
                            <Calendar className="size-4" />
                            {story.createdAt?.seconds ? format(new Date(story.createdAt.seconds * 1000), 'MMM d, yyyy') : 'Just now'}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5 text-sm">
                            <Clock className="size-4" />
                            {Math.ceil(story.content.split(' ').length / 200)} min read
                        </div>
                    </div>
                </motion.div>

                <Card className="mt-12 bg-background/50 backdrop-blur-xl border-white/5 shadow-2xl">
                    <CardContent className="p-8 md:p-12 space-y-8 font-serif leading-relaxed text-lg whitespace-pre-wrap">
                        {story.content}

                        <hr className="my-12 border-border" />

                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Heart className="size-5" />
                                Like Story
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="size-5" />
                                Share
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </article>
    );
}
