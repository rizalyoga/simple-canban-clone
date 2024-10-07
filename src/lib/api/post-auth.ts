import { AuthInputInterface, RegisterInterface } from "../../types/type";

const API_URL = import.meta.env.VITE_BASE_LINK_URL;

export const PostLogin = async (payload: AuthInputInterface) => {
  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const res = await response.json();

      throw new Error(
        `HTTP error! status: ${response.status}, error: ${res.message}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export const PostRegister = async (payload: RegisterInterface) => {
  try {
    const response = await fetch(`${API_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const res = await response.json();

      throw new Error(
        `HTTP error! status: ${response.status}, error: ${res.message}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
