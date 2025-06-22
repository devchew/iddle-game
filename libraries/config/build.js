#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  { src: 'entities.yaml', dest: 'entities.json' },
  { src: 'research-tree.yaml', dest: 'research-tree.json' }
];

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Convert YAML files to JSON
files.forEach(file => {
  const srcPath = path.join(__dirname, file.src);
  const destPath = path.join(distDir, file.dest);
  
  try {
    // Read YAML
    const yamlContent = fs.readFileSync(srcPath, 'utf8');
    
    // Parse YAML to JS object
    const data = yaml.load(yamlContent);
    
    // Write JSON
    fs.writeFileSync(destPath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`✓ Converted ${file.src} to ${file.dest}`);
  } catch (error) {
    console.error(`Error processing ${file.src}:`, error);
    process.exit(1);
  }
});

console.log('YAML to JSON conversion complete!');
