use tauri::{Manager, WebviewWindow};
use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use rodio::{OutputStream, OutputStreamHandle, Sink, source::SineWave, Source};
use std::sync::{Mutex, OnceLock};
use std::time::Duration;

static PEAK_AMPLITUDE: Mutex<f32> = Mutex::new(0.0);
static SOUND_VOLUME: Mutex<f32> = Mutex::new(0.5);
static AUDIO_HANDLE: OnceLock<OutputStreamHandle> = OnceLock::new();

fn audio_handle() -> &'static OutputStreamHandle {
    AUDIO_HANDLE.get_or_init(|| {
        let (stream, handle) = OutputStream::try_default()
            .expect("failed to get audio output device");
        std::mem::forget(stream); // keep stream alive for the process lifetime
        handle
    })
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_idle_time() -> u64 {
    system_idle_time::get_idle_time()
        .map(|d| d.as_millis() as u64)
        .unwrap_or(0)
}

#[tauri::command]
fn set_always_on_top(window: tauri::Window, always_on_top: bool) -> Result<(), String> {
    window.set_always_on_top(always_on_top).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_ignore_cursor_events(window: tauri::Window, ignore: bool) -> Result<(), String> {
    window.set_ignore_cursor_events(ignore).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_mouse_position() -> (i32, i32) {
    use mouse_position::mouse_position::Mouse;
    match Mouse::get_mouse_position() {
        Mouse::Position { x, y } => (x, y),
        Mouse::Error => (0, 0),
    }
}

#[tauri::command]
fn get_sound_level() -> f32 {
    let mut peak = PEAK_AMPLITUDE.lock().unwrap();
    let val = *peak;
    *peak = 0.0;
    val
}

#[tauri::command]
fn set_sound_volume(volume: f32) {
    *SOUND_VOLUME.lock().unwrap() = volume.clamp(0.0, 1.0);
}

#[tauri::command]
fn play_grumble() -> Result<(), String> {
    let sink = Sink::try_new(audio_handle()).map_err(|e| e.to_string())?;
    let vol = *SOUND_VOLUME.lock().unwrap();
    sink.append(SineWave::new(80.0).take_duration(Duration::from_millis(400)).amplify(0.2 * vol));
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_chirp() -> Result<(), String> {
    let sink = Sink::try_new(audio_handle()).map_err(|e| e.to_string())?;
    let vol = *SOUND_VOLUME.lock().unwrap();
    sink.append(SineWave::new(880.0).take_duration(Duration::from_millis(150)).amplify(0.1 * vol));
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_level_up() -> Result<(), String> {
    let sink = Sink::try_new(audio_handle()).map_err(|e| e.to_string())?;
    let vol = *SOUND_VOLUME.lock().unwrap();
    for (i, &freq) in [523.25f32, 659.25, 783.99, 1046.50].iter().enumerate() {
        sink.append(
            SineWave::new(freq)
                .delay(Duration::from_millis(i as u64 * 150))
                .take_duration(Duration::from_millis(300))
                .amplify(0.08 * vol),
        );
    }
    sink.append(
        SineWave::new(1760.0)
            .delay(Duration::from_millis(600))
            .take_duration(Duration::from_millis(600))
            .amplify(0.04 * vol),
    );
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_goal_reached() -> Result<(), String> {
    let sink = Sink::try_new(audio_handle()).map_err(|e| e.to_string())?;
    let vol = *SOUND_VOLUME.lock().unwrap();
    sink.append(SineWave::new(659.25).take_duration(Duration::from_millis(200)).amplify(0.1 * vol));
    sink.append(SineWave::new(880.0).delay(Duration::from_millis(200)).take_duration(Duration::from_millis(400)).amplify(0.1 * vol));
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_item_use() -> Result<(), String> {
    let sink = Sink::try_new(audio_handle()).map_err(|e| e.to_string())?;
    let vol = *SOUND_VOLUME.lock().unwrap();
    for i in 0..5u32 {
        let freq = 600.0 - (i as f32 * 50.0);
        sink.append(
            SineWave::new(freq)
                .take_duration(Duration::from_millis(20))
                .amplify((0.15 - (i as f32 * 0.02)) * vol),
        );
    }
    sink.detach();
    Ok(())
}

fn start_audio_monitoring() {
    std::thread::spawn(|| {
        let host = cpal::default_host();
        let device = match host.default_input_device() {
            Some(d) => d,
            None => { eprintln!("no input device available"); return; }
        };
        let config = match device.default_input_config() {
            Ok(c) => c,
            Err(e) => { eprintln!("failed to get default input config: {}", e); return; }
        };
        let stream = device.build_input_stream(
            &config.into(),
            |data: &[f32], _: &cpal::InputCallbackInfo| {
                let max = data.iter().map(|s| s.abs()).fold(0.0f32, f32::max);
                let mut p = PEAK_AMPLITUDE.lock().unwrap();
                if max > *p { *p = max; }
            },
            |err| eprintln!("audio stream error: {}", err),
            None,
        );
        match stream {
            Ok(s) => {
                if let Err(e) = s.play() { eprintln!("stream play error: {}", e); return; }
                loop { std::thread::sleep(Duration::from_millis(100)); }
            }
            Err(e) => eprintln!("failed to build audio stream: {}", e),
        }
    });
}

#[tauri::command]
fn get_focused_window_name() -> String {
    match active_win_pos_rs::get_active_window() {
        Ok(window) => window.app_name,
        Err(_) => String::new(),
    }
}

#[tauri::command]
async fn export_pet_data(data: String, path: String) -> Result<(), String> {
    use std::io::Write;
    let mut file = std::fs::File::create(&path)
        .map_err(|e| format!("Failed to create file: {}", e))?;
    file.write_all(data.as_bytes())
        .map_err(|e| format!("Failed to write data: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    start_audio_monitoring();
    tauri::Builder::default()
        .setup(|app| {
            let win: WebviewWindow = app.get_webview_window("main")
                .expect("main window missing");
            win.set_always_on_top(true).ok();
            win.center().ok();
            win.show().ok();
            win.set_focus().ok();
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_idle_time,
            set_always_on_top,
            set_ignore_cursor_events,
            get_mouse_position,
            get_sound_level,
            set_sound_volume,
            play_grumble,
            play_chirp,
            play_level_up,
            play_goal_reached,
            play_item_use,
            get_focused_window_name,
            export_pet_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
