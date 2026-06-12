import Link from "next/link";
import { getTrashColor } from "../(utils)/functions";
import { fetchTrashRoutine } from "../(utils)/server_functions/fetch_trash_routine/fetch_trash_routine"

export default async function TrashRoutine() {
    const calendar = await fetchTrashRoutine()

    return (
        <section className="max-w-2xl mx-auto px-4 my-8">
            <h1 className="text-center font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-white mb-6 tracking-tight">
                📅 Calendario Settimanale Raccolta
            </h1>
            
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs tracking-wider font-bold">
                            <th className="py-4 px-6 w-1/3">Giorno</th>
                            <th className="py-4 px-6 w-2/3">Materiale da esporre</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {calendar && calendar.map((item, idx) => {
                            const colors = getTrashColor(item.material);
                            return (
                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-slate-700 text-base md:text-lg capitalize">
                                        {item.days.toLowerCase()}
                                    </td>
                                    
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm md:text-base font-bold border ${colors.bg}`}>
                                            <span className={`w-2.5 height-2.5 h-2.5 rounded-full mr-2 ${colors.badge}`}></span>
                                            {item.material}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            <p className="text-center text-xs text-slate-400 mt-4 italic">
                *I dati si aggiornano automaticamente dal sito <Link href="https://www.gema-spa.com/comuni/martano/">Gema SpA</Link>
            </p>
            <Link href="/" className="block text-center mt-4">Ritorna alla home page</Link>
        </section>
    )
}