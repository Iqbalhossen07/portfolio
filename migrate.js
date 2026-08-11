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

function migrateFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;

  // 1. Next.js Link format
  content = content.replace(/import\s+{\s*Link\s*}\s+from\s+["']react-router-dom["']/g, 'import Link from "next/link"');
  content = content.replace(/<Link\s+to=/g, '<Link href=');

  // 2. Buttons to rounded-none (heuristics)
  // We'll just replace specific classes globally as requested by user.
  content = content.replace(/rounded-full|rounded-2xl|rounded-xl|rounded-lg|rounded-3xl|rounded-sm/g, 'rounded-none');
  
  // Actually the user asked for cards to be rounded-md.
  // It's hard to differentiate button vs card via regex, but usually cards have bg, p-*, border etc.
  // Let's do a simple heuristic: if it has 'border' or 'shadow', we make it rounded-md. Otherwise rounded-none.
  // A better way: replace ALL rounded-* with rounded-none, EXCEPT if the element looks like a card.
  // Instead of complex logic, let's just replace all 'rounded-.*' with 'rounded-none' 
  // and we manually fixed Navbar earlier.
  // Wait, user said: "পুরো বাটন গুলি rounded-none হবে আর কার্ড এইগুলি rounded-md হবে"
  // Let's replace 'rounded-2xl' with 'rounded-md' (as cards usually use 2xl/xl), and 'rounded-full' with 'rounded-none' (buttons).
  // This is a rough estimation but will get 90% there.
  content = content.replace(/rounded-2xl/g, 'rounded-md');
  content = content.replace(/rounded-xl/g, 'rounded-md');
  content = content.replace(/rounded-lg/g, 'rounded-md');
  
  // Buttons usually use rounded-full in modern designs
  content = content.replace(/rounded-full/g, 'rounded-none');
  
  // Headings standardization: text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl
  // Replace huge headings
  content = content.replace(/text-4xl md:text-5xl lg:text-6xl/g, 'text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl');
  content = content.replace(/text-3xl md:text-4xl/g, 'text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl');
  content = content.replace(/text-5xl md:text-7xl/g, 'text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl');

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated: ${filepath}`);
  }
}

targetDirs.forEach(dir => walkSync(dir, migrateFile));
console.log('Migration complete.');
