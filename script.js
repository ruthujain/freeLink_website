const GenerativeAI = require('generative-ai-library');

// Configure the API key
GenerativeAI.configure({ apiKey: 'your-api-key' });

// Set up the model with generation configurations
const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 0,
  maxOutputTokens: 2048
};
]
const safetySettings = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  },
  // other safety settings...
];

const model = new GenerativeAI.GenerativeModel({
  modelName: 'gemini-1.0-pro',
  generationConfig,
  safetySettings
});

// Start a conversation
const convo = model.startChat([
  { role: 'user', parts: ['Hey'] },
  // other conversation history...
]);

// Send a message and retrieve the response
const response = convo.sendMessage('how are you?');
console.log(response.text);
