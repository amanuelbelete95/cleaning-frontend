import { BASE_URL } from "../constants";
import { Event } from "../events.type";


  const getAllEvents = async () : Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    const eventResponse = await response.json();
    return eventResponse.data;
  } catch (error) {
    return []
  }
};

export default getAllEvents;
