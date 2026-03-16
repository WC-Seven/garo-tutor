import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { MessageBubble } from "../components/MessageBubble";
import { sendChatMessage } from "../services/api";
import { speakText } from "../services/audioService";
import { theme } from "../theme/theme";

export function ChatScreen({ route }) {
  const profile = route.params?.profile ?? {};
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: createWelcomeMessage(profile),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const headerSummary = useMemo(() => {
    const details = [profile.area, profile.role, profile.level].filter(Boolean);
    return details.length > 0 ? details.join(" . ") : "Perfil basico";
  }, [profile.area, profile.level, profile.role]);

  async function handleSend() {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage({
        message: trimmedInput,
        profile,
        conversationHistory: nextMessages.map(({ role, content }) => ({
          role,
          content,
        })),
      });

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.reply,
      };

      setMessages((current) => [...current, assistantMessage]);
      speakText(response.reply);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "Nao foi possivel falar com a API agora. Verifique a configuracao do endpoint e tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            {profile.name ? `Sessao de ${profile.name}` : "Sessao de pratica"}
          </Text>
          <Text style={styles.headerText}>{headerSummary}</Text>
          <Text style={styles.headerText}>
            Objetivo: {profile.goals || "Ganhar fluencia em conversas profissionais"}
          </Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messages}
        />

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem em ingles"
            placeholderTextColor={theme.colors.muted}
            multiline
          />
          <Pressable
            onPress={handleSend}
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.primaryContrast} />
            ) : (
              <Text style={styles.sendButtonText}>Enviar</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function createWelcomeMessage(profile) {
  const name = profile.name || "aluno";
  const role = profile.role || "sua area";

  return `Hi ${name}, I will help you practice English for ${role}. Start by introducing yourself in one short paragraph.`;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  headerCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  headerText: {
    color: theme.colors.secondaryText,
    fontSize: 14,
    lineHeight: 20,
  },
  messages: {
    paddingBottom: 12,
    gap: 12,
  },
  composer: {
    gap: 12,
  },
  input: {
    minHeight: 100,
    maxHeight: 160,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.input,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: theme.colors.text,
    fontSize: 16,
    textAlignVertical: "top",
  },
  sendButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: theme.colors.primaryContrast,
    fontSize: 16,
    fontWeight: "800",
  },
});
