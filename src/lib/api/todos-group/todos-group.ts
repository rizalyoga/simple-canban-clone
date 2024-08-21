import { getToken as token } from "../get-token";

const API_URL = import.meta.env.VITE_BASE_LINK_URL;

export const getTodosGroup = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token?.slice(1, -1)}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
