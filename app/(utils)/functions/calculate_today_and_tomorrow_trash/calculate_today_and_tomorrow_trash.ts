import { GIORNI_VALIDI } from "../../constants";
import { fetchTrashRoutine } from "../../server_functions/fetch_trash_routine/fetch_trash_routine";

export interface ThrowObjects {
    todayObj: string,
    tomorrowObj: string
}

export async function calculateTodayAndTomorrowTrash(){
    const calendar = await fetchTrashRoutine()
    const todayIndex = new Date().getDay()
    const tomorrowIndex = (todayIndex + 1) % 7

    const today: string = GIORNI_VALIDI[todayIndex]
    const tomorrow: string = GIORNI_VALIDI[tomorrowIndex]

    const objThrows: ThrowObjects = {
        todayObj: '',
        tomorrowObj: '',
    }

    calendar?.forEach((item) => {
        if (item.days.includes(today)){
            objThrows.todayObj = item.material
        }
        if (item.days.includes(tomorrow)){
            objThrows.tomorrowObj = item.material
        }
    })
    return objThrows
}