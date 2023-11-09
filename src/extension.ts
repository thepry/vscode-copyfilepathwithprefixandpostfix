// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "copyfilepathwithprefixandpostfix" is now active!');
	class NoWorkspaceOpen extends Error {
	}
	
	class NoTextEditorOpen extends Error {
	}
	
	class DocumentIsUntitled extends Error {
	}

	function filePath(): { path: string, lineNumber: number } {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			throw new NoTextEditorOpen;
		}
	
		let document = editor.document;
		if (document.isUntitled) {
			throw new DocumentIsUntitled;
		}
	
		const path = document.uri.path;
		const lineNumber = editor.selection.active.line + 1;

		return { path, lineNumber }
	}

	function toast(message: string) {
		vscode.window.setStatusBarMessage(message, 3000)
	}

	let command1 = vscode.commands.registerCommand('copyfilepathwithprefixandpostfix.copyFilePathWithLineNumber', (prefix: string = "", postfix: string = "") => {
		try {
			const { path, lineNumber } = filePath()
			const line = `${prefix}${path}:${lineNumber}${postfix}`;

			vscode.env.clipboard.writeText(line).then(() => {
        toast(`'${line}' copied to clipboard`);
      });
		} catch {}
	});

	let command2 = vscode.commands.registerCommand('copyfilepathwithprefixandpostfix.copyFilePath', (prefix: string = "", postfix: string = "") => {
		try {
			const { path } = filePath()
			const line = `${prefix}${path}${postfix}`;
			
			vscode.env.clipboard.writeText(line).then(() => {
        toast(`'${line}' copied to clipboard`);
      });
		} catch {}
	});

	context.subscriptions.push(command1);
	context.subscriptions.push(command2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
