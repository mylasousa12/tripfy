import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json(
            {error: "Latitute e longitude são obrigatorias"},
            {status: 400}
        )
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`);
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