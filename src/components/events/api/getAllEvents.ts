import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";


const getAllEvents = async (): Promise<EventAPIResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

export default getAllEvents;
