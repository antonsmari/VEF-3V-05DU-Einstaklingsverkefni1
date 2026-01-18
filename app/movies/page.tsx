import Link from "next/link";
import { getPopularMovies } from "@/services/tmdb/endpoints";
import { MediaItem, MediaGrid } from "@/components/MediaGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Movie Index - Movies",
    description: "Browse popular TV shows powered by TMDB.",
};

export default async function MoviesPage({ searchParams }: { searchParams: { page?: string }; }) {
    searchParams = await searchParams || {};

    const page = parseInt(searchParams.page ?? "1", 10);
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;

    const data = await getPopularMovies(safePage);

    return (
        <main className="container stack-24">
            <h1 className="page-title">Movies - Page {safePage}</h1>

            <section className="card">
                <MediaGrid
                    heading=""
                    kind="movie"
                    items={data.results ?? []}
                    limit={20}
                />
            </section>

            <nav className="pager">
                {safePage > 1 ? (
                    <Link href={`/movies?page=${safePage - 1}`}>← Prev</Link>
                ) : (
                    <span style={{ opacity: 0.5 }}>← Prev</span>
                )}
                <Link href={`/movies?page=${safePage + 1}`}>Next →</Link>
            </nav>
        </main>
    );
}
