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

function addUseClient(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // If already has use client, skip
  if (content.includes('"use client"') || content.includes("'use client'")) {
    return;
  }

  // Check if it uses client-side hooks or browser APIs
  const needsUseClient = /useState|useEffect|useRef|framer-motion|window\.|document\./.test(content);
  
  if (needsUseClient) {
    content = '"use client";\n\n' + content;
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Added "use client" to: ${filepath}`);
  }
}

targetDirs.forEach(dir => walkSync(dir, addUseClient));
console.log('use_client script complete.');
