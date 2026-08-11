const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages')
];

function walkSync(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && filepath.endsWith('.jsx')) {
      callback(filepath);
    }
  });
}

function addUseClientAll(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  if (content.includes('"use client"') || content.includes("'use client'")) {
    return;
  }

  // Just add it to ALL .jsx files to ensure no more "Event handler" errors
  content = '"use client";\n\n' + content;
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Added "use client" to: ${filepath}`);
}

targetDirs.forEach(dir => walkSync(dir, addUseClientAll));
console.log('Force use_client script complete.');
