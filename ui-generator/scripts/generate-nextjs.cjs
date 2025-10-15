#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Generating Next.js Application from UI Configuration...\n');

// Read project configuration
const projectConfig = JSON.parse(fs.readFileSync('ui/project.json', 'utf8'));

// Create the generated Next.js structure
const outputDir = projectConfig.outputDir;
const appName = projectConfig.name;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate Next.js app structure
const nextjsStructure = {
  'package.json': {
    name: appName,
    version: "1.0.0",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "jest",
      "test:watch": "jest --watch"
    },
    dependencies: {
      "next": "^14.0.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "typescript": "^5.0.0",
      "@types/node": "^20.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0"
    },
    devDependencies: {
      "tailwindcss": "^3.3.0",
      "autoprefixer": "^10.4.0",
      "postcss": "^8.4.0",
      "eslint": "^8.0.0",
      "eslint-config-next": "^14.0.0",
      "jest": "^29.0.0",
      "jest-environment-jsdom": "^29.0.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/jest-dom": "^5.16.0"
    }
  },
  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
};

// Generate component files
function generateComponent(componentConfig) {
  const config = JSON.parse(fs.readFileSync(componentConfig.config, 'utf8'));
  const componentName = config.name;
  const importPath = config.importPath;
  
  return `import React from 'react';
import { ${componentName} } from '${importPath}';

interface Generated${componentName}Props {
${config.props.map(prop => 
  `  ${prop.name}${prop.required ? '' : '?'}: ${prop.type};`
).join('\n')}
}

export default function Generated${componentName}({ 
${config.props.map(prop => 
  `  ${prop.name}${prop.default ? ` = ${prop.default}` : ''}`
).join(',\n')}
}: Generated${componentName}Props) {
  return (
    <${componentName}
${config.props.map(prop => 
      `      ${prop.name}={${prop.name}}`
    ).join('\n')}
    />
  );
}`;
}

// Generate page files
function generatePage(pageConfig) {
  const config = JSON.parse(fs.readFileSync(pageConfig.config, 'utf8'));
  const pageName = config.name;
  
  return `import React from 'react';
${config.components.map(comp => 
  `import Generated${comp.type} from '@/components/Generated${comp.type}';`
).join('\n')}

export default function ${pageName}Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
${config.components.map(comp => 
          `          <Generated${comp.type}
${Object.entries(comp.props).map(([key, value]) => 
            `            ${key}={${JSON.stringify(value)}}`
          ).join('\n')}
          />`
        ).join('\n')}
        </div>
      </div>
    </div>
  );
}`;
}

// Create directory structure
const dirs = [
  'src/app',
  'src/components', 
  'src/lib',
  'src/types',
  'public'
];

dirs.forEach(dir => {
  const fullPath = path.join(outputDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Write Next.js configuration files
Object.entries(nextjsStructure).forEach(([filename, content]) => {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
});

// Generate components
projectConfig.fundamentalComponents.components.forEach(component => {
  const componentCode = generateComponent(component);
  const componentPath = path.join(outputDir, 'src/components', `Generated${component.name}.tsx`);
  fs.writeFileSync(componentPath, componentCode);
});

// Generate pages
projectConfig.pages.forEach(page => {
  const pageCode = generatePage(page);
  const pagePath = path.join(outputDir, 'src/app', `${page.name.toLowerCase()}/page.tsx`);
  const pageDir = path.dirname(pagePath);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  fs.writeFileSync(pagePath, pageCode);
});

// Generate main layout
const layoutCode = `import React from 'react';
import './globals.css';

export const metadata = {
  title: '${appName}',
  description: 'Generated Next.js application with fundamental components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}`;

fs.writeFileSync(path.join(outputDir, 'src/app/layout.tsx'), layoutCode);

// Generate global CSS
const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

fs.writeFileSync(path.join(outputDir, 'src/app/globals.css'), globalCss);

// Generate README
const readmeContent = `# ${appName}

Generated Next.js application using fundamental component configurations.

## Components Included

${projectConfig.fundamentalComponents.components.map(comp => 
  `- **${comp.name}**: ${comp.description}`
).join('\n')}

## Pages

${projectConfig.pages.map(page => 
  `- **${page.name}**: ${page.description}`
).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Fundamental component library
- ✅ Generated pages and components
- ✅ Jest testing setup

## Generated Structure

- \`src/app/\` - Next.js App Router pages
- \`src/components/\` - Generated component wrappers
- \`src/lib/\` - Utility functions
- \`public/\` - Static assets
`;

fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);

console.log('✅ Next.js Application Generated!');
console.log(`📁 Output directory: ${outputDir}`);
console.log('\n📋 Generated Files:');
console.log('- Next.js configuration (next.config.js, tailwind.config.js, etc.)');
console.log('- TypeScript configuration (tsconfig.json)');
console.log('- Package configuration (package.json)');
console.log('- Generated components in src/components/');
console.log('- Generated pages in src/app/');
console.log('- Global styles and layout');

console.log('\n🚀 Next Steps:');
console.log(`1. cd ${outputDir}`);
console.log('2. npm install');
console.log('3. npm run dev');
console.log('\n🧪 To run tests:');
console.log('npm test');
