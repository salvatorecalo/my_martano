"use client"
import dynamic from "next/dynamic";

export const ActiveReminderButton = dynamic(
  () => import("../active_reminder_button/active_reminder_button").then(mod => mod.ActiveReminderButton),
  { ssr: false }
);