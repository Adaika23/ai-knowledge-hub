import { useState } from "react";
import { askAI } from "../api/api";

function AIAssistant() {
  // ================================
  // 🧠 State Management
  // ================================

  // User input (question)
  const [question, setQuestion] = useState("");

  // AI response
  const [answer, setAnswer] = useState("");

  // Loading indicator
  const [loading, setLoading] = useState(false);


  // ================================
  // 🤖 Handle Ask AI
  // ================================
  const handleAskAI = async (e) => {
    e.preventDefault();

    // Prevent empty input
    if (!question.trim()) {
      setAnswer("Please type a question first.");
      return;
    }

    try {
      setLoading(true);     // Start loading
      setAnswer("");        // Clear previous answer

      // 🔥 Call backend AI API
      const data = await askAI(question);

      // 🔥 Set AI response from backend
      setAnswer(data.answer);

    } catch (error) {
      console.error("AI Error:", error);

      // Show user-friendly error
      setAnswer("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  // ================================
  // 🎨 UI
  // ================================
  return (
    <div className="ai-assistant">
      <h2>AI Assistant</h2>
      <p>
        Ask questions about your notes, ideas, or AI learning topics.
      </p>

      {/* Input Form */}
      <form onSubmit={handleAskAI} className="ai-form">
        <input
          type="text"
          placeholder="Ask the AI assistant..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit">
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {/* AI Response */}
      {answer && (
        <div className="ai-answer">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;