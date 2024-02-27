import json
def calculate_function_ratings(data):
    function_call_counts = {}

    for entry in data:
        for function_called in entry["functions_called"]:
            if function_called not in function_call_counts:
                function_call_counts[function_called] = 0
            function_call_counts[function_called] += 1

    max_calls = max(function_call_counts.values()) if function_call_counts else 1

    function_ratings = {}
    for entry in data:
        function_id = entry["id"]
        if function_id in function_call_counts:
            rating = function_call_counts[function_id] / max_calls
        else:
            rating = 0
        function_ratings[function_id] = rating

    return function_ratings



with open('output.json', 'r') as f:
    data = json.load(f)

function_ratings = calculate_function_ratings(data)

for entry in data:
    function_id = entry["id"]
    entry["function_rating"] = function_ratings.get(function_id, 0)

def write_output_to_json(output_data, output_file):
    with open(output_file, "w") as file:
        json.dump(output_data, file, indent=2)

write_output_to_json(data, "output.json")




