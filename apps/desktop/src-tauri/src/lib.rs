// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use rodio::{OutputStream, Sink, source::SineWave, Source};
use std::sync::{Arc, Mutex};
use std::time::Duration;

lazy_static::lazy_static! {
    static ref PEAK_AMPLITUDE: Arc<Mutex<f32>> = Arc::new(Mutex::new(0.0));
    static ref SOUND_VOLUME: Arc<Mutex<f32>> = Arc::new(Mutex::new(0.5));
    static ref AUDIO_OUTPUT: (OutputStream, rodio::OutputStreamHandle) = OutputStream::try_default().expect("failed to get default output device");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_idle_time() -> u64 {
    system_idle_time::get_idle_time().map(|d| d.as_millis() as u64).unwrap_or(0)
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
    match mouse_position::mouse::get_mouse_position() {
        mouse_position::mouse::Mouse::Position { x, y } => (x, y),
        _ => (0, 0),
    }
}

#[tauri::command]
fn get_sound_level() -> f32 {
    let mut peak = PEAK_AMPLITUDE.lock().unwrap();
    let val = *peak;
    *peak = 0.0; // Reset after reading
    val
}

#[tauri::command]
fn set_sound_volume(volume: f32) {
    let mut vol = SOUND_VOLUME.lock().unwrap();
    *vol = volume.clamp(0.0, 1.0);
}

#[tauri::command]
fn play_grumble() -> Result<(), String> {
    let handle = &AUDIO_OUTPUT.1;
    let sink = Sink::try_new(handle).map_err(|e| e.to_string())?;
    let global_vol = *SOUND_VOLUME.lock().unwrap();
    
    // Low frequency rumble
    let source = SineWave::new(80.0)
        .take_duration(Duration::from_millis(400))
        .amplify(0.2 * global_vol);
    
    sink.append(source);
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_chirp() -> Result<(), String> {
    let handle = &AUDIO_OUTPUT.1;
    let sink = Sink::try_new(handle).map_err(|e| e.to_string())?;
    let global_vol = *SOUND_VOLUME.lock().unwrap();
    
    // Quick high frequency chirp
    let source = SineWave::new(880.0)
        .take_duration(Duration::from_millis(150))
        .amplify(0.1 * global_vol);
    
    sink.append(source);
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_level_up() -> Result<(), String> {
    let handle = &AUDIO_OUTPUT.1;
    let sink = Sink::try_new(handle).map_err(|e| e.to_string())?;
    let global_vol = *SOUND_VOLUME.lock().unwrap();
    
    // Arpeggio C5, E5, G5, C6
    let notes = [523.25, 659.25, 783.99, 1046.50];
    for (i, &freq) in notes.iter().enumerate() {
        let source = SineWave::new(freq as f32)
            .delay(Duration::from_millis(i as u64 * 150))
            .take_duration(Duration::from_millis(300))
            .amplify(0.08 * global_vol);
        sink.append(source);
    }
    
    // Final sparkle
    let sparkle = SineWave::new(1760.0)
        .delay(Duration::from_millis(notes.len() as u64 * 150))
        .take_duration(Duration::from_millis(600))
        .amplify(0.04 * global_vol);
    sink.append(sparkle);
    
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_goal_reached() -> Result<(), String> {
    let handle = &AUDIO_OUTPUT.1;
    let sink = Sink::try_new(handle).map_err(|e| e.to_string())?;
    let global_vol = *SOUND_VOLUME.lock().unwrap();
    
    // Two-tone success sound
    let source1 = SineWave::new(659.25) // E5
        .take_duration(Duration::from_millis(200))
        .amplify(0.1 * global_vol);
    let source2 = SineWave::new(880.0) // A5
        .delay(Duration::from_millis(200))
        .take_duration(Duration::from_millis(400))
        .amplify(0.1 * global_vol);
    
    sink.append(source1);
    sink.append(source2);
    sink.detach();
    Ok(())
}

#[tauri::command]
fn play_item_use() -> Result<(), String> {
    let handle = &AUDIO_OUTPUT.1;
    let sink = Sink::try_new(handle).map_err(|e| e.to_string())?;
    let global_vol = *SOUND_VOLUME.lock().unwrap();
    
    // Quick "pop" sound: descending sine wave
    for i in 0..5 {
        let freq = 600.0 - (i as f32 * 50.0);
        let source = SineWave::new(freq)
            .take_duration(Duration::from_millis(20))
            .amplify((0.15 - (i as f32 * 0.02)) * global_vol);
        sink.append(source);
    }
    
    sink.detach();
    Ok(())
}

fn start_audio_monitoring() {
    std::thread::spawn(|| {
        let host = cpal::default_host();
        let device = match host.default_input_device() {
            Some(d) => d,
            None => {
                eprintln!("no input device available");
                return;
            }
        };
        let config = match device.default_input_config() {
            Ok(c) => c,
            Err(e) => {
                eprintln!("failed to get default input config: {}", e);
                return;
            }
        };

        let peak_amplitude = Arc::clone(&PEAK_AMPLITUDE);
        let stream = device.build_input_stream(
            &config.into(),
            move |data: &[f32], _: &cpal::InputCallbackInfo| {
                let mut max = 0.0;
                for &sample in data {
                    let abs = sample.abs();
                    if abs > max {
                        max = abs;
                    }
                }
                let mut peak = peak_amplitude.lock().unwrap();
                if max > *peak {
                    *peak = max;
                }
            },
            |err| eprintln!("audio stream error: {}", err),
            None
        ).expect("failed to build audio stream");

        stream.play().expect("failed to play audio stream");
        loop {
            std::thread::sleep(Duration::from_millis(100));
        }
    });
}

#[tauri::command]
fn get_focused_window_name() -> String {
    match active_win_pos_rs::get_active_window() {
        Ok(window) => window.app_name,
        Err(_) => "".to_string(),
    }
}

#[tauri::command]
async fn export_pet_data(data: String, path: String) -> Result<(), String> {
    use std::fs::File;
    use std::io::Write;
    
    let mut file = File::create(&path)
        .map_err(|e| format!("Failed to create file: {}", e))?;
    
    file.write_all(data.as_bytes())
        .map_err(|e| format!("Failed to write data: {}", e))?;
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    start_audio_monitoring();
    tauri::Builder::default()
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
            export_pet_data
            ])

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
