import g4f

g4f.debug.logging = True 
g4f.check_version = False  

def get_gpt_response(content):
    response = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4,
        messages=[{"role": "user", "content": content}],
    )
    return response