"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { collection, query, orderBy, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";

type Story = DocumentData & {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    createdAt: any;
    color?: string;
};

const categories = ["All", "Life", "Adventure", "Career", "Family"];

const getRandomColor = () => {
    const gradients = [
        "from-emerald-500/20 to-teal-500/20",
        "from-blue-500/20 to-indigo-500/20",
        "from-amber-500/20 to-orange-500/20",
        "from-rose-500/20 to-pink-500/20",
        "from-indigo-500/20 to-violet-500/20",
        "from-sky-500/20 to-cyan-500/20"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

export default function ExplorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedStories: Story[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedStories.push({
                        id: doc.id,
                        ...doc.data(),
                        color: getRandomColor()
                    } as Story);
                });
                setStories(fetchedStories);
            } catch (error) {
                console.error("Error fetching stories: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    const filteredStories = stories.filter(story => {
        const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
        const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-12 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Explore Stories</h1>
                    <p className="text-muted-foreground">Discover lives lived and lessons learned.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search stories..."
                        className="pl-9 bg-secondary/50 border-transparent focus:bg-background transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="size-8 animate-spin text-primary" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredStories.map((story) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={story.id}
                            >
                                <Link href={`/story/${story.id}`}>
                                    <Card className="h-full border-none bg-secondary/20 hover:bg-secondary/40 transition-colors group overflow-hidden">
                                        <div className={`h-40 w-full bg-gradient-to-br ${story.color} relative overflow-hidden`}>
                                            {story.image ? (
                                                <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                            ) : (
                                                <div className="absolute inset-0 bg-black/5" />
                                            )}
                                            <div className="absolute bottom-4 left-4 z-10">
                                                <span className="text-xs font-bold uppercase tracking-wider bg-black/20 text-white px-2 py-1 rounded backdrop-blur-sm">
                                                    {story.category}
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {story.excerpt}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4 mt-auto">
                                            <span>{story.author}</span>
                                            {story.createdAt?.seconds ? (
                                                <span>{format(new Date(story.createdAt.seconds * 1000), 'MMM d, yyyy')}</span>
                                            ) : (
                                                <span>Just now</span>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {!loading && filteredStories.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No stories found matching your criteria.</p>
                </div>
            )}

        </div>
    );
}
