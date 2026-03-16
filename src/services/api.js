import Constants from "expo-constants";
import axios from "axios";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api";

const client = axios.create({
  baseURL,
  timeout: 15000,
});

export async function sendChatMessage(payload) {
  const { data } = await client.post("/chat/message", payload);

  if (typeof data?.message !== "string") {
    throw new Error("Invalid chat response");
  }

  return {
    reply: data.message,
    success: Boolean(data.success),
    usage: data.usage ?? null,
  };
}

export async function createProfile(profile) {
  const { data } = await client.post("/profile/create", profile);

  if (!data?.profile) {
    throw new Error("Invalid profile response");
  }

  return data.profile;
}

export async function transcribeAudio(audioBase64) {
  const { data } = await client.post("/chat/transcribe", {
    audioBase64,
  });

  return data;
}
