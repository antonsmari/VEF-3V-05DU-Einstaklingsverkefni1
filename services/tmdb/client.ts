const TMDB_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch(path: string, query?: Record<string, string | number | boolean>) {
    const url = new URL(TMDB_URL + path);

    url.searchParams.set("api_key", process.env.TMDB_API_KEY!);

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            url.searchParams.set(key, String(value));
        }
    }

    const res = await fetch(url);
    if ( ! res.ok) {
        throw new Error(`TMDB error ${res.status}`);
    }

    return res.json();
}
