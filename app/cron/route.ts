import { NextResponse } from "next/server"
import { fetchTrashRoutine } from "../(utils)/server_functions";
import { GIORNI_COMPLETI_VALIDI } from "../(utils)/constants";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization")
    const isVercelCron = request.headers.get("x-vercel-cron") === "1"
    const hasValidBearerToken = authHeader === `Bearer ${process.env.CRON_SECRET}`

    if (!isVercelCron && !hasValidBearerToken) {
        return new NextResponse('Access not authorized', { status: 401 });
    }

    try {
        const now = new Date()
        const romeTimeString = now.toLocaleString("en-US", { timeZone: "Europe/Rome" })
        const todayIndex = new Date(romeTimeString).getDay()
        const tomorrowIndex = (todayIndex + 1) % 7;
        const tomorrowDay = GIORNI_COMPLETI_VALIDI[tomorrowIndex]
        const calendar = await fetchTrashRoutine()
        const tomorrowTrash = calendar?.filter(
            (item) => tomorrowDay.includes(item.days.toLowerCase().trim())
        )

        if (tomorrowTrash.length === 0) {
            return NextResponse.json({ message: "Niente da esporre domani", status: 200 });
        }

        const materialiDaEsporre = tomorrowTrash.map(t => t.material).join(" e ");
        const response = await fetch(
            "https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
            },
            body: JSON.stringify({
                app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID, 
                included_segments: ["Total Subscriptions"],
                headings: { it: "🗑️ Promemoria Spazzatura" },
                contents: { it: `Domani è ${tomorrowDay}. Il materiale da esporre è: ${materialiDaEsporre}` }
            })
        })

        if (!response.ok) {
            const error = await response.json();
            console.error("Errore OneSignal:", error);
            return NextResponse.json({ error: "Errore nell'invio della notifica" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Notifiche mandate a OneSignal con successo!" });

    } catch (e) {
        console.error("Errore Cron:", e);
        return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }
}