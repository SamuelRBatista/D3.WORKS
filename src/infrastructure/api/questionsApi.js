// src/infrastructure/api/api.js
export const API_BASE_URL = "http://localhost:4000/api"; // Aqui você coloca a URL base da sua API

// Você pode criar funções para chamadas específicas, por exemplo:
export const loadQuestions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/`);
    if (!response.ok) {
      throw new Error("Erro ao carregar as questões.");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar as questões:", error);
    throw error;
  }
};
