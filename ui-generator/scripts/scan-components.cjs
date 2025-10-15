/*
  Component scanner and template generator (CommonJS)
*/
const fs = require('fs');
const path = require('path');

const SCAN_PATHS = [
  'React-UI-Collection/src/components',
  'React-UI-Collection/src',
  'src/components',
];
const REGISTRY_FILE = path.normalize('ui-generator/component-registry.json');
const REGISTRY_DIR = path.dirname(REGISTRY_FILE);
const TEMPLATES_DIR = path.normalize('ui-generator/templates/components');
const REPORTS_DIR = path.normalize('ui-generator/reports');
const TESTS_DIR = path.normalize('ui-generator/tests');

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}
function isPascalCase(filename) {
  const base = path.basename(filename, path.extname(filename));
  return /^[A-Z][A-Za-z0-9]*$/.test(base);
}
function listFilesRecursive(startDir, exts) {
  const results = [];
  if (!fs.existsSync(startDir)) return results;
  const stack = [startDir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(p);
      else if (exts.includes(path.extname(p).toLowerCase())) results.push(p);
    }
  }
  return results;
}
function readFileSafe(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }
function toKebab(str) { return (str||'').replace(/([a-z])([A-Z])/g,'$1-$2').replace(/\s+/g,'-').toLowerCase(); }
function unique(arr) { return Array.from(new Set(arr.filter(Boolean))); }
function extractExportInfo(source) {
  const hasDefaultExport = /export\s+default\s+(function|class|\(|[A-Za-z_])/m.test(source);
  const namedExports = Array.from(source.matchAll(/export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g)).map(m=>m[1]);
  return { exportName: hasDefaultExport ? 'default' : (namedExports[0] || 'default'), namedExports };
}
function extractComponentName(filePath, source) {
  const defaultFunc = source.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  if (defaultFunc) return defaultFunc[1];
  const namedFunc = source.match(/export\s+function\s+([A-Za-z0-9_]+)/);
  if (namedFunc) return namedFunc[1];
  const namedConst = source.match(/export\s+const\s+([A-Za-z0-9_]+)\s*=\s*\(/);
  if (namedConst) return namedConst[1];
  return path.basename(filePath, path.extname(filePath));
}
function extractProps(source) {
  const props = [];
  const paramMatch = source.match(/\(\s*\{([\s\S]*?)\}\s*\:?[\s\S]*?\)/);
  if (paramMatch) {
    const fields = paramMatch[1].split(',').map(s=>s.trim()).filter(Boolean);
    for (const f of fields) {
      const nameMatch = f.match(/([A-Za-z0-9_]+)/); if (!nameMatch) continue;
      const name = nameMatch[1];
      const defMatch = f.match(/=\s*([^,}]+)/);
      const typeMatch = f.match(/:\s*([^=,}]+)/);
      props.push({ name, type: typeMatch ? typeMatch[1].trim() : 'unknown', default: defMatch ? defMatch[1].trim().replace(/['"`]/g,'') : undefined, required: !defMatch, description: '' });
    }
  }
  const interfaceMatch = source.match(/interface\s+([A-Za-z0-9_]*Props)\s*\{([\s\S]*?)\}/);
  if (interfaceMatch) {
    const body = interfaceMatch[2];
    const lines = body.split(/\n|;/);
    for (const line of lines) {
      const m = line.match(/([A-Za-z0-9_]+)\??:\s*([^;]+)/);
      if (m) {
        const [, name, type] = m;
        if (!props.find(p=>p.name===name)) props.push({ name, type: type.trim(), default: undefined, required: !/\?/.test(line), description: '' });
      }
    }
  }
  return unique(props.map(JSON.stringify)).map(s=>JSON.parse(s));
}
function extractTailwind(source) {
  const classes = [];
  for (const m of source.matchAll(/className\s*=\s*"([^"]+)"/g)) classes.push(...m[1].split(/\s+/));
  for (const m of source.matchAll(/className\s*=\s*\{([\s\S]*?)\}/g)) {
    const inner = m[1];
    const q = Array.from(inner.matchAll(/['"`]([^'"`]+)['"`]/g));
    for (const qm of q) classes.push(...qm[1].split(/\s+/));
  }
  for (const m of source.matchAll(/clsx\s*\(([^\)]*)\)/g)) {
    const inner = m[1];
    const q = Array.from(inner.matchAll(/['"`]([^'"`]+)['"`]/g));
    for (const qm of q) classes.push(...qm[1].split(/\s+/));
  }
  for (const m of source.matchAll(/twMerge\s*\(([^\)]*)\)/g)) {
    const inner = m[1];
    const q = Array.from(inner.matchAll(/['"`]([^'"`]+)['"`]/g));
    for (const qm of q) classes.push(...qm[1].split(/\s+/));
  }
  return unique(classes).filter(c => /[a-z0-9-:/\[\]!]+/i.test(c));
}
function detectVariants(source, props) {
  const variants = {};
  for (const p of props) {
    const union = p.type && p.type.match(/'(?:[^']+)'(?:\s*\|\s*'(?:[^']+)')+/);
    if (union) variants[p.name] = unique(Array.from(union[0].matchAll(/'([^']+)'/g)).map(m=>m[1]));
  }
  const common = ['variant','size','color','intent','tone','style'];
  for (const key of common) {
    if (!variants[key] && source.includes(key)) {
      const guesses = Array.from(source.matchAll(new RegExp(`${key}[^\n\r]*?===\\s*['\"]([^'\"]+)['\"]`,'g'))).map(m=>m[1]);
      if (guesses.length) variants[key] = unique(guesses);
    }
  }
  return variants;
}
function extractDescription(source) {
  const m = source.match(/\/\*\*([\s\S]*?)\*\//);
  if (!m) return '';
  return m[1].split('\n').map(l=>l.replace(/^\s*\*\s?/, '').trim()).join(' ').trim();
}
function findMissingDeps(source, fileDir) {
  const missing = [];
  const importMatches = Array.from(source.matchAll(/import\s+[^;]+from\s+['\"]([^'\"]+)['\"]/g));
  for (const m of importMatches) {
    const imp = m[1];
    if (imp.startsWith('.') || imp.startsWith('..')) {
      const resolved = path.resolve(fileDir, imp);
      const candidates = ['.tsx','.ts','.jsx','.js','/index.ts','/index.tsx'];
      const exists = candidates.some(ext => fs.existsSync(resolved+ext) || fs.existsSync(resolved));
      if (!exists) missing.push(imp);
    }
  }
  return unique(missing);
}
function loadRegistry() {
  ensureDirSync(REGISTRY_DIR);
  if (!fs.existsSync(REGISTRY_FILE)) return { components: [] };
  try { const json = JSON.parse(fs.readFileSync(REGISTRY_FILE,'utf8')); return json && Array.isArray(json.components) ? json : { components: [] }; } catch { return { components: [] }; }
}
function backupRegistryIfExists() {
  if (!fs.existsSync(REGISTRY_FILE)) return;
  const ts = new Date().toISOString().replace(/[:.]/g,'-');
  fs.copyFileSync(REGISTRY_FILE, path.join(REGISTRY_DIR, `component-registry.bak.${ts}.json`));
}
function updateRegistry(registry, entry) {
  const byPathIdx = registry.components.findIndex(c=>c.filePath===entry.filePath);
  const byIdIdx = registry.components.findIndex(c=>c.id===entry.id);
  const idx = byPathIdx !== -1 ? byPathIdx : byIdIdx;
  if (idx !== -1) registry.components[idx] = { ...registry.components[idx], ...entry }; else registry.components.push(entry);
}
function writeJson(filePath, data) { ensureDirSync(path.dirname(filePath)); fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8'); }
function writeTemplate(componentName, importPath, defaultProps) {
  const filePath = path.join(TEMPLATES_DIR, `${componentName}.template.tsx`);
  const importName = componentName;
  const propsLiteral = defaultProps && Object.keys(defaultProps).length ? ' ' + Object.entries(defaultProps).map(([k,v])=>`${k}={${JSON.stringify(v)}}`).join(' ') : '';
  const content = `import React from "react";\nimport ${importName} from "${importPath}";\n\nexport default function ${componentName}Template() {\n  return <${importName}${propsLiteral}>${componentName}</${importName}>;\n}\n`;
  ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}
function writeMeta(componentName, meta) { const filePath = path.join(TEMPLATES_DIR, `${componentName}.meta.json`); writeJson(filePath, meta); return filePath; }

function main() {
  const exts = ['.tsx','.ts','.jsx','.js'];
  const files = unique(SCAN_PATHS.flatMap(p => listFilesRecursive(path.normalize(p), exts)));
  const registry = loadRegistry();
  backupRegistryIfExists();
  let totalFound = 0, registered = 0, withVariants = 0, withStories = 0, missingDepsCount = 0;
  for (const file of files) {
    const base = path.basename(file);
    const isLikelyComponent = isPascalCase(base);
    const src = readFileSafe(file);
    if (!src) continue;
    const exportsReact = /(export\s+(default\s+)?(function|const|class))|React\.FC|=>\s*\(/.test(src);
    if (!isLikelyComponent && !exportsReact) continue;
    totalFound += 1;
    const { exportName } = extractExportInfo(src);
    const componentName = extractComponentName(file, src);
    const id = toKebab(componentName);
    const props = extractProps(src);
    const tailwindClasses = extractTailwind(src);
    const variants = detectVariants(src, props);
    const description = extractDescription(src);
    const fileDir = path.dirname(file);
    const missingDeps = findMissingDeps(src, fileDir);
    if (Object.keys(variants).length) withVariants += 1;
    if (missingDeps.length) missingDepsCount += 1;
    const relImportPath = path.relative(path.join(TEMPLATES_DIR), file).replace(/\\/g,'/');
    const importPath = relImportPath.startsWith('.') ? relImportPath : './' + relImportPath;
    const defaultProps = {};
    for (const p of props) if (p.default !== undefined) defaultProps[p.name] = p.default;
    const templatePath = writeTemplate(componentName, importPath, defaultProps);
    const metaPath = writeMeta(componentName, { id, name: componentName, filePath: file.replace(/\\/g,'/'), exportName, props, variants, tailwindClasses, description, tags: [], templatePath: templatePath.replace(/\\/g,'/'), missingDeps });
    updateRegistry(registry, { id, name: componentName, filePath: file.replace(/\\/g,'/'), exportName, props, variants, tailwindClasses, description, templatePath: templatePath.replace(/\\/g,'/'), metaPath: metaPath.replace(/\\/g,'/') });
    registered += 1;
  }
  writeJson(REGISTRY_FILE, registry);
  ensureDirSync(TESTS_DIR);
  const pick = (name) => registry.components.find(c=>c.name===name);
  const picked = [pick('PrimaryButton')||pick('BasicButton')||pick('Button'), pick('BasicCard')||pick('Card'), pick('BasicInput')||pick('Input')].filter(Boolean);
  const imports = picked.map(c=>`import ${c.name}Template from "../templates/components/${c.name}.template";`).join('\n');
  const renders = picked.map(c=>`      <${c.name}Template />`).join('\n');
  const samplePage = `import React from "react";\n${imports}\n\nexport default function SamplePage() {\n  return (\n    <div className=\"p-6 flex flex-col gap-4 bg-gray-50 min-h-screen\">\n      <h1 className=\"text-2xl font-bold\">Generated Demo Page</h1>\n${renders || '      <div />'}\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(TESTS_DIR, 'sample-page.tsx'), samplePage, 'utf8');
  ensureDirSync(REPORTS_DIR);
  const summary = { totalFound, registered, withVariants, withStories, missingDeps: missingDepsCount, timestamp: new Date().toISOString() };
  writeJson(path.join(REPORTS_DIR, 'component-scan-summary.json'), summary);
  console.log(JSON.stringify(summary, null, 2));
}

try { main(); } catch (err) { console.error('Scan failed:', err); process.exit(1); }


