export interface Todo {
  id: number;             // primary key
  title: string;          // task title
  creation_date: string;  // date of creation, e.g., '2025-08-21'
  status: boolean;
}