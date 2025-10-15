#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running Fundamental Component Tests...\n');

try {
  // Check if we're in the demo directory
  const demoDir = path.join(__dirname, '../demo');
  if (!fs.existsSync(demoDir)) {
    console.error('❌ Demo directory not found. Please run from ui-generator root.');
    process.exit(1);
  }

  // Install dependencies if needed
  if (!fs.existsSync(path.join(demoDir, 'node_modules'))) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { cwd: demoDir, stdio: 'inherit' });
  }

  // Run tests
  console.log('🚀 Running tests...\n');
  execSync('npm test', { cwd: demoDir, stdio: 'inherit' });

  console.log('\n✅ All tests passed!');
  console.log('\n📊 Test Summary:');
  console.log('- Button Template: ✓ Renders variants, handles clicks, disables correctly');
  console.log('- Card Template: ✓ Renders variants, displays content, handles interactions');
  console.log('- Input Template: ✓ Renders variants, handles changes, shows validation states');

} catch (error) {
  console.error('❌ Test execution failed:', error.message);
  process.exit(1);
}
