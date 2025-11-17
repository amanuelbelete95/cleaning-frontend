import { BASE_URL } from "../constants";

export const onDelete = async (event_id: string): Promise<Response> => {
  const response = await fetch(`${BASE_URL}/api/events/${event_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
