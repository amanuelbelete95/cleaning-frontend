
import { BASE_URL } from "../../events/constants";
import { UserAPIResponse } from "../users.type";

export const getUser = async (id: string
): Promise<UserAPIResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${id}`);
         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user');
        }
        const user: UserAPIResponse = await response.json();
        return user;
    } catch (error) {
        return Promise.reject(error)
    }
};