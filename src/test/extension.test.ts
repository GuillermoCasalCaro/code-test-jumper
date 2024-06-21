import * as assert from "assert";
import * as vscode from "vscode";
import { join, sep } from "path";

suite("Navigate to Test Command", () => {
    // Setup the workspace and test files
    const srcFilePath = join(__dirname, "testWorkspace", "src", "file.js");
    const specFilePath = join(
        __dirname,
        "testWorkspace",
        "spec",
        "file.test.js",
    );

    test("Navigate from src to spec file", async () => {
        // Open the src file
        const document = await vscode.workspace.openTextDocument(srcFilePath);
        await vscode.window.showTextDocument(document);
        assert.strictEqual(
            vscode.window.activeTextEditor?.document.uri.fsPath.toLowerCase(),
            srcFilePath.toLowerCase(),
        );

        // Execute the navigateToTest command
        await vscode.commands.executeCommand("code-test-jumper.navigateToTest");

        // Get the active editor and check the file path
        assert.strictEqual(
            vscode.window.activeTextEditor?.document.uri.fsPath.toLowerCase(),
            specFilePath.toLowerCase(),
        );
    });

    // test("Navigate from spec to src file", async () => {
    //     // Open the spec file
    //     const document = await vscode.workspace.openTextDocument(specFilePath);
    //     await vscode.window.showTextDocument(document);

    //     // Execute the navigateToTest command
    //     await vscode.commands.executeCommand("code-test-jumper.navigateToTest");

    //     // Get the active editor and check the file path
    //     const activeEditor = vscode.window.activeTextEditor;
    //     assert.ok(activeEditor);
    //     assert.strictEqual(activeEditor?.document.uri.fsPath, srcFilePath);
    // });

    // test("File not in src or spec directory", async () => {
    //     // Open a file not in src or spec directory
    //     const randomFilePath = join(
    //         __dirname,
    //         "..",
    //         "testWorkspace",
    //         "random.js",
    //     );
    //     const document =
    //         await vscode.workspace.openTextDocument(randomFilePath);
    //     await vscode.window.showTextDocument(document);

    //     // Execute the navigateToTest command
    //     await vscode.commands.executeCommand("code-test-jumper.navigateToTest");

    //     // Get the last message shown and check its content
    //     const lastMessage = vscode.window.activeTextEditor?.document.getText();
    //     assert.strictEqual(lastMessage, "File not in src or spec directory");
    // });
});
