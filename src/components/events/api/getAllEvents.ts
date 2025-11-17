import { BASE_URL } from "../constants";
import { Event } from "../events.type";


const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    throw error;
  }
};

export default getAllEvents;
