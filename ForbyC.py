"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import google.generativeai as genai

genai.configure(api_key="AIzaSyD5gpgWHQ9C7PdhWsQi-ChJWf09k9PwL6w")

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 0,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["Hey"]
  },
  {
    "role": "model",
    "parts": ["Hello! 👋  Welcome to freeLink. What can I help you with today? 😊"]
  },
  {
    "role": "user",
    "parts": ["Recommend frontend dev"]
  },
  {
    "role": "model",
    "parts": ["I recommend **Bhumika**. You can find her work on GitHub: https://github.com/BhumikaCP \n\nLet me know if you have any other questions or need further assistance!"]
  },
  {
    "role": "user",
    "parts": ["Also backend"]
  },
  {
    "role": "model",
    "parts": ["For backend development, I recommend **Saran**.  You can find his work on GitHub: github.com/imsarann \n\nI hope this helps! Let me know if you have any other questions."]
  },
  {
    "role": "user",
    "parts": ["And full stack and uiux?"]
  },
  {
    "role": "model",
    "parts": ["For a full-stack developer, I recommend **Sujith**. His GitHub is: github.com/Sujith394\n\nAnd for UI/UX design, I suggest **Ruthu**. Her GitHub is: github.com/ruthujain \n\nFeel free to ask if you need any more recommendations! 😊"]
  },
  {
    "role": "user",
    "parts": ["Thanks"]
  },
  {
    "role": "model",
    "parts": ["No problem! Glad I could help.  Good luck with your project! 😊"]
  },
])

convo.send_message("how are you?")
print(convo.last.text)