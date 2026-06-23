// ================================
// 🛠 Shared Utility Functions
// ================================

// ================================
// 🕒 Format Current Time
// ================================
export function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ================================
// 📊 Format Similarity Percentage
// ================================
export function formatSimilarity(similarity) {
  return `${(similarity * 100).toFixed(1)}%`;
}