import type { Books } from "../types";

interface IEndpoints {
  getBooks: () => string;
  saveBook: () => string;
  updateBook: (_id: string) => string;
  deleteBook: (_id: string) => string;
}

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const endpoints: IEndpoints = {
  getBooks: () => `${API_BASE_URL}/books`,
  saveBook: () => `${API_BASE_URL}/books`,
  updateBook: (_id: string) => `${API_BASE_URL}/books/${_id}`,
  deleteBook: (_id: string) => `${API_BASE_URL}/books/${_id}`,
};

const fetchOptions = (options?: RequestInit): RequestInit => ({
  ...(options ? options : null),
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getBooks(): Promise<Books[]> {
  const response = await fetch(endpoints.getBooks(), fetchOptions());

  return response.json();
}

export async function saveBook(data: Books): Promise<Record<string, any>> {
  const response = await fetch(
    endpoints.saveBook(),
    fetchOptions({
      method: "POST",
      body: JSON.stringify(data),
    })
  );

  return response.json();
}

export async function updateBook(data: Books): Promise<Record<string, any>> {
  const { _id, ...rest } = data;
  const response = await fetch(
    endpoints.updateBook(_id!),
    fetchOptions({
      method: "PUT",
      body: JSON.stringify(rest),
    })
  );

  return response.json();
}

export async function deleteBook(id: string): Promise<Record<string, any>> {
  const response = await fetch(
    endpoints.deleteBook(id),
    fetchOptions({
      method: "DELETE",
    })
  );

  return response.json();
}
