import { IBook } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const endpoints = {
  getBooks: () => `${API_BASE_URL}/books`,
  saveBook: () => `${API_BASE_URL}/books`,
  updateBook: (id: string) => `${API_BASE_URL}/books/${id}`,
  deleteBook: (id: string) => `${API_BASE_URL}/books/${id}`,
};

const options = (options?: Record<string, string>) => ({
  ...(options ? options : null),
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getBooks(): Promise<null> {
  const response = await fetch(endpoints.getBooks(), options() as RequestInit);

  return response.json();
}

export async function saveBook(data: IBook): Promise<IBook> {
  const response = await fetch(
    endpoints.saveBook(),
    options({
      method: "POST",
      body: JSON.stringify(data),
    }) as RequestInit
  );

  return response.json();
}

export async function updateBook(data: IBook): Promise<IBook> {
  const { _id, ...rest } = data;
  const response = await fetch(
    endpoints.updateBook(_id as string),
    options({
      method: "PUT",
      body: JSON.stringify(rest),
    }) as RequestInit
  );

  return response.json();
}

export async function deleteBook(id: string): Promise<string> {
  const response = await fetch(
    endpoints.deleteBook(id),
    options({
      method: "DELETE",
    }) as RequestInit
  );

  return response.json();
}
