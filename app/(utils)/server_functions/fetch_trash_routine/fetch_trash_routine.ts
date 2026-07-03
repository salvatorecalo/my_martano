import { GIORNI_VALIDI, TRASH_ROUTINE_URL } from "../../constants";
import * as cheerio from "cheerio"

interface CalendarItem {
    material: string,
    days: string
}
export async function fetchTrashRoutine(){
    try {
        const res = await fetch(
            TRASH_ROUTINE_URL,
            {
                next: {revalidate: 86400}, // I refresh it every day
            }
        )

        if (!res.ok) {
            throw new Error(`Error while fetching trash routine ${res.status}`)
        }

        const html = await res.text()
        const $ = cheerio.load(html)
        const calendar: CalendarItem[] = []
        
        $('.et_pb_column').each((index, element) => {
            const material = $(element).find('h2').text().trim()
            const rawDay = $(element).find('p > span').text().trim().toUpperCase()
            // we replace every strange character 
            const day = rawDay.replace('É', 'É').trim()
            if (material && day) {
                const isDayValid = GIORNI_VALIDI.some(g => day.includes(g))
                if (isDayValid){
                    calendar.push({
                        material: material,
                        days: day
                    })
                }
            }
        })
        return calendar
    } catch (e) {
        console.log(e)
        return []
    }
}