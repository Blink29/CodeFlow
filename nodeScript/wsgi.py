from flask import Flask, jsonify, request
import json

from main import get_repo_raw_urls
from read_urls import get_final_output_json

app = Flask(__name__)

@app.route('/get_functions', methods=['GET'])
def get_functions():
    url = request.args.get('url')
    get_repo_raw_urls(url)
    if not url:
        return jsonify({"error": "URL not provided."})
    get_final_output_json()
    with open('output.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)