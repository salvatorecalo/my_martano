import { ContactAuthority } from "./contact_authority";

export interface UsefulContacts {
    emergencies: ContactAuthority[];
    municipalServices: ContactAuthority[];
    wasteManagement: ContactAuthority[];
    healthServices: ContactAuthority[];
}