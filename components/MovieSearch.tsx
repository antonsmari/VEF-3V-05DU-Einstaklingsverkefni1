"use client";

import { useRef, useState } from "react";
import { MediaItem, MediaGrid } from "./MediaGrid";

export function MovieSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    console.log("Try searching for the best movie!");

    async function onChange(value: string) {
        setQuery(value);
        setLoading(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(async () => {
            const q = value.trim();
            if ( ! q) {
                setResults([]);
                return;
            }
            try {
                const res = await fetch(
                    `/api/tmdb/search?query=${encodeURIComponent(q)}`
                );
                const data = await res.json();
                setResults(data.results ?? []);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);
    }

    return (
        <section>
        <h2>Search Movies</h2>

        <input id="movie-search" name="movie-search"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type a movie title…"
            autoComplete="off"
        />

        {loading && <p>Loading…</p>}

        <MediaGrid
            heading=""
            items={results ?? []}
            limit={15}
        />
        </section>
    );
}
