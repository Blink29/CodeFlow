from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

from main import get_repo_data

app = Flask(__name__)
CORS(app)

@app.route('/get_functions', methods=['GET'])
def get_functions():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL not provided."})
    local_path = "/Users/paurushkumar/Desktop/CodeFlow/empty" 
    get_repo_data(url, local_path)
    with open('parsed_data.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)