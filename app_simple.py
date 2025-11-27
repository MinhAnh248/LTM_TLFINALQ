from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({'message': 'Simple Flask app is running', 'status': 'ok'})

@app.route('/api/test')
def test():
    return jsonify({'message': 'API test successful', 'status': 'ok'})

if __name__ == '__main__':
    import os
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)