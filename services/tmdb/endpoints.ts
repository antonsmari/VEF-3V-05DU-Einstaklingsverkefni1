import { tmdbFetch } from "./client";

export function getPopularMovies(page = 1) {
    return tmdbFetch("/movie/popular", {
        language: "en-US",
        page,
    });
}

export function getMovieById(id: number) {
    return tmdbFetch(`/movie/${id}`, {
        language: "en-US",
        append_to_response: "credits,videos,images",
    });
}

export function searchMovies(query: string, page = 1) {
    return tmdbFetch("/search/movie", {
        query,
        page,
        language: "en-US",
        include_adult: false,
    });
}

export function getPopularShows(page = 1) {
    return tmdbFetch("/tv/popular", { page, language: "en-US" });
}

export function getShowById(id: number) {
    return tmdbFetch(`/tv/${id}`, {
        language: "en-US",
        append_to_response: "credits,videos,images",
    });
}

export function searchShows(query: string, page = 1) {
    return tmdbFetch("/search/tv", {
        query,
        page,
        language: "en-US",
        include_adult: false,
    });
}
