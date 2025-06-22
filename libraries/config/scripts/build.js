#!/usr/bin/env node
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const configsDir = path.join(__dirname, "..", "configs");
const distDir = path.join(__dirname, "..", "src");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
	fs.mkdirSync(distDir, { recursive: true });
}

// Read all YAML files from configs directory
const yamlFiles = fs.readdirSync(configsDir)
	.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));

// Create a combined object to hold all configuration data
let combinedConfig = {};

// Custom merge function to handle array concatenation
function mergeConfigs(target, source) {
    for (const key in source) {
        if (Array.isArray(source[key])) {
            // If key exists in target and is an array, concatenate arrays
            if (Array.isArray(target[key])) {
                target[key] = target[key].concat(source[key]);
            } else {
                // If key doesn't exist or isn't an array, set it
                target[key] = source[key];
            }
        } else if (typeof source[key] === 'object' && source[key] !== null) {
            // For nested objects, recursively merge
            target[key] = target[key] || {};
            mergeConfigs(target[key], source[key]);
        } else {
            // For primitive values, overwrite
            target[key] = source[key];
        }
    }
    return target;
}

// Process each YAML file
yamlFiles.forEach((yamlFile) => {
	try {
		const srcPath = path.join(configsDir, yamlFile);
		const baseName = path.basename(yamlFile, path.extname(yamlFile));
		
		// Read and parse YAML
		const yamlContent = fs.readFileSync(srcPath, "utf8");
		const data = yaml.load(yamlContent);
		
		// Add to combined object using our custom merge function
		mergeConfigs(combinedConfig, data);
		
		// Also write individual JSON files if needed
		// const individualDestPath = path.join(distDir, `${baseName}.json`);
		// fs.writeFileSync(individualDestPath, JSON.stringify(data, null, 2), "utf8");
		
		console.log(`✓ Processed ${yamlFile}`);
	} catch (error) {
		console.error(`Error processing ${yamlFile}:`, error);
		process.exit(1);
	}
});

// Write the combined JSON file
const combinedDestPath = path.join(distDir, "combined-config.json");
fs.writeFileSync(combinedDestPath, JSON.stringify(combinedConfig, null, 2), "utf8");
console.log(`✓ Created combined-config.json with all configurations`);

console.log("YAML to JSON conversion complete!");
