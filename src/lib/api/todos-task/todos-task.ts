import { getToken as token } from "../get-token";
import { ModalNewTaskDataAPIInterface } from "../../../types/type";

interface ModalPatchTaskInterface extends ModalNewTaskDataAPIInterface {
  task_id: number;
  target_group_todo_id?: number;
}

const API_URL = import.meta.env.VITE_BASE_LINK_URL;

export const getTodosTask = async (todosGroupId: number) => {
  try {
    const response = await fetch(`${API_URL}/todos/${todosGroupId}/items`, {
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

export const postTodosTask = async (payload: ModalNewTaskDataAPIInterface) => {
  try {
    const response = await fetch(
      `${API_URL}/todos/${payload.todos_group_id}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.slice(1, -1)}`,
        },
        body: JSON.stringify(payload),
      }
    );

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

export const editTodosTask = async (payload: ModalPatchTaskInterface) => {
  const newData = {
    target_todo_id: payload.todos_group_id,
    name: payload.name,
    progress_percentage: payload.progress_percentage,
  };

  try {
    const response = await fetch(
      `${API_URL}/todos/${payload.todos_group_id}/items/${payload.task_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.slice(1, -1)}`,
        },
        body: JSON.stringify(newData),
      }
    );

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

export const moveTodosTask = async (payload: ModalPatchTaskInterface) => {
  const newData = {
    target_todo_id: payload.target_group_todo_id,
  };

  try {
    const response = await fetch(
      `${API_URL}/todos/${payload.todos_group_id}/items/${payload.task_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.slice(1, -1)}`,
        },
        body: JSON.stringify(newData),
      }
    );

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

export const deleteTodosTask = async ({
  group_id,
  task_id,
}: {
  group_id: number;
  task_id: number;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/todos/${group_id}/items/${task_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.slice(1, -1)}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = { message: "Delete Success" };

    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
