import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Movie Index",
    description: "A clean index of movies and TV shows powered by TMDB",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body className="antialiased">
                <header className="site-header">
                <nav className="site-nav">
                    <Link className="brand" href="/">
                        Movie Index
                    </Link>
                    <Link className="nav-link" href="/movies">
                        Movies
                    </Link>
                    <Link className="nav-link" href="/shows">
                        Shows
                    </Link>
                </nav>
                </header>

                {children}
            </body>
        </html>
    );
}
