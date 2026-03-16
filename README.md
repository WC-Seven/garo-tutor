# Garo Tutor Mobile

App mobile em React Native + Expo para praticar ingles conversacional em contexto profissional.

## Escopo

Este repositorio contem apenas o cliente mobile.

A API usada pelo app esta em outro projeto e, segundo a documentacao atual, roda em desenvolvimento local em `http://localhost:5000/api`.

## Fluxo atual

1. O usuario preenche `name`, `area`, `role`, `level` e `goals`.
2. O app tenta criar o perfil em `POST /profile/create`.
3. O app abre a tela de chat com o perfil retornado pela API.
4. Cada mensagem enviada chama `POST /chat/message`.
5. A resposta do tutor e exibida e lida com text-to-speech.

## Estrutura

```text
garo-tutor/
|-- App.jsx
|-- app.json
|-- babel.config.js
|-- package.json
`-- src/
    |-- components/
    |   `-- MessageBubble.jsx
    |-- navigation/
    |   `-- AppNavigator.jsx
    |-- screens/
    |   |-- ChatScreen.jsx
    |   `-- OnboardingScreen.jsx
    |-- services/
    |   |-- api.js
    |   `-- audioService.js
    `-- theme/
        `-- theme.js
```

## Configuracao da API

Base URL atual em [app.json](C:\dev_local\html\tutor\garo-tutor\app.json):

```json
{
  "expo": {
    "extra": {
      "apiBaseUrl": "http://localhost:5000/api"
    }
  }
}
```

Se for testar em celular fisico, troque `localhost` pelo IP da maquina na rede local.

## Contrato usado pelo app

Criacao de perfil:

```http
POST /profile/create
```

Payload:

```json
{
  "name": "Wellington",
  "area": "TI",
  "role": "Programador Node/React",
  "level": "intermediate",
  "goals": "Conversar em entrevistas tecnicas e dailies"
}
```

Chat:

```http
POST /chat/message
```

Payload:

```json
{
  "message": "How do I explain REST APIs in English?",
  "profile": {
    "id": 1710604800000,
    "name": "Wellington",
    "area": "TI",
    "role": "Programador Node/React",
    "level": "intermediate",
    "goals": "Conversar em entrevistas tecnicas"
  },
  "conversationHistory": [
    {
      "role": "assistant",
      "content": "Hello Wellington! I'm your English tutor..."
    }
  ]
}
```

Resposta esperada:

```json
{
  "success": true,
  "message": "A REST API is an architectural style..."
}
```

Transcricao:

```http
POST /chat/transcribe
```

Payload:

```json
{
  "audioBase64": "UklGRiYAAABXQVZFZm10IBAAAAABAAEA..."
}
```

## Como rodar

Instale as dependencias:

```bash
npm install
```

Inicie o app:

```bash
npm start
```

Depois:

- escaneie o QR code com o Expo Go
- ou pressione `a` para Android
- ou pressione `i` para iOS, se estiver em ambiente compativel

## Proximos passos

- implementar gravacao de audio com `expo-av`
- enviar o audio gravado para `POST /chat/transcribe`
- persistir perfil e historico localmente
- melhorar exibicao de erros da API
