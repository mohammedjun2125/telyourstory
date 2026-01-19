"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Heart, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
    { icon: Heart, title: "Emotion First", desc: "Designed to capture the feeling of a moment, not just the facts." },
    { icon: Shield, title: "Privacy Focused", desc: "You own your data. Share only what you want, when you want." },
    { icon: Globe, title: "Universal Access", desc: "Stories that look beautiful on any device, anywhere in the world." },
    { icon: Zap, title: "AI Powered", desc: "Future tools will help you remember details and structure your narrative." }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pb-20">

            {/* Hero */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-primary/20 blur-[120px] rounded-full -z-10" />

                <div className="container max-w-4xl mx-auto text-center space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Preserving Humanity, <br />
                        <span className="text-gradient">One Story at a Time.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                    >
                        We believe that every life is a universe of experiences worth saving.
                        telyourstory is the digital ark for the human experience in the 21st century.
                    </motion.p>
                </div>
            </section>

            {/* Vision */}
            <section className="container max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Why we built this</h2>
                        <div className="space-y-4 text-muted-foreground text-lg">
                            <p>In the age of fleeting social media posts, our deeper stories are getting lost. We wanted to build a sanctuary for long-form expression.</p>
                            <p>A place where you can write without distraction, curate without algorithm pressure, and leave behind something meaningful.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-3"
                            >
                                <feature.icon className="size-8 text-primary" />
                                <h3 className="font-bold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section className="container max-w-4xl mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold mb-12">The Future of Storytelling</h2>
                <div className="relative border-l border-white/10 ml-6 md:ml-0 md:pl-0 space-y-12 text-left">
                    {[
                        { year: "2025 Q3", title: "Voice Narrations", desc: "Record your stories in your own voice." },
                        { year: "2025 Q4", title: "Collaborative Family Trees", desc: "Link stories with family members to build a shared history." },
                        { year: "2026 Q1", title: "Printed Memoirs", desc: "Turn your digital profile into a beautiful hardcover book." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-8 relative">
                            <div className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                            <div className="pl-6 md:pl-12">
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.year}</span>
                                <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container max-w-4xl mx-auto px-4 text-center pb-20">
                <div className="p-12 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-bold">Start Your Legacy Today</h2>
                        <p className="text-primary-foreground/80 max-w-xl mx-auto">
                            It's free to start. No credit card required. Just you and your stories.
                        </p>
                        <Link href="/write">
                            <Button variant="secondary" size="lg" className="rounded-full px-8 h-12">
                                Write Your First Story
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
