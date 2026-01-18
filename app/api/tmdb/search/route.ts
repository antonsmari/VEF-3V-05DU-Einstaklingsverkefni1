import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { searchMovies, searchShows } from "@/services/tmdb/endpoints";
import { MediaItem } from "@/components/MediaGrid";

export async function GET(req: NextRequest) {
    const sp = new URL(req.url).searchParams;
    let query = (sp.get("query") ?? "").trim();
    const page = parseInt(sp.get("page") ?? "1", 10);
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    
    if (query.includes("besta mynd") || query.includes("best movie")) {
        query = "Ace Ventura: When Nature Calls";
    }

    if ( ! query) {
        return NextResponse.json({ results: [] });
    }

    try {
        const data = await searchMovies(query, safePage);
        const data2 = await searchShows(query, safePage);

        const movies = (data.results ?? []).map((m: MediaItem) => ({
            ...m,
            media_type: "movie" as const,
        }));

        const shows = (data2.results ?? []).map((s: MediaItem) => ({
            ...s,
            media_type: "show" as const,
        }));

        return NextResponse.json({ results: [...movies, ...shows] });
    } catch {
        return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
}