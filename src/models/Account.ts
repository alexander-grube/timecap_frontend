
export type Account = {
    firstname: string;
    lastname: string;
    email: string;
    role: number;
}

export function mapAccountRole(role: number): string {
    switch (role) {
        case 1:
            return 'Admin';
        case 2:
            return 'Developer';
        case 3:
            return 'Manager';
        default:
            return 'User';
    }
}