// ========================================
// 🌐 Backend API Base URL
// ========================================
// This is the FastAPI backend server URL.
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


// ========================================
// 🔐 Get Saved JWT Token
// ========================================
// After login, the token should be saved in sessionStorage.
// The user stays logged in until the browser/tab is closed.
function getAuthHeaders() {
  const token = sessionStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


// ========================================
// 📚 Get All Notes - Protected
// ========================================
// Sends GET request to FastAPI:
// GET /notes
export async function getNotes() {
  const response = await fetch(`${API_URL}/notes`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
}


// ========================================
// 📝 Create New Note - Protected
// ========================================
// Sends POST request to FastAPI:
// POST /notes
export async function createNote(note) {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: getAuthHeaders(),

    // Converts JavaScript object into JSON
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
}


// ========================================
// 🔎 Search Notes - Protected
// ========================================
// Sends GET request to FastAPI:
// GET /search?query=yourSearchText
export async function searchNotes(query) {
  const response = await fetch(
    `${API_URL}/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search notes");
  }

  return await response.json();
}

// ================================
// 🤖 Ask AI
// ================================
// Sends POST request to backend
// POST /ask-ai
// Requires JWT token because AI reads user notes/documents
export async function askAI(question) {
  const response = await fetch(`${API_URL}/ask-ai`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to ask AI");
  }

  const contentType = response.headers.get("content-type");

  // Normal JSON response fallback
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  // Streaming response fallback as text
  const text = await response.text();

  return {
    answer: text,
    sources: [],
  };
}


// ========================================
// 👤 Register User - Public
// ========================================
// Sends POST request to FastAPI:
// POST /register
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
}


// ========================================
// 🔐 Login User - Public
// ========================================
// Sends POST request to FastAPI:
// POST /login
export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}


// ========================================
// 🧠 AI Semantic Search Notes - Protected
// ========================================
// Sends GET request to FastAPI:
// GET /semantic-search?query=yourSearchText
export async function semanticSearchNotes(query) {
  const response = await fetch(
    `${API_URL}/semantic-search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Semantic search failed");
  }

  return await response.json();
}

// ========================================
// 🗑 Delete Note
// ========================================
// Sends DELETE request to FastAPI:
// DELETE /notes/{id}
// Requires JWT authentication
export async function deleteNote(noteId) {

  const response = await fetch(
    `${API_URL}/notes/${noteId}`,
    {
      method: "DELETE",

      headers: getAuthHeaders(),
    }
  );

  // If request fails
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  // Return success response
  return await response.json();
}

// ================================
// 💬 Get Chat History
// ================================
export const getChatHistory = async () => {
  const token = sessionStorage.getItem("token");

  // ✅ Safety check
  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${API_URL}/chat-history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ✅ Handle backend errors properly
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "Failed to load chat history");
  }

  return await res.json();
};

// ================================
// 🗑️ Clear Chat History
// ================================
export const clearChatHistory = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/chat-history`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

// ================================
// 📄 Upload Document
// ================================
export const uploadDocument = async (file) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return {
      error: "You must be logged in before uploading documents.",
    };
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/upload-document`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return response.json();
};

// ================================
// 📄 Get Uploaded Documents
// ================================
export const getDocuments = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/documents`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return await response.json();
};

// ====================================
// 👁 Get Single Document
// ====================================
export const getDocument = async (documentId) => {

    const token = sessionStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/documents/${documentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch document");
    }

    return await response.json();
};

// ================================
// 🗑 Delete Document
// ================================
export const deleteDocument = async (documentId) => {

  const token = sessionStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/documents/${documentId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete document");
  }

  return response.json();
};