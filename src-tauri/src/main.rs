// FATE desktop shell — the whole game lives in the webview; the shell only
// opens the window. No plugins, no IPC: the engine is pure TypeScript.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running FATE")
}
