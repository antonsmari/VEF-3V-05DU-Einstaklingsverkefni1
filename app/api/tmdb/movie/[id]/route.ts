import { NextResponse } from "next/server";
import { getMovieById } from "@/services/tmdb/endpoints";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);

    if ( ! Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        const data = await getMovieById(id);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
}