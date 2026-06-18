import { NextResponse } from "next/server"
import webpush from "web-push"
import { fetchTrashRoutine } from "../../fetch_trash_routine/fetch_trash_routine"
import { Redis } from "@upstash/redis"
import { WebPushSubscription } from "./interface/web_push_subscription/web_push_subscription"

/*
    Vapid protocol, if we don't put it apple and google servers will reject
    our push request:
    - mailto: google and amazon will use it to contact us for problems
    - NEXT_PUBLIC_VAPID_PUBLIC_KEY: it's the public key and it allow us to
      tell google to send to the phone of our user only messages from who has
      the private key
    - VAPID_PRIVATE_KEY: vercel server use it to sign its messages
*/
webpush.setVapidDetails(
    "mailto:salvacalo.04@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

// create the redis instance
const redis = Redis.fromEnv()

export async function GET(request: Request){
    // We check that is vercel and not some malicious users 
    const authHeader = request.headers.get("authorization")

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`){
        return new NextResponse(
            'Access not authorized',
            { status: 401 }
        )
    }

    try {
        // sunday needs to be the first since javascript getDay starts counting by Sunday
        const daysOfWeek = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"]
        const tomorrowIndex = (new Date().getDay() + 1) % 6
        const tomorrowDay = daysOfWeek[tomorrowIndex]

        const calendar = await fetchTrashRoutine()
        const tomorrowTrash = calendar?.find(
            (item) => item.days.toLowerCase().trim() === tomorrowDay
        )

        if (!tomorrowTrash) {
            return NextResponse.json({
                message: "No trash found for tomorrow",
                status: 402
            })
        }
        
        const userSubscription = await redis.lrange<WebPushSubscription>("trash_subs", 0, -1)

        if (!userSubscription || userSubscription.length === 0){
            return new NextResponse("No user is subscribed", {
                status: 403
            })
        }

        const notificationPayload = JSON.stringify({
            title: "🗑️ Ricordati di uscire la spazzatura!",
            body: `Domani è ${tomorrowDay}. Il materiale da esporre è: ${tomorrowTrash.material.toUpperCase()}`,
            icon: "/trash.png"
        })

        const deliveryPromises = userSubscription.map((subscription) => {
            return webpush.sendNotification(subscription, notificationPayload).catch(async (err) => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    // remove the first 0 occurences of subscription from trash_subs
                    // count = 0: Remove all elements equal to element.
                    await redis.lrem("trash_subs", 0, subscription);
                }
            })
        })

        await Promise.all(deliveryPromises)

        return NextResponse.json({
            success: true,
            message: `Notification sent to ${userSubscription.length} devices.`
        })
    } catch (e) {
        console.error("Notification cron error:", e);
        return NextResponse.json({ 
            error: "Internal error during push" 
        }, { status: 500 }
    )}
}