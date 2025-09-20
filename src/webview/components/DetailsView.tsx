import React from "react";
import { Entry } from "../types";

interface DetailsViewProps {
  entry: Entry;
  onBack: () => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({ entry, onBack }) => {
  return (
    <div>
      <div className="navigation">
        <button className="nav-button" onClick={onBack}>
          ← Back to Table
        </button>
      </div>
      <div className="content">
        <div className="details-container">
          <h2>Entry Details</h2>
          <div className="details-item">
            <strong>Name:</strong> {entry.name}
          </div>
          <div className="details-item">
            <strong>Email:</strong> {entry.email}
          </div>
          <div className="details-item">
            <strong>Description:</strong> {entry.description}
          </div>
        </div>
      </div>
    </div>
  );
};
