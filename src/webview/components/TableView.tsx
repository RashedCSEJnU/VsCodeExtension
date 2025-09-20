import React from "react";
import { Entry } from "../types";

interface TableViewProps {
  entries: Entry[];
  onView: (entry: Entry) => void;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export const TableView: React.FC<TableViewProps> = ({
  entries,
  onView,
  onEdit,
  onDelete,
  onCreate,
}) => {
  return (
    <div>
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>
                    <button
                      className="icon-button"
                      onClick={() => onView(entry)}
                      title="View"
                    >
                      👁️
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => onEdit(entry)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => onDelete(entry.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "var(--vscode-descriptionForeground)",
              }}
            >
              No entries found. Click "Create" to add a new entry.
            </div>
          )}
        </div>
      </div>
      <div className="create-button-container">
        <button onClick={onCreate}>Create</button>
      </div>
    </div>
  );
};
