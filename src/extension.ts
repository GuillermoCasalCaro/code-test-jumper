import * as vscode from "vscode";
import { sep, join, parse } from "path";

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        "code-test-jumper.navigateToTest",
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage("No active editor");
                return;
            }

            const filePath = editor.document.uri.fsPath;
            let newFilePath;

            if (filePath.includes("src" + sep)) {
                const { dir, name, ext } = parse(filePath);
                const a = new RegExp(`${sep}src(?!.*${sep}src)`);
                const b = `${sep}spec`;
                const c = dir.replace(a, b);
                newFilePath = join(c, `${name}.test${ext}`);
            } else if (filePath.includes("spec" + sep)) {
                const { dir, name, ext } = parse(filePath);
                newFilePath = join(
                    dir.replace("spec" + sep, "src" + sep),
                    name.replace(".test", "") + ext,
                );
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
                (_err) => {
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
