"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, BookOpen, PenTool, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />

        <motion.div
          className="text-center max-w-4xl space-y-6"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            <span>The Future of Biography</span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Tell Your Story, <br />
            <span className="text-gradient">Leave a Legacy.</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A premium platform to write, curate, and share your life's most meaningful moments. Turn your memories into a timeless digital biography.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/write">
              <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Start Writing
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 glass hover:bg-white/10">
                Explore Stories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to preserve your legacy.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: PenTool, title: "Write", desc: "Use our distraction-free editor to draft your chapters." },
            { icon: BookOpen, title: "Curate", desc: "Add photos, choose themes, and organize your timeline." },
            { icon: Share2, title: "Share", desc: "Publish your story to the world or keep it private." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none bg-secondary/50 hover:bg-secondary/80 transition-colors">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Stories Preview */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Featured Stories</h2>
          <Link href="/explore" className="text-primary hover:underline">View all</Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link key={i} href={`/story/${i}`}>
              <Card className="group h-full overflow-hidden border-none bg-secondary/30 hover:bg-secondary/50 transition-all hover:scale-[1.02]">
                <div className="h-48 bg-muted w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {/* Placeholder for story image */}
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1">Adventure</p>
                    <h3 className="font-bold text-lg">The Mountain's Call</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    A journey through the Swiss Alps that changed my perspective on life forever.
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/20" />
                  <span className="text-xs font-medium">Alex Rover</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container max-w-4xl mx-auto px-4 text-center py-20">
        <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden glass border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 -z-10" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to tell your story?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of storytellers who are archiving their lives for future generations.
          </p>
          <Link href="/write">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
