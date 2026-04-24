// ================================
// 🌐 Backend API Base URL
// ================================
// Central place to change backend URL if needed
const BASE_URL = "http://127.0.0.1:8000";


// ================================
// 📥 Get all notes
// ================================
export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);

    // Check if request failed
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting notes:", error);
    return []; // return empty array instead of crashing UI
  }
}


// ================================
// ➕ Create new note
// ================================
export async function createNote(note) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to create note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    return null;
  }
}


// ================================
// 🔍 Search notes
// ================================
export async function searchNotes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching notes:", error);
    return [];
  }
}


// ================================
// 🤖 Ask AI (NEW - Phase 2)
// ================================
export async function askAI(question) {
  try {
    const response = await fetch(`${BASE_URL}/ask-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error asking AI:", error);
    return { answer: "Error connecting to AI server." };
  }
}