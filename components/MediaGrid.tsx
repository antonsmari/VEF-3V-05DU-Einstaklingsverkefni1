"use client"

import Link from "next/link";
import Image from "next/image";

export type MediaItem = {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "show";
};

type Props = {
    items: MediaItem[];
    kind?: "movie" | "show";
    heading?: string;
    limit?: number;
};

function tmdbPosterUrl(path: string, size: "w185" | "w342" | "w500" = "w342") {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function MediaGrid({ items, kind, heading, limit }: Props) {
    const shown = limit ? items.slice(0, limit) : items;

    return (
        <section className="stack-12">
        {heading ? <h2 style={{ margin: 0 }}>{heading}</h2> : null}

        <div className="media-grid">
            {shown.map((x) => {
            const title = x.title ?? x.name ?? "Untitled";
            const date = x.release_date ?? x.first_air_date ?? "";
            const k = kind ?? x.media_type ?? "movie";
            const href = k === "movie" ? `/movie/${x.id}` : `/show/${x.id}`;

            return (
                <Link key={x.id} href={href} className="media-card">
                <div className="media-poster">
                    {x.poster_path ? (
                        <Image
                            src={tmdbPosterUrl(x.poster_path)}
                            alt={title}
                            fill
                            sizes="(max-width: 700px) 33vw, (max-width: 1000px) 20vw, 160px"
                            style={{ objectFit: "cover" }}
                            priority={false}
                        />
                    ) : (
                        <div className="media-fallback">No poster</div>
                    )}
                </div>

                <div className="media-meta">
                    <div className="media-title" title={title}>
                        {title}
                    </div>
                    {date ? <div className="media-date">{date}</div> : null}
                </div>
                </Link>
            );
            })}
        </div>
        </section>
    );
}
