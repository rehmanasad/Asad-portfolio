import os
import re

target_dir = os.path.join(os.getcwd(), 'src')

def replace_in_file(filepath):
    if not os.path.exists(filepath):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return
        
    original = content

    # Broad strokes
    content = re.sub(r'(?i)\bour team\b', 'I', content)
    content = re.sub(r'(?i)\bthe team\b', 'I', content)
    content = re.sub(r'(?i)\ba dedicated team\b', 'dedicated expertise', content)
    content = re.sub(r'(?i)\bteam of experts\b', 'expert', content)
    content = re.sub(r'(?i)\bagency\b', 'developer', content) # Might be risky, but appropriate for portfolio
    
    # Specific plural shifts
    content = re.sub(r'\bWe \b', 'I ', content)
    content = re.sub(r'\bwe \b', 'I ', content)
    content = re.sub(r'\bUs\b', 'Me', content)
    content = re.sub(r'\bus\b', 'me', content)
    content = re.sub(r'\bOur \b', 'My ', content)
    content = re.sub(r'\bour \b', 'my ', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Swept: {filepath}")

def walk(dir):
    if not os.path.exists(dir):
        return
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith(('.jsx', '.js', '.html')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    print("Starting final sweep...")
    walk(target_dir)
    print("Sweep finished.")
