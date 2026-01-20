"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Cloud, CloudOff, Loader2, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth-provider";

const categories = ["Life", "Adventure", "Career", "Family", "Love"];

export default function WritePage() {
    const { user, loading } = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Life");
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isPublishing, setIsPublishing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Logic for editing
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    useEffect(() => {
        if (editId && user) {
            const fetchStory = async () => {
                const docRef = doc(db, "stories", editId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.authorId !== user.uid) {
                        alert("You are not authorized to edit this story.");
                        router.push("/explore");
                        return;
                    }
                    setTitle(data.title);
                    setContent(data.content);
                    setCategory(data.category);
                    setImage(data.image);
                } else {
                    alert("Story not found.");
                    router.push("/explore");
                }
            }
            fetchStory();
        }
    }, [editId, user, router]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = async () => {
        if (!title || !content || !user) return;

        setIsPublishing(true);
        try {
            let imageUrl = image;

            if (imageFile) {
                const storageRef = ref(storage, `story-images/${user.uid}/${Date.now()}-${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const storyData = {
                title,
                content,
                author: user.displayName || "Anonymous",
                authorId: user.uid,
                excerpt: content.substring(0, 150) + "...",
                category,
                image: imageUrl, // URL from Firebase Storage
                updatedAt: serverTimestamp(),
                tags: ["Story"]
            };

            if (editId) {
                await updateDoc(doc(db, "stories", editId), storyData);
            } else {
                await addDoc(collection(db, "stories"), {
                    ...storyData,
                    createdAt: serverTimestamp(),
                    tags: ["New"]
                });
            }

            router.push(editId ? `/story/${editId}` : "/explore");
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Failed to save story. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col">

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-32 justify-between">
                                {category} <span className="opacity-50">▾</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {categories.map((c) => (
                                <DropdownMenuItem key={c} onClick={() => setCategory(c)}>
                                    {c}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" className="gap-2" onClick={handlePublish} disabled={isPublishing || !title || !content}>
                        {isPublishing ? <Loader2 className="size-4 animate-spin" /> : (editId ? "Update Story" : "Publish Story")}
                    </Button>
                </div>
            </header>

            <main className="flex-1 container max-w-3xl mx-auto py-12 px-4">
                <div className="mb-8">
                    {image ? (
                        <div className="relative group rounded-xl overflow-hidden border border-border h-64 md:h-96 w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} alt="Cover" className="w-full h-full object-cover" />
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="h-24 w-full border-2 border-dashed border-muted-foreground/20 rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:bg-accent/50 hover:border-muted-foreground/40 transition-all cursor-pointer"
                        >
                            <ImagePlus className="size-5" />
                            <span className="text-sm font-medium">Add Cover Image</span>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>

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
