import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createProfile } from "../services/api";
import { theme } from "../theme/theme";

const englishLevelOptions = [
  { label: "Iniciante", value: "beginner" },
  { label: "Basico", value: "basic" },
  { label: "Intermediario", value: "intermediate" },
  { label: "Avancado", value: "advanced" },
];

const initialProfile = {
  name: "",
  area: "",
  role: "",
  level: "",
  goals: "",
};

export function OnboardingScreen({ navigation }) {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field, value) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleStart() {
    if (loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const createdProfile = await createProfile(profile);
      navigation.navigate("Chat", { profile: createdProfile });
    } catch (error) {
      setErrorMessage(
        "Nao foi possivel criar seu perfil na API. Verifique a URL do backend e se o banco esta disponivel."
      );
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !profile.name || !profile.area || !profile.role || !profile.level || !profile.goals;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Garo Tutor</Text>
            <Text style={styles.title}>Pratique ingles para conversas reais de trabalho.</Text>
            <Text style={styles.description}>
              Preencha seu perfil para iniciar simulacoes mais proximas da sua rotina.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Nome"
              placeholder="Como voce quer ser chamado"
              value={profile.name}
              onChangeText={(value) => updateField("name", value)}
            />
            <Field
              label="Area"
              placeholder="Ex.: TI"
              value={profile.area}
              onChangeText={(value) => updateField("area", value)}
            />
            <Field
              label="Cargo"
              placeholder="Ex.: Desenvolvedor React Native"
              value={profile.role}
              onChangeText={(value) => updateField("role", value)}
            />
            <View style={styles.field}>
              <Text style={styles.label}>Nivel de ingles</Text>
              <View style={styles.optionsGrid}>
                {englishLevelOptions.map((option) => {
                  const selected = profile.level === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => updateField("level", option.value)}
                      style={[styles.optionButton, selected && styles.optionButtonSelected]}
                    >
                      <Text
                        style={[styles.optionButtonText, selected && styles.optionButtonTextSelected]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <Field
              label="Objetivo principal"
              placeholder="Ex.: entrevistas tecnicas e dailies"
              value={profile.goals}
              onChangeText={(value) => updateField("goals", value)}
              multiline
            />
          </View>

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <Pressable
            onPress={handleStart}
            disabled={isDisabled || loading}
            style={[styles.button, (isDisabled || loading) && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>{loading ? "Conectando..." : "Comecar pratica"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, multiline = false, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholderTextColor={theme.colors.muted}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: 24,
    gap: 24,
  },
  hero: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },
  description: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  optionButton: {
    minHeight: 48,
    minWidth: "47%",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 16,
    backgroundColor: theme.colors.input,
    alignItems: "center",
    justifyContent: "center",
  },
  optionButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  optionButtonTextSelected: {
    color: theme.colors.primaryContrast,
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 16,
    backgroundColor: theme.colors.input,
    paddingHorizontal: 16,
    color: theme.colors.text,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 120,
    paddingVertical: 16,
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: theme.colors.primaryContrast,
    fontSize: 16,
    fontWeight: "800",
  },
  errorMessage: {
    color: "#a63f2e",
    fontSize: 14,
    lineHeight: 20,
  },
});
