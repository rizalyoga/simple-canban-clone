export interface AuthInputInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends AuthInputInterface {
  name: string;
  password_confirmation: string;
}

export interface TodosGroupInterface {
  id: number;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  description: string;
}

export interface TodosTaskInterface {
  id: number;
  name: string;
  done: null;
  todo_id: number;
  created_at: string;
  updated_at: string;
  progress_percentage: number;
}

export interface MenuTaskCardInterface {
  OpenMenuHandler: () => void;
}

export interface ModalPropsInterface {
  modal_handler: () => void;
  update_state?: () => void;
  modal_type?: "new-group" | "new-task" | "delete-task";
  todos_group_id?: number;
  task_id?: number;
}

export interface ModalNewGroupDataInterface {
  title: string;
  description: string;
}

export interface ModalNewTaskDataInterface {
  name: string;
  progress_percentage: number;
  todos_group_id: number;
}
