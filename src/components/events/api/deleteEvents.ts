import { BASE_URL } from "../constants";

export const onDelete = async (id: string): Promise<Response> => {
  const response = await fetch(`${BASE_URL}/api/events/${id}/delete`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
