import { UsefulContacts } from "./useful_contact";

export interface AppConfigData {
    municipality: string;
    lastUpdated: string;
    usefulContacts: UsefulContacts;
}