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
