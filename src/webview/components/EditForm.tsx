import React, { useState } from "react";
import { Entry } from "../types";

interface EditFormProps {
  entry: Entry;
  onSave: (data: Partial<Entry>) => void;
  onCancel: () => void;
}

export const EditForm: React.FC<EditFormProps> = ({
  entry,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: entry.name,
    email: entry.email,
    description: entry.description,
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
        <h2>Edit Entry</h2>
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
            />
          </div>

          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
