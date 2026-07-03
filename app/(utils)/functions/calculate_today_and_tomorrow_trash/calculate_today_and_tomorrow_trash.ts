import { CALENDARIO_MARTANO } from "../../constants";

export interface ThrowObjects {
    todayMaterial: string,
    tomorrowMaterial: string
}

export async function calculateTodayAndTomorrowTrash() {
    const now = new Date()
    const romeTimeString = now.toLocaleString("en-US", { timeZone: "Europe/Rome" })
    const jsToday = new Date(romeTimeString).getDay()
    let todayIndex = -1;
    let tomorrowIndex = -1;

    if (jsToday === 0) {
        // today is sunday no one will take out our rubbish so we don't touch todayIndex that rest to unknow value (-1)
        tomorrowIndex = 0;
    } else {
        todayIndex = jsToday - 1;
        tomorrowIndex = (todayIndex + 1) % 7
    }

    const objThrows: ThrowObjects = {
        todayMaterial:  CALENDARIO_MARTANO[todayIndex].material,
        tomorrowMaterial:  CALENDARIO_MARTANO[tomorrowIndex].material,
    }

    return objThrows
}