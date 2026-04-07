import { BASE_URL } from "../../events/constants";
import { CreateUpdateUser } from "../../users/schema";
import { UserAPIResponse } from "../../users/users.type";

export const updateUser = async ( id: string, userData: CreateUpdateUser): Promise<UserAPIResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)

        });
         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }
        const newUser: UserAPIResponse = await response.json();
        return newUser;
    } catch (error) {
        return Promise.reject(error)
    }
};