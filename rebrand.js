const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src');
const rootFiles = [path.join(__dirname, 'index.html'), path.join(__dirname, 'package.json')];

function replaceInFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    // 1. Text Replacements
    content = content.replace(/SmartLogics LLC/g, "Hassan Ali Murtaza");
    content = content.replace(/SmartLogics/g, "Hassan Ali Murtaza");
    
    content = content.replace(/An elite software engineering agency/g, "An elite software engineer");
    content = content.replace(/an elite software engineering agency/g, "an elite software engineer");
    
    // Some Hero/About specific replacements
    content = content.replace(/We engineer/g, "I engineer");
    content = content.replace(/We specialize/g, "I specialize");
    content = content.replace(/We provide/g, "I provide");
    content = content.replace(/We build/g, "I build");
    content = content.replace(/We are/g, "I am");
    content = content.replace(/Connect With Us/g, "Connect With Me");
    content = content.replace(/Agency Achievement/g, "Professional Achievement");
    content = content.replace(/Products Shipped/g, "Projects Delivered");
    content = content.replace(/Countries Served/g, "Happy Clients");
    content = content.replace(/Pioneers Since/g, "Engineer Since");
    
    content = content.replace(/smartlogicsllc\/30min/g, "smartlogicsllc/book-a-meeting-with-me");

    // 2. Color Replacements
    // Gold (#f0c27b) -> Cyan Blue (#00d2ff)
    content = content.replace(/#f0c27b/gi, "#00d2ff");
    // Deep Purple (#4b1248) -> Deep Blue (#004e9a)
    content = content.replace(/#4b1248/gi, "#004e9a");
    // Other variations in ThreeScene
    content = content.replace(/#205A94/gi, "#004e9a"); // was blue, make it matching blue
    content = content.replace(/#F0B95B/gi, "#00d2ff"); // was gold variant
    content = content.replace(/#d4A855/gi, "#00a2cc"); // dark gold variant
    // Obsidian (#0a0a0a) -> Pitch Black (#000000)
    content = content.replace(/#0a0a0a/gi, "#000000");

    // 3. ThreeScene S -> H, L -> M
    if (filepath.endsWith('ThreeScene.jsx')) {
        content = content.replace(/>\s*S\s*</g, ">H<");
        content = content.replace(/>\s*L\s*</g, ">M<");
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated: ${filepath}`);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
            replaceInFile(fullPath);
        }
    }
}

console.log("Starting rebranding...");
walk(targetDir);
rootFiles.forEach(replaceInFile);
console.log("Finished.");
