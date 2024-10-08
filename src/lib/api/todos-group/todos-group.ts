import { getToken as token } from "../get-token";
import { ModalNewGroupDataAPIInterface } from "../../../types/type";

const API_URL = import.meta.env.VITE_BASE_LINK_URL;

export const getTodosGroup = async () => {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token?.slice(1, -1)}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export const postTodosGroup = async (
  payload: ModalNewGroupDataAPIInterface
) => {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.slice(1, -1)}`,
      },
      body: JSON.stringify(payload),
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
