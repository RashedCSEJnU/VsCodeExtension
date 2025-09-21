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
    async () => {
      try {
        // First reveal the container view
        await vscode.commands.executeCommand(
          "workbench.view.extension.tizenContainer"
        );

        // Then focus on the specific panel
        await vscode.commands.executeCommand("tizenPanel.focus");

        vscode.window.showInformationMessage("Tizen panel is now visible.");
      } catch (error) {
        console.error("Error showing Tizen panel:", error);
        vscode.window.showErrorMessage(`Error showing Tizen panel: ${error}`);
      }
    }
  );

  context.subscriptions.push(showPanelCommand);

  // Run the command to show the panel on activation
  vscode.commands.executeCommand("tizen.showPanel");
}

export function deactivate() {}
