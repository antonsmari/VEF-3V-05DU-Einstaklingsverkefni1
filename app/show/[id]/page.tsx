import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getShowById } from "@/services/tmdb/endpoints";

function tmdbPosterUrl(
    path: string,
    size: "w342" | "w500" | "original" = "w500"
) {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

type Genre = { id: number; name: string };

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const id = parseInt(params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return { title: "Show - Not found" };

    try {
        const show = await getShowById(id);
        return {
        title: `Movie Index - ${show.name ?? "Show"}`,
        description: show.overview || "TV show details powered by TMDB.",
        };
    } catch {
        return { title: "Show - Not found" };
    }
}

export default async function ShowPage({
    params,
}: {
    params: { id: string };
}) {
    params = await params ?? {};

    const id = parseInt(params.id, 10);
    if (!Number.isInteger(id) || id <= 0) notFound();

    let show;
    try {
        show = await getShowById(id);
    } catch {
        notFound();
    }

    const date = show.first_air_date ?? "Unknown first air date";
    const seasons = typeof show.number_of_seasons === "number" ? show.number_of_seasons : null;
    const episodes = typeof show.number_of_episodes === "number" ? show.number_of_episodes : null;

    const runtime =
        Array.isArray(show.episode_run_time) && show.episode_run_time.length
        ? show.episode_run_time[0]
        : null;

    return (
        <main className="container stack-24">
        <section className="card movie-detail">
            <div className="movie-layout">
            {/* Poster */}
            <div className="movie-poster">
                {show.poster_path ? (
                <Image
                    src={tmdbPosterUrl(show.poster_path)}
                    alt={show.name ?? "Show poster"}
                    fill
                    sizes="(max-width: 900px) 40vw, 260px"
                    style={{ objectFit: "cover" }}
                    priority
                />
                ) : (
                <div className="media-fallback">No poster</div>
                )}
            </div>

            {/* Info */}
            <div className="movie-info stack-12">
                <h1>{show.name}</h1>

                <div className="muted">
                    {date}
                    {runtime ? ` • ~${runtime} min/ep` : null}
                    {seasons !== null ? ` • ${seasons} season${seasons === 1 ? "" : "s"}` : null}
                    {episodes !== null ? ` • ${episodes} episode${episodes === 1 ? "" : "s"}` : null}
                </div>

                {show.genres?.length ? (
                <div className="movie-genres">
                    {show.genres.map((g: Genre) => (
                    <span key={g.id} className="genre-chip">
                        {g.name}
                    </span>
                    ))}
                </div>
                ) : null}

                <p>{show.overview || "No description available."}</p>
            </div>
            </div>
        </section>
        </main>
    );
}
