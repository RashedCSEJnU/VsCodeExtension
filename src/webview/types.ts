export interface Entry {
  id: string;
  name: string;
  email: string;
  description: string;
}

export type ViewType = "table" | "details" | "edit" | "create";

export interface AppState {
  entries: Entry[];
  currentView: ViewType;
  selectedEntry: Entry | null;
}
