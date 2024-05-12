# chatbot.py
from flask import Flask, request, jsonify

app = Flask(__name__)

# Your Gemini API interaction logic here
def process_query(query):
    # Dummy response for demonstration
    response = "Received query: " + query
    return response

@app.route('/query', methods=['POST'])
def handle_query():
    query = request.json['query']
    response = process_query(query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
