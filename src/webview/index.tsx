import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

console.log("Tizen webview index.tsx loaded");

try {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root container not found");
  }

  console.log("Creating React root");
  const root = createRoot(container);

  console.log("Rendering App component");
  root.render(<App />);

  console.log("Tizen React app rendered successfully");
} catch (error) {
  console.error("Error initializing Tizen webview:", error);

  // Fallback content
  const container = document.getElementById("root");
  if (container) {
    container.innerHTML = `
      <div style="padding: 20px; color: var(--vscode-errorForeground);">
        <h3>Error Loading Tizen Panel</h3>
        <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
        <p>Check the Debug Console for more details.</p>
      </div>
    `;
  }
}
