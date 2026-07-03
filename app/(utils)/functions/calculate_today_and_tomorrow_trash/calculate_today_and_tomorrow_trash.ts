import { CALENDARIO_MARTANO, GIORNI_VALIDI } from "../../constants";
import { fetchTrashRoutine } from "../../server_functions/fetch_trash_routine/fetch_trash_routine";

export interface ThrowObjects {
    todayMaterials: string[],
    tomorrowMaterials: string[]
}

export async function calculateTodayAndTomorrowTrash() {
    const calendar = await fetchTrashRoutine()
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
    const today: string | null = todayIndex === -1 ? null : GIORNI_VALIDI[todayIndex]
    const tomorrow: string = GIORNI_VALIDI[tomorrowIndex]

    const objThrows: ThrowObjects = {
        todayMaterials: [],
        tomorrowMaterials: [],
    }

    calendar?.forEach((item) => {
        if (today && item.days.includes(today)) {
            objThrows.todayMaterials.push(item.material)
        }
        if (item.days.includes(tomorrow)) {
            objThrows.tomorrowMaterials.push(item.material)
        }
    })

    if (objThrows.todayMaterials.length === 0 || objThrows.tomorrowMaterials.length === 0){
        objThrows.todayMaterials = [CALENDARIO_MARTANO[todayIndex]["material"]]
        objThrows.tomorrowMaterials = [CALENDARIO_MARTANO[tomorrowIndex]["material"]]
    }
    return objThrows
}