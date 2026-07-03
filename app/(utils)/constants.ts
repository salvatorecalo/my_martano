export const TRASH_ROUTINE_URL: string = "https://www.gema-spa.com/comuni/martano/"
export const GIORNI_VALIDI: string[] = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"]
export const GIORNI_COMPLETI_VALIDI: string[] = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"]

export interface CalendarItem {
    material: string;
    days: string;
}

export const CALENDARIO_MARTANO: CalendarItem[] = [
    { material: "Organico", days: "LUN" },
    { material: "Plastica e Metalli", days: "MAR" },
    { material: "Carta e Cartone", days: "MER" },
    { material: "Organico e Vetro", days: "GIO" },
    { material: "Secco", days: "VEN" },
    { material: "Organico", days: "SAB" }
];