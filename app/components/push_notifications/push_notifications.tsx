"use client"

import { useEffect } from "react"
import OneSignal from 'react-onesignal';

export default function PushNotifications() {
    useEffect(() => {
        const initOneSignal = async () => {
            // we avoid server error. This code should only be executed in browser
            if (typeof window !== "undefined") {
                await OneSignal.init({
                    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID ?? "",
                })

                // appear the notification panel
                OneSignal.Slidedown.promptPush()
            }
        }
        initOneSignal()
    }, [])

    return null
}