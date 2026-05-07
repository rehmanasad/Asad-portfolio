import os
import re

target_dir = os.path.join(os.getcwd(), 'src')
root_files = [os.path.join(os.getcwd(), 'index.html'), os.path.join(os.getcwd(), 'package.json')]

def replace_in_file(filepath):
    if not os.path.exists(filepath):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return
        
    original = content

    # 1. Text Replacements
    content = content.replace("SmartLogics LLC", "Hassan Ali Murtaza")
    content = content.replace("SmartLogics", "Hassan Ali Murtaza")
    
    content = content.replace("An elite software engineering agency", "An elite software engineer")
    content = content.replace("an elite software engineering agency", "an elite software engineer")
    
    content = content.replace("We engineer", "I engineer")
    content = content.replace("We specialize", "I specialize")
    content = content.replace("We provide", "I provide")
    content = content.replace("We build", "I build")
    content = content.replace("We are", "I am")
    content = content.replace("Connect With Us", "Connect With Me")
    content = content.replace("Agency Achievement", "Professional Achievement")
    content = content.replace("Products Shipped", "Projects Delivered")
    content = content.replace("Countries Served", "Happy Clients")
    content = content.replace("Pioneers Since", "Engineer Since")
    
    content = content.replace("smartlogicsllc/30min", "smartlogicsllc/book-a-meeting-with-me")

    # 2. Color Replacements (case insensitive replace)
    def repl_nocase(pattern, replacement, string):
        return re.sub(re.escape(pattern), replacement, string, flags=re.IGNORECASE)

    content = repl_nocase("#f0c27b", "#00d2ff", content)
    content = repl_nocase("#4b1248", "#004e9a", content)
    content = repl_nocase("#205A94", "#004e9a", content)
    content = repl_nocase("#F0B95B", "#00d2ff", content)
    content = repl_nocase("#d4A855", "#00a2cc", content)
    content = repl_nocase("#0a0a0a", "#000000", content)

    # 3. ThreeScene S -> H, L -> M
    if filepath.endswith('ThreeScene.jsx'):
        content = re.sub(r'>\s*S\s*<', '>H<', content)
        content = re.sub(r'>\s*L\s*<', '>M<', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def walk(dir):
    if not os.path.exists(dir):
        return
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    print("Starting rebranding...")
    walk(target_dir)
    for rf in root_files:
        replace_in_file(rf)
    print("Finished.")
