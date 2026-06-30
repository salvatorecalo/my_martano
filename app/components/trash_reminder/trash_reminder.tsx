import { ThrowObjects } from "@/app/(utils)/functions/calculate_today_and_tomorrow_trash/calculate_today_and_tomorrow_trash";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export function TrashReminder({todayMaterials, tomorrowMaterials}: ThrowObjects){
    return (
        <section className="bg-emerald-400 text-white p-8 my-8 rounded-3xl">
            <p className="text-lg md:text-xl lg:text-2xl mb-2">Oggi si butta <strong>{todayMaterials.length > 0 ? todayMaterials.join(", ") : "Nessun ritiro"}</strong></p>
            <p className="text-xl lg:text-xl mb-6">Domani si butta <strong>{tomorrowMaterials.length > 0 ? tomorrowMaterials.join(", ") : "Nessun ritiro"}</strong></p>

            <div className="flex items-center gap-2">
                <Link href="/trash-routine" className="text-lg xl:text-xl">
                    Vedi tutti i giorni
                </Link>
                <FaArrowRight />
            </div>
        </section>
    )
}