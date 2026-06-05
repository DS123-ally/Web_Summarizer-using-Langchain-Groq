const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replacement) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content.replace(searchRegex, replacement);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let newContent = content;

  // Replace react-router-dom imports
  newContent = newContent.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"]/g, (match, p1) => {
    let imports = p1.split(',').map(s => s.trim());
    let nextImports = [];
    let navImports = [];

    if (imports.includes('Link') || imports.includes('NavLink')) {
      nextImports.push('Link');
    }
    if (imports.includes('useNavigate')) {
      navImports.push('useRouter');
    }
    if (imports.includes('useLocation')) {
      navImports.push('usePathname');
    }

    let out = '';
    if (nextImports.length > 0) out += `import Link from 'next/link';\n`;
    if (navImports.length > 0) out += `import { ${navImports.join(', ')} } from 'next/navigation';\n`;
    return out.trim();
  });

  // Replace NavLink with Link
  newContent = newContent.replace(/<NavLink/g, '<Link');
  newContent = newContent.replace(/<\/NavLink>/g, '</Link>');

  // Replace useNavigate with useRouter
  newContent = newContent.replace(/useNavigate\(\)/g, 'useRouter()');

  // Replace useLocation with usePathname
  newContent = newContent.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  newContent = newContent.replace(/location\.pathname/g, 'pathname');

  // Next.js Link uses 'href' instead of 'to'
  newContent = newContent.replace(/<Link([^>]*)to=/g, '<Link$1href=');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`Migrated ${file}`);
  }
});

// Create Next.js app routes
const appDir = path.join(__dirname, 'app');
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);

function createRoute(routePath, pageComponent, relativePath) {
  const dir = path.join(appDir, routePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const content = `"use client";\nimport PageComponent from '${relativePath}';\n\nexport default function Page() {\n  return <PageComponent />;\n}\n`;
  fs.writeFileSync(path.join(dir, 'page.jsx'), content);
}

createRoute('', '../../src/pages/HomePage', '../../src/pages/HomePage');
createRoute('features', '../../../src/pages/FeaturesPage', '../../../src/pages/FeaturesPage');
createRoute('about', '../../../src/pages/AboutPage', '../../../src/pages/AboutPage');
createRoute('login', '../../../src/pages/LoginPage', '../../../src/pages/LoginPage');
createRoute('signup', '../../../src/pages/SignupPage', '../../../src/pages/SignupPage');
createRoute('dashboard', '../../../src/pages/DashboardPage', '../../../src/pages/DashboardPage');

console.log('App routes created.');
