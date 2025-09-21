import * as vscode from "vscode";
import * as path from "path";

export class TizenPanelProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "tizenPanel";
  private _entries: any[] = [];

  constructor(private readonly _extensionUri: vscode.Uri) {
    // Initialize with sample data
    this._entries = this._getSampleData();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.title = "Tizen";
    webviewView.description = "Tizen Panel";

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(
      (message) => {
        switch (message.type) {
          case "getData":
            // Send initial data to webview
            webviewView.webview.postMessage({
              type: "dataUpdate",
              data: this._entries,
            });
            break;
          case "createEntry":
            // Handle create entry
            const newEntry = {
              ...message.data,
              id: Date.now().toString(),
            };
            this._entries.push(newEntry);
            webviewView.webview.postMessage({
              type: "entryCreated",
              data: newEntry,
            });
            break;
          case "updateEntry":
            // Handle update entry
            const updatedEntry = message.data;
            const updateIndex = this._entries.findIndex(
              (entry) => entry.id === updatedEntry.id
            );
            if (updateIndex !== -1) {
              this._entries[updateIndex] = updatedEntry;
              webviewView.webview.postMessage({
                type: "entryUpdated",
                data: updatedEntry,
              });
            }
            break;
          case "deleteEntry":
            // Handle delete entry
            const deleteId = message.id;
            this._entries = this._entries.filter(
              (entry) => entry.id !== deleteId
            );
            webviewView.webview.postMessage({
              type: "entryDeleted",
              id: deleteId,
            });
            break;
        }
      },
      undefined,
      []
    );
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "webview.js")
    );

    // Do the same for the stylesheets.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "styles.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} https:;">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
				<title>Tizen Panel</title>
			</head>
			<body>
				<div id="root">
					<div style="padding: 20px; text-align: center;">
						<h3>Loading Tizen Panel...</h3>
						<p>If this message persists, check the Debug Console for errors.</p>
					</div>
				</div>
				<script nonce="${nonce}">
					// Ensure VS Code API is available
					const vscode = acquireVsCodeApi();
					window.vscode = vscode;
				</script>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }

  private _getSampleData() {
    return [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        description:
          "Software developer with 5 years of experience in web development.",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        description:
          "UI/UX designer passionate about creating user-friendly interfaces.",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        description: "Project manager with expertise in agile methodologies.",
      },
    ];
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
