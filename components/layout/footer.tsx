import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-8 md:py-12 border-t border-white/5 mt-auto">
            <div className="container max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold">telyourstory</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Build your legacy in the digital age.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:text-foreground transition-colors">
                        About
                    </Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                        Terms
                    </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} telyourstory.
                </p>
            </div>
        </footer>
    );
}
