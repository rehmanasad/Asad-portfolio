import os
import re

target_dirs = [os.path.join(os.getcwd(), 'src'), os.path.join(os.getcwd(), 'public')]
root_files = [
    os.path.join(os.getcwd(), 'index.html'), 
    os.path.join(os.getcwd(), 'package.json'),
    os.path.join(os.getcwd(), 'README.md')
]

def replace_in_file(filepath):
    if not os.path.exists(filepath):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return
        
    original = content

    # Use regex to catch all case variants of smartlogics
    
    # 1. Links
    content = re.sub(r'smartlogicsllc\.com', 'hassanali.com', content, flags=re.IGNORECASE)
    content = re.sub(r'smartlogicsllc', 'hassanali', content, flags=re.IGNORECASE)
    
    # 2. Name itself (we want to catch "Smartlogics", "smartlogics", "SMARTLOGICS")
    # But carefully avoid replacing it if it was part of a url already caught above. Lookarounds might be risky.
    # Just do a generic replace.
    content = re.sub(r'SmartLogics LLC Technologies', 'Hassan Ali Murtaza', content, flags=re.IGNORECASE)
    content = re.sub(r'SmartLogics LLC', 'Hassan Ali Murtaza', content, flags=re.IGNORECASE)
    content = re.sub(r'\bSmartlogics\b', 'Hassan Ali Murtaza', content, flags=re.IGNORECASE)

    # 3. Agency Copy Adjustments
    content = re.sub(r'\bour team\b', 'me', content, flags=re.IGNORECASE)
    content = re.sub(r'\ban elite software engineering agency\b', 'an elite software engineer', content, flags=re.IGNORECASE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated case-variations: {filepath}")

def walk(dir):
    if not os.path.exists(dir):
        return
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html', '.json', '.xml', '.txt', '.md')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    print("Starting deep scrub rebranding...")
    for d in target_dirs:
        walk(d)
    for rf in root_files:
        replace_in_file(rf)
    print("Deep scrub finished.")
