import Link from "next/link";
import type { Metadata } from "next";
import { getPopularShows } from "@/services/tmdb/endpoints";
import { MediaGrid } from "@/components/MediaGrid";

export const metadata: Metadata = {
    title: "Movie Index - Shows",
    description: "Browse popular TV shows powered by TMDB.",
};

export default async function ShowsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    searchParams = await searchParams || {};

    const page = parseInt(searchParams.page ?? "1", 10);
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;

    const data = await getPopularShows(safePage);

    return (
        <main className="container stack-24">
        <h1 className="page-title">Shows - Page {safePage}</h1>

        <section className="card">
            <MediaGrid
                heading=""
                kind="show"
                items={data.results ?? []}
                limit={20}
            />
        </section>

        <nav className="pager">
            {safePage > 1 ? (
            <Link href={`/shows?page=${safePage - 1}`}>← Prev</Link>
            ) : (
            <span className="muted">← Prev</span>
            )}
            <Link href={`/shows?page=${safePage + 1}`}>Next →</Link>
        </nav>
        </main>
    );
}
