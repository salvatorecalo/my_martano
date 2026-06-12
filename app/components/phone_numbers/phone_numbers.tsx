import { AppConfig,  } from "@/app/(utils)/server_functions"
import { ContactAuthority } from "@/app/(utils)/server_functions/app_config/model/contact_authority";
import { FiPhone, FiInfo, FiAlertTriangle, FiBriefcase, FiTrash2, FiActivity } from "react-icons/fi"

export async function PhoneNumbers() {
    const { municipality, lastUpdated, usefulContacts } = await AppConfig()

    const getCategoryHeader = (key: string) => {
        switch (key) {
            case "emergencies":
                return { title: "Emergenze", icon: <FiAlertTriangle className="text-red-400 text-xl" /> }
            case "municipalServices":
                return { title: "Servizi Comunali", icon: <FiBriefcase className="text-blue-300 text-xl" /> }
            case "wasteManagement":
                return { title: "Gestione Rifiuti", icon: <FiTrash2 className="text-emerald-300 text-xl" /> }
            case "healthServices":
                return { title: "Servizi Sanitari", icon: <FiActivity className="text-cyan-300 text-xl" /> }
            default:
                return { title: key, icon: <FiInfo className="text-gray-300 text-xl" /> }
        }
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Numeri Utili {municipality}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-50 mt-2">
                    Seleziona un ufficio per avviare direttamente la chiamata dal tuo dispositivo
                </p>
            </div>

            {usefulContacts && 
                Object.entries(usefulContacts).map(([categoryKey, categoryArray]) => {
                    const header = getCategoryHeader(categoryKey);

                    return (
                        <div key={categoryKey} className="mb-10">
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                {header.icon}
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50 uppercase tracking-wide">
                                    {header.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categoryArray.map(({ authorityName, description, numbers }: ContactAuthority, index: number) => {
                                    return (
                                        <article 
                                            key={`${categoryKey}-${index}`} 
                                            className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 text-white p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-blue-500/20"
                                        >
                                            <div>
                                                <h4 className="text-lg font-bold tracking-tight mb-1">
                                                    {authorityName}
                                                </h4>
                                                <p className="text-xs text-blue-100/80 line-clamp-2 mb-4 font-light">
                                                    {description}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                                {numbers.map((number) => {
                                                    return (
                                                        <a
                                                            key={number}
                                                            href={`tel:${number}`}
                                                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-white font-semibold py-2.5 px-3 rounded-xl text-sm transition-all duration-200 backdrop-blur-sm"
                                                        >
                                                            <FiPhone className="text-xs opacity-80" />
                                                            <span>{number}</span>
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }

            <div className="text-center mt-12 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 font-medium">
                    Ultimo aggiornamento configurazione: {lastUpdated}
                </p>
            </div>
        </section>
    )
}