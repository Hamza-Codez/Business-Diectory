const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'content'),
];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace plural first
  newContent = newContent.replace(/Articles/g, 'Blogs');
  newContent = newContent.replace(/articles/g, 'blogs');
  
  // Replace singular
  newContent = newContent.replace(/Article/g, 'Blog');
  newContent = newContent.replace(/article/g, 'blog');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (
      fullPath.endsWith('.ts') ||
      fullPath.endsWith('.tsx') ||
      fullPath.endsWith('.md') ||
      fullPath.endsWith('.json')
    ) {
      replaceInFile(fullPath);
    }
  }
}

for (const dir of targetDirs) {
  walkDir(dir);
}

console.log('Done.');
