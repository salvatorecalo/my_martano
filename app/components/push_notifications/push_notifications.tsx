"use client"

import { useEffect, useState } from "react"
import OneSignal from 'react-onesignal';

export default function PushNotifications() {
    const [hasUserDeniedPermission, setHasUserDeniedPermission] = useState<boolean>(false);
    useEffect(() => {
        const initOneSignal = async () => {
            // we avoid server error. This code should only be executed in browser
            if (typeof window !== "undefined") {
                await OneSignal.init({
                    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID ?? "",
                })

                const hasPermission: boolean = OneSignal.Notifications.permission
                if (!hasPermission) {
                    setHasUserDeniedPermission(true)
                } else {
                    // appear the notification panel
                    OneSignal.Slidedown.promptPush()
                }
            }
        }
        initOneSignal()
    }, [])

    if (hasUserDeniedPermission) {
        return (
            <div className="alert-permission">
                <p>Le notifiche sono disattivate. Per ricevere i promemoria, devi attivarle dalle impostazioni del browser.</p>
                <button onClick={() => OneSignal.Slidedown.promptPush()}>Attiva notifiche</button>
            </div>
        );
    }

    return null
}