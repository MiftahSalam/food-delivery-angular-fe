export interface User {
    userId: number;
    email: string;
    name: string;
    lastName: string;
    imagePath: string;
    token?: string
    role: string;
}
