import { NextResponse } from "next/server";
import { getPopularMovies } from "@/services/tmdb/endpoints";

export async function GET(req: Request) {
    const page = parseInt(new URL(req.url).searchParams.get("page") ?? "1", 10);
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;

    try {
        const data = await getPopularMovies(safePage);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
}
