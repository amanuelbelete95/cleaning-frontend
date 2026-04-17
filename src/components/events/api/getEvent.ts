import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";

const getEventById = async (id: string | undefined): Promise<EventAPIResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json() as EventAPIResponse;
  } catch (error) {
    return Promise.reject(error)
  }
};

export default getEventById;
