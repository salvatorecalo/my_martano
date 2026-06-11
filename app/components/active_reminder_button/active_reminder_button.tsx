"use client"
import { useState } from "react";
import { useActiveReminderButton } from "./hook/use_active_reminder_button";

export function ActiveReminderButton() {
    const [updatedPermission, setUpdatedPermission] = useState<NotificationPermission | null>(null)
    const { activePush } = useActiveReminderButton(setUpdatedPermission)

    if (!("Notification" in window)) return null;
    const currentPermission: NotificationPermission = updatedPermission || Notification.permission;

    if (currentPermission === "granted") {
        return (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl font-medium text-center my-6">
                🔔 Notifiche serali attive su questo dispositivo!
            </div>
        );
    }

    if (currentPermission === "denied") {
        return (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl font-medium text-center my-6">
                <p className="font-bold">⚠️ Notifiche bloccate dal browser</p>
                <p className="text-sm mt-1 text-amber-800">
                    Hai disattivato le notifiche per questo sito. Per riattivarle non basta premere il tasto, devi sbloccarle manualmente:
                </p>
                <div className="text-xs text-left bg-white p-3 rounded-lg my-3 border border-amber-100 space-y-1 text-gray-700">
                    <p>1. Clicca sull'icona 🔒 in alto a sinistra accanto all'URL del sito.</p>
                    <p>2. Trova la voce <strong>Notifiche</strong> e sposta la spunta su <strong>Consenti</strong>.</p>
                    <p>3. Ricarica la pagina.</p>
                </div>
            </div>
        );
    }


    return (
        <button
            onClick={activePush}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-colors my-6"
        >Ricevi promemoria ogni sera alle 22</button>
    )
}