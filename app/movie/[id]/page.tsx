import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieById } from "@/services/tmdb/endpoints";
import type { Metadata } from "next";

function tmdbPosterUrl(
  path: string,
  size: "w342" | "w500" | "original" = "w500"
) {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

type Genre = {
    id: number;
    name: string;
}

export const metadata: Metadata = {
    title: "Movie Index - Movie Details",
    description: "Browse popular TV shows powered by TMDB.",
};

export default async function MoviePage({
    params,
}: {
    params: { id: string };
}) {
    params = await params ?? {};

    const id = parseInt(params.id, 10);
    if ( ! Number.isInteger(id) || id <= 0) {
        notFound();
    }

    let movie;
    try {
        movie = await getMovieById(id);
    } catch {
        notFound();
    }

    return (
        <main className="container stack-24">
            <section className="card movie-detail">
                <div className="movie-layout">
                    {/* Poster */}
                    <div className="movie-poster">
                        {movie.poster_path ? (
                        <Image
                            src={tmdbPosterUrl(movie.poster_path)}
                            alt={movie.title}
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
                        <h1>{movie.title}</h1>

                        <div className="muted">
                        {movie.release_date ?? "Unknown release"}
                        {movie.runtime ? ` • ${movie.runtime} min` : null}
                        </div>

                        {movie.genres?.length ? (
                        <div className="movie-genres">
                            {movie.genres.map((g: Genre) => (
                            <span key={g.id} className="genre-chip">
                                {g.name}
                            </span>
                            ))}
                        </div>
                        ) : null}

                        <p>{movie.overview || "No description available."}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
