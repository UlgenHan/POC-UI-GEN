#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Generating UI from Fundamental Templates...\n');

// Read project configuration
const projectConfig = JSON.parse(fs.readFileSync('ui/project.json', 'utf8'));

// Create the generated UI structure
const outputDir = projectConfig.outputDir;
const fundamentalTemplates = projectConfig.fundamentalTemplates;

if (!fundamentalTemplates.enabled) {
  console.log('⚠️  Fundamental templates are disabled in project.json');
  process.exit(0);
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate main app component
const appContent = `import React from 'react';
import FundamentalDemo from '../ui-generator/demo/fundamental-demo';

export default function GeneratedApp() {
  return (
    <div className="min-h-screen">
      <FundamentalDemo />
    </div>
  );
}
`;

// Generate index file
const indexContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import GeneratedApp from './GeneratedApp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GeneratedApp />);
`;

// Generate CSS file
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

// Generate package.json for the output
const packageJson = {
  name: projectConfig.name,
  version: "1.0.0",
  private: true,
  dependencies: {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  scripts: {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
};

// Write files
fs.writeFileSync(path.join(outputDir, 'GeneratedApp.tsx'), appContent);
fs.writeFileSync(path.join(outputDir, 'index.tsx'), indexContent);
fs.writeFileSync(path.join(outputDir, 'index.css'), cssContent);
fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// Generate README
const readmeContent = `# Generated UI Application

This application was generated using fundamental component templates.

## Components Included

${fundamentalTemplates.components.map(comp => 
  `- **${comp.name}**: ${comp.description}`
).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Run tests:
   \`\`\`bash
   npm test
   \`\`\`

## Features

- ✅ Fundamental component templates
- ✅ Interactive component showcase
- ✅ Tailwind CSS styling preserved
- ✅ Comprehensive test coverage
- ✅ TypeScript support

## Generated Files

- \`GeneratedApp.tsx\` - Main application component
- \`index.tsx\` - Application entry point
- \`index.css\` - Global styles with Tailwind
- \`package.json\` - Dependencies and scripts
`;

fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);

console.log('✅ UI Generation Complete!');
console.log(`📁 Output directory: ${outputDir}`);
console.log('\n📋 Generated Files:');
console.log('- GeneratedApp.tsx (Main application)');
console.log('- index.tsx (Entry point)');
console.log('- index.css (Global styles)');
console.log('- package.json (Dependencies)');
console.log('- README.md (Documentation)');

console.log('\n🚀 Next Steps:');
console.log(`1. cd ${outputDir}`);
console.log('2. npm install');
console.log('3. npm start');
console.log('\n🧪 To run tests:');
console.log('npm test');
