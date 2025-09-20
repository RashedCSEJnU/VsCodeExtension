import * as vscode from "vscode";
import { TizenPanelProvider } from "./tizenPanelProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tizen" is now active!');

  // Create the Tizen panel provider
  const tizenPanelProvider = new TizenPanelProvider(context.extensionUri);

  // Register the webview view provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("tizenPanel", tizenPanelProvider)
  );

  // Register the command to show the panel
  const showPanelCommand = vscode.commands.registerCommand(
    "tizen.showPanel",
    () => {
      // Show the panel area first
      vscode.commands.executeCommand("workbench.panel.focus");
      // Focus the specific panel
      vscode.commands.executeCommand("tizenPanel.focus");
    }
  );

  context.subscriptions.push(showPanelCommand);

  // Show a message when extension is activated
  vscode.window.showInformationMessage(
    "Tizen extension activated! Look for the Tizen tab in the bottom panel."
  );
}

export function deactivate() {}
