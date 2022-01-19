#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod file_lib;
mod files_api;
mod storage;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      files_api::read_directory,
      files_api::is_dir,
      files_api::get_file_meta_data,
      // files_api::open_file,
      files_api::file_exist,
      files_api::create_file,
      files_api::create_dir_recursive,
      files_api::open_in_terminal,
      files_api::open_in_vscode,
      files_api::get_trashed_items,
      files_api::delete_file,
      files_api::get_files_in_directory,
      files_api::listen_dir,
      files_api::restore_files,
      files_api::purge_trashes,
      files_api::restore_trash,
      files_api::get_dir_size,
      files_api::get_file_properties,
      files_api::extract_icon,
      files_api::calculate_files_total_size,
      files_api::search_in_dir,
      // drives::get_drives,
      // storage::write_data,
      // storage::read_data,
      // storage::delete_storage_data,
      // extensions::listen_stylesheet_change,
      // extensions::get_cli_args,
      // check_vscode_installed,
      // get_available_fonts,
      // enable_shadow_effect,
      // change_transparent_effect
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
