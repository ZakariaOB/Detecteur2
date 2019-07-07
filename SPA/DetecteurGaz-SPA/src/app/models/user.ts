export class User {
    id: string;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    address: string;
    contacts: UserContact[];
    hasAlerts: boolean;
}

export class UserContact {
    priority: number;
    userId: string;
}
