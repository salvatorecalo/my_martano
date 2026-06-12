interface getTrashColorReturn {
    bg: string,
    badge: string
}

export function getTrashColor(material: string) : getTrashColorReturn {
    const mat = material.toUpperCase();
    if (mat.includes("ORGANICO") || mat.includes("UMIDO")) {
        return { bg: "bg-amber-100 text-amber-900 border-amber-300", badge: "bg-amber-700 text-white" }; // Marrone/Amber
    }
    if (mat.includes("CARTA")) {
        return { bg: "bg-blue-100 text-blue-900 border-blue-300", badge: "bg-blue-600 text-white" }; // Blu
    }
    if (mat.includes("PLASTICA") || mat.includes("METALLO")) {
        return { bg: "bg-yellow-100 text-yellow-950 border-yellow-300", badge: "bg-yellow-500 text-yellow-950" }; // Giallo
    }
    if (mat.includes("VETRO")) {
        return { bg: "bg-emerald-100 text-emerald-900 border-emerald-300", badge: "bg-emerald-600 text-white" }; // Verde
    }
    if (mat.includes("SECCO") || mat.includes("INDIFFERENZIATO")) {
        return { bg: "bg-gray-100 text-gray-900 border-gray-300", badge: "bg-gray-600 text-white" }; // Grigio
    }
    return { bg: "bg-slate-50 text-slate-700 border-slate-200", badge: "bg-slate-500 text-white" };
}