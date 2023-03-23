const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const apiConfig = {
  endpoints: {
    getBooks: () => `${API_ENDPOINT}/books`,
    getBook: (id: string) => `${API_ENDPOINT}/books/${id}`,
    saveBook: () => `${API_ENDPOINT}/books`,
    updateBook: (id: string) => `${API_ENDPOINT}/books/${id}`,
    deleteBook: (id: string) => `${API_ENDPOINT}/books/${id}`,
  },
  options: (options?: Record<string, string>) => ({
    mode: "cors",
    ...(options ? options : null),
    headers: {
      "Content-Type": "application/json",
    },
  }),
};

export default apiConfig;
