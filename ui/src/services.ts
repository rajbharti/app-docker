import { apiConfig } from "./config";
import { IBook } from "./types";

export async function getBooks() {
  const response = await fetch(
    apiConfig.endpoints.getBooks(),
    apiConfig.options() as RequestInit
  );

  return response.json();
}

export async function saveBook(data: IBook) {
  const response = await fetch(
    apiConfig.endpoints.saveBook(),
    apiConfig.options({
      method: "POST",
      body: JSON.stringify(data),
    }) as RequestInit
  );

  return response.json();
}
