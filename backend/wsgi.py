from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

from main import get_repo_raw_urls
from read_urls import get_final_output_json

app = Flask(__name__)
CORS(app)

@app.route('/get_functions', methods=['GET'])
def get_functions():
    # url = request.args.get('url')
    get_repo_raw_urls("https://github.com/allrod5/pycollect")
    # if not url:
    #     return jsonify({"error": "URL not provided."})
    get_final_output_json()
    with open('output.json', 'r') as f:
        data = json.load(f)
    # os.remove('output.json')
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)