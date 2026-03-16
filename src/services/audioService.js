import * as Speech from "expo-speech";

export function speakText(text) {
  if (!text) {
    return;
  }

  Speech.stop();
  Speech.speak(text, {
    language: "en-US",
    rate: 0.95,
  });
}

export async function startRecording() {
  throw new Error("Audio recording is not implemented yet.");
}

export async function stopRecording() {
  throw new Error("Audio recording is not implemented yet.");
}
