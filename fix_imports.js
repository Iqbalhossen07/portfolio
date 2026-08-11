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

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;

  // Fix react-router imports
  content = content.replace(/import\s+{\s*Link\s*}\s+from\s+["']react-router["'];?/g, 'import Link from "next/link";');
  content = content.replace(/import\s+{\s*Link\s*,\s*useParams\s*}\s+from\s+["']react-router-dom["'];?/g, 'import Link from "next/link";\nimport { useParams } from "next/navigation";');
  content = content.replace(/import\s+{\s*useLocation\s*}\s+from\s+["']react-router-dom["'];?/g, 'import { usePathname } from "next/navigation";');
  
  // Replace useLocation() with usePathname()
  content = content.replace(/useLocation\(\)/g, 'usePathname()');
  // ScrollToTop specific fix since useLocation().pathname doesn't work with usePathname() (usePathname returns a string, useLocation returns an object)
  content = content.replace(/const { pathname } = usePathname\(\);/g, 'const pathname = usePathname();');
  content = content.replace(/const { pathname } = useLocation\(\);/g, 'const pathname = usePathname();');
  
  // Particles fix
  // The user's code uses initParticlesEngine. In older versions or newer versions, this might fail.
  // Actually, tsparticles v3 uses initParticlesEngine, but maybe it failed due to some version mismatch.
  // Let's remove initParticlesEngine and use the v2 compatible way if v3 failed, OR just use initParticlesEngine correctly.
  // Wait, the Next.js error said: "Export initParticlesEngine doesn't exist in target module @tsparticles/react".
  // This means the installed version is likely v2 (where the package was react-tsparticles).
  // I installed @tsparticles/react which is v3.
  // Wait, v3 of @tsparticles/react DOES export initParticlesEngine. Let me check the ParticlesBackground.jsx
  
  if (content !== originalContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated: ${filepath}`);
  }
}

targetDirs.forEach(dir => walkSync(dir, fixFile));
console.log('Fix complete.');
