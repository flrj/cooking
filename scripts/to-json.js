#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const recipesDir = '_recipes';
const outputFile = '_data/recipes.json';

function markdownToJson(markdownPath) {
  const content = fs.readFileSync(markdownPath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!match) return null;
  
  const frontmatter = yaml.load(match[1]);
  const slug = path.basename(markdownPath, '.md');
  
  return {
    slug,
    ...frontmatter
  };
}

function main() {
  const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md'));
  const recipes = files.map(f => markdownToJson(path.join(recipesDir, f))).filter(Boolean);
  
  fs.writeFileSync(outputFile, JSON.stringify({ recipes }, null, 2));
  console.log(`Exported ${recipes.length} recipes to ${outputFile}`);
}

main();
