from services.gpt import get_gpt_response
from tqdm import tqdm

def summerize_code(codeblock):
    # prompt = codeblock + "\n what does this above code do. make sure the summary does not exceeds 50 words \n"
    prompt = "Summarize the following code in 50 words or less:" + '\n' + codeblock
    code_summary = get_gpt_response(prompt)
    return code_summary

def summerize_parsed_code(parsed_code):
    for class_name, _ in parsed_code.items():
        parsed_class = parsed_code[class_name]
        for function_name, _ in tqdm(parsed_class.items()):
            if function_name == "__init__":
                continue
            parsed_function = parsed_class[function_name]
            code_block = parsed_function["code"]
            summary = summerize_code(code_block)
            parsed_function["summary"] = summary
    
    return parsed_code
