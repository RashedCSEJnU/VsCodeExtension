# Tizen VS Code Extension

A VS Code extension that adds a custom **Tizen** panel to the bottom panel area (next to Problems, Output, Debug Console, Terminals, Ports) for managing entries with full CRUD (Create, Read, Update, Delete) operations.

## Features

### 🔥 Custom Panel Integration

- Adds a "Tizen" tab to the VS Code bottom panel area
- Seamlessly integrates with the existing VS Code interface

### 📊 Data Management Table

- **Table View**: Displays entries with Name, Email, and Action columns
- **Action Icons**: View (👁️), Edit (✏️), and Delete (🗑️) operations
- **Clean Interface**: Responsive design that follows VS Code theming

### 📝 Full CRUD Operations

- **Create**: Add new entries with Name, Email, and Description fields
- **Read**: View detailed information including descriptions
- **Update**: Edit existing entries inline
- **Delete**: Remove entries with a single click

### 🎯 Navigation & UX

- **Multi-View Interface**: Seamlessly switch between table, details, edit, and create views
- **Intuitive Navigation**: Back buttons and clear navigation flow
- **Form Validation**: Required field validation for Name and Email
- **Responsive Design**: Works well on different screen sizes

## How to Use

1. **Install and Activate**: Install the extension, and it will automatically add the "Tizen" tab to your bottom panel
2. **Access the Panel**: Click on the "Tizen" tab in the bottom panel area
3. **Manage Entries**:
   - **View All**: See all entries in the main table
   - **Create New**: Click "Create" button to add new entries
   - **View Details**: Click the eye icon (👁️) to see full details including description
   - **Edit**: Click the edit icon (✏️) to modify entries
   - **Delete**: Click the delete icon (🗑️) to remove entries

## Technical Stack

- **Backend**: VS Code Extension API with TypeScript
- **Frontend**: React with TypeScript
- **Styling**: CSS with VS Code theme integration
- **Build System**: Webpack for bundling
- **Development**: Hot reload support with watch mode

## Development

To set up the development environment:

```bash
# Install dependencies
npm install

# Build the extension
npm run compile

# Start development with hot reload
npm run watch
```

Press `F5` in VS Code to launch the Extension Development Host for testing.

## Architecture

The extension follows a clean architecture pattern:

- **Extension Host** (`extension.ts`): Main extension activation and command registration
- **Panel Provider** (`tizenPanelProvider.ts`): Manages webview content and messaging
- **React App** (`App.tsx`): Main application with routing and state management
- **Components**: Modular React components for each view (Table, Details, Edit, Create)

## Requirements

- VS Code version 1.104.0 or higher
- Node.js and npm for development

## Release Notes

### 0.0.1

- Initial release with full CRUD functionality
- Custom panel integration
- React-based UI with VS Code theming
- Table view with action buttons
- Create, edit, and details views
- Responsive design

**Enjoy managing your data with the Tizen extension!** 🚀
