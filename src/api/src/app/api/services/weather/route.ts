import { NextResponse } from "next/server";

export async function GET() {

    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL;

    try {
        const response = await fetch(`${baseUrl}/current.json?key=${apiKey}&q=auto:ip`);
        if (!response.ok) {
            throw new Error("Erro ao buscar a api");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: "Erro interno ao buscar o clima"},
            {status: 500}
        )
    }
}