export interface Todo {
  id: number;             // primary key
  title: string;          // task title
  creation_date: string;  // date of creation, e.g., '2025-08-21'
  updated_date?: string | null; // ✅ optional, can be null
  status: boolean;
}