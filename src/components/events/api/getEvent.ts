import { BASE_URL } from "../constants";
import { Event } from "../events.type";


  const getEvent = async (id: string) : Promise<Event> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${id}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return {name: '', location: ""};
  }
};

export default getEvent;
