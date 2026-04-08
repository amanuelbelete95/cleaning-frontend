import { BASE_URL } from "../constants";


interface DeleteEventAPiResponse {
  message: string
}

export const onDeleteUser = async (userId: string): Promise<DeleteEventAPiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${userId}/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json()
  } catch (error) {
    return Promise.reject(error)
  }

}
