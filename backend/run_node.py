import subprocess

node_process = subprocess.Popen(['node', 'index.js'], stdout=subprocess.PIPE, text=True)

stdout, _ = node_process.communicate()

print(stdout)

if node_process.returncode == 0:
    print("Node.js script executed successfully.")
else:
    print(f"Error: Node.js script exited with code {node_process.returncode}.")
