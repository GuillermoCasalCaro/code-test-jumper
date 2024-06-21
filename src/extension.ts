import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    console.log("WORKINGS!");
    const disposable = vscode.commands.registerCommand(
        "extension.navigateToTest",
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage("No active editor");
                return;
            }

            const filePath = editor.document.uri.fsPath;
            let newFilePath;

            if (filePath.includes("/src/")) {
                newFilePath = filePath
                    .replace("/src/", "/spec/")
                    .replace(/\.tsx?$/, ".spec.tsx");
            } else if (filePath.includes("/spec/")) {
                newFilePath = filePath
                    .replace("/spec/", "/src/")
                    .replace(/\.spec\.tsx?$/, ".tsx");
            } else {
                vscode.window.showInformationMessage(
                    "File not in src or spec directory",
                );
                return;
            }

            const newFileUri = vscode.Uri.file(newFilePath);
            vscode.workspace.openTextDocument(newFileUri).then(
                (doc) => {
                    vscode.window.showTextDocument(doc);
                },
                (err) => {
                    vscode.window.showInformationMessage(
                        "Corresponding file not found",
                    );
                },
            );
        },
    );
    context.subscriptions.push(disposable);
}

export function deactivate() {}
