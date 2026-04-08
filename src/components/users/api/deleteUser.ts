import { BASE_URL } from "../../events/constants";

interface DeleteUserApiResponse {
  message: string
}

export const onDeleteUser = async (userId: string): Promise<DeleteUserApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }
    return await response.json()
  } catch (error) {
    return Promise.reject(error)
  }
}
