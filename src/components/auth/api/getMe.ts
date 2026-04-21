// /e:/projects/event-frontend/src/components/auth/api/getMe.ts

import { BASE_URL } from "../../events/constants";
import { Role } from "../ProtectedRoute";

interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    role: Role
}

export async function getMe(): Promise<User> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/api/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch logged-in user');
    }

    const user: User = await response.json();
    return user;
}