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

    if (formData.name.trim() && formData.email.trim()) {
      onSave(formData);
      setFormData({ name: "", email: "", description: "" });
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
          </div>
        </form>
      </div>
    </div>
  );
};
