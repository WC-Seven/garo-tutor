import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

export function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <View style={[styles.wrapper, isUser ? styles.wrapperUser : styles.wrapperBot]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.role, isUser ? styles.userRole : styles.botRole]}>
          {isUser ? "You" : "Tutor"}
        </Text>
        <Text style={[styles.content, isUser ? styles.userContent : styles.botContent]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  wrapperUser: {
    alignItems: "flex-end",
  },
  wrapperBot: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "88%",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
  },
  botBubble: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  role: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  userRole: {
    color: theme.colors.primaryContrast,
  },
  botRole: {
    color: theme.colors.primary,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  userContent: {
    color: theme.colors.primaryContrast,
  },
  botContent: {
    color: theme.colors.text,
  },
});
