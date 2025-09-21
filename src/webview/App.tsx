import React, { useState, useEffect } from "react";
import { Entry, ViewType } from "./types";
import { TableView } from "./components/TableView";
import { DetailsView } from "./components/DetailsView";
import { EditForm } from "./components/EditForm";
import { CreateForm } from "./components/CreateForm";

// Declare vscode API
declare const vscode: any;

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ padding: "20px", color: "var(--vscode-errorForeground)" }}
        >
          <h3>Something went wrong in the Tizen app</h3>
          <p>Error: {this.state.error?.message}</p>
          <p>Check the Debug Console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>("table");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    // Check if vscode API is available
    if (typeof vscode === "undefined") {
      console.error("VS Code API not available");
      return;
    }

    // Request initial data from extension
    vscode.postMessage({ type: "getData" });

    // Listen for messages from the extension
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;

      switch (message.type) {
        case "dataUpdate":
          setEntries(message.data);
          break;
        case "entryCreated":
          setEntries((prev) => [...prev, message.data]);
          setCurrentView("table");
          break;
        case "entryUpdated":
          setEntries((prev) =>
            prev.map((entry) =>
              entry.id === message.data.id ? message.data : entry
            )
          );
          setCurrentView("table");
          break;
        case "entryDeleted":
          setEntries((prev) => prev.filter((entry) => entry.id !== message.id));
          break;
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, []);

  const handleView = (entry: Entry) => {
    setSelectedEntry(entry);
    setCurrentView("details");
  };

  const handleEdit = (entry: Entry) => {
    setSelectedEntry(entry);
    setCurrentView("edit");
  };

  const handleDelete = (id: string) => {
    vscode.postMessage({ type: "deleteEntry", id });
  };

  const handleCreate = () => {
    setCurrentView("create");
  };

  const handleBack = () => {
    setCurrentView("table");
    setSelectedEntry(null);
  };

  const handleSave = (data: Partial<Entry>) => {
    if (currentView === "edit" && selectedEntry) {
      const updateData = { ...selectedEntry, ...data };
      vscode.postMessage({
        type: "updateEntry",
        data: updateData,
      });
    } else if (currentView === "create") {
      vscode.postMessage({
        type: "createEntry",
        data,
      });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "details":
        return selectedEntry ? (
          <DetailsView entry={selectedEntry} onBack={handleBack} />
        ) : null;

      case "edit":
        return selectedEntry ? (
          <EditForm
            entry={selectedEntry}
            onSave={handleSave}
            onCancel={handleBack}
          />
        ) : null;

      case "create":
        return <CreateForm onSave={handleSave} onCancel={handleBack} />;

      default:
        return (
          <TableView
            entries={entries}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
        );
    }
  };

  return <div className="app">{renderContent()}</div>;
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};
