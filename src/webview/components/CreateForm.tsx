import React, { useState } from "react";

// Declare vscode API
declare const vscode: any;
declare global {
  interface Window {
    vscode: any;
  }
}

interface CreateFormProps {
  onSave: (data: { name: string; email: string; description: string }) => void;
  onCancel: () => void;
}

export const CreateForm: React.FC<CreateFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CreateForm handleSubmit called with:", formData);

    if (formData.name.trim() && formData.email.trim()) {
      console.log("Form validation passed, calling onSave");
      onSave(formData);
      setFormData({ name: "", email: "", description: "" });
    } else {
      console.log("Form validation failed:", {
        nameEmpty: !formData.name.trim(),
        emailEmpty: !formData.email.trim(),
      });
    }
  };

  return (
    <div>
      <div className="navigation">
        <button className="nav-button" onClick={onCancel}>
          ← Back to Table
        </button>
      </div>
      <div className="content">
        <h2>Create New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter a description..."
            />
          </div>

          <div className="form-actions">
            <button type="submit">Create Entry</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Test button clicked");
                console.log(
                  "VS Code API available:",
                  typeof vscode !== "undefined"
                );
                console.log("onSave function:", typeof onSave);

                // Direct test of VS Code messaging
                if (typeof vscode !== "undefined") {
                  console.log("Sending direct message to extension");
                  vscode.postMessage({
                    type: "createEntry",
                    data: {
                      name: "Direct Test User",
                      email: "direct@example.com",
                      description: "Direct test description",
                    },
                  });
                } else {
                  console.error("VS Code API not available!");
                }

                try {
                  onSave({
                    name: "Test User",
                    email: "test@example.com",
                    description: "Test description",
                  });
                  console.log("onSave called successfully");
                } catch (error) {
                  console.error("Error calling onSave:", error);
                }
              }}
              style={{ marginLeft: "10px", backgroundColor: "orange" }}
            >
              Test Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
