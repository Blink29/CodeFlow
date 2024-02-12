from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/functions', methods=['GET'])
def get_functions():
    with open('output.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)