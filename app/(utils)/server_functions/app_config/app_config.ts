import { AppConfigData } from "./model/app_config_data";

export async function AppConfig(): Promise<AppConfigData> {
    return {
        "municipality": "Martano",
        "lastUpdated": "2026-06-11",
        "usefulContacts": {
            "emergencies": [
                {
                    "authorityName": "Numero Unico di Emergenza",
                    "description": "Pronto intervento per qualsiasi tipo di emergenza",
                    "numbers": ["112"]
                },
                {
                    "authorityName": "Polizia Locale",
                    "description": "Comando Municipale",
                    "numbers": ["0836575288"]
                }
            ],
            "municipalServices": [
                {
                    "authorityName": "Municipio (Centralino)",
                    "description": "Sede centrale del Comune",
                    "numbers": ["0836575211"]
                },
                {
                    "authorityName": "Ufficio Tecnico",
                    "description": "Edilizia, urbanistica e lavori pubblici",
                    "numbers": ["0836575214"]
                },
                {
                    "authorityName": "Anagrafe e Stato Civile",
                    "description": "Carte d'identità, certificati e cambi di residenza",
                    "numbers": ["0836575272"]
                }
            ],
            "wasteManagement": [
                {
                    "authorityName": "Gema S.p.A. (Numero Verde)",
                    "description": "Servizio Clienti per segnalazioni, info e ritiro ingombranti",
                    "numbers": ["081914904"]
                },
                {
                    "authorityName": "Ecocentro Comunale",
                    "description": "Isola ecologica per il conferimento diretto",
                    "numbers": ["0836571234"]
                }
            ],
            "healthServices": [
                {
                    "authorityName": "Guardia Medica",
                    "description": "Servizio di continuità assistenziale",
                    "numbers": ["0836571267"]
                },
                {
                    "authorityName": "Asl - Distretto Socio Sanitario",
                    "description": "Uffici e sportelli sanitari locali",
                    "numbers": ["0836577669"]
                }
            ]
        }
    }
}