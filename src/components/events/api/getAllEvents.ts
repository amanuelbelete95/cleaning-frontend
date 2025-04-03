import { BASE_URL } from "../constants";
import { Event } from "../events.type";


  const getAllEvents = async () : Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) throw new Error("Failed to fetch events");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return []
  }
};

export default getAllEvents;
