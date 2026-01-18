import { MovieSearch } from "@/components/MovieSearch";
import { getPopularMovies } from "@/services/tmdb/endpoints";
import { MediaGrid } from "@/components/MediaGrid";

export default async function HomePage() {
    const popular = await getPopularMovies(1);

    return (
        <main className="container stack-24">
            <div>
                <p className="muted">
                    Search and browse movies powered by... 
                    <img style={{ float: 'right' }} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" width={150} />
                </p>
            </div>

            <section className="card">
                <MovieSearch />
            </section>

            <section className="card">
                <MediaGrid
                    heading="Popular right now"
                    kind="movie"
                    items={popular.results ?? []}
                    limit={15}
                />
            </section>
        </main>
    );
}
