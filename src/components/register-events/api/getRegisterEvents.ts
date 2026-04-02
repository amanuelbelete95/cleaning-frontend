import { BASE_URL } from "../../events/constants";
import { EventAPIResponse } from "../../events/events.type";
import { UserAPIResponse } from "../../users/users.type";

export interface RegisterEventApiResponse {
  id: string;
  user_id: string;
  event_id: string;
  registered_on?: string;
  position?: string;
  reason: string;
  name: string;
  description: string;
  registration_count: number;
  capacity: number;
}

export const getRegisterEvents = async (): Promise<RegisterEventApiResponse[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/event-register`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};
