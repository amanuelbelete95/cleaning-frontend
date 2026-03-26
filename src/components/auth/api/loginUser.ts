import { BASE_URL } from "../../events/constants";
import { CreateUpdateUser } from "../../users/schema";

export const logInUser = async (user: Partial<CreateUpdateUser>) => {
  const {username, password } = user
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data =  await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  
};