import { urlBase64ToUint8Array } from "@/app/(utils)/functions/"
import { Dispatch, SetStateAction } from "react"

export function useActiveReminderButton(setUpdatedPermission: Dispatch<SetStateAction<NotificationPermission | null>>){
    const activePush = async () => {
        // register the service worker
        const reg = await navigator.serviceWorker.register("/sw.js")

        // send the local notification to ask permission
        const permission = await Notification.requestPermission()
        if (permission !== "granted") return alert("Permesso negato")
        setUpdatedPermission(permission)
        // we generate the subscription
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
        })

        await fetch("/api/save-subscription", {
            method: "POST",
            body: JSON.stringify(sub)
        });
        
        alert("Notifiche attivate con successo!");
    }

    return {
        activePush
    }
}