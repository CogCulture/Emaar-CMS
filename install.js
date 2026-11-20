const { execSync } = require('child_process');
const path = require('path');

const npmPath = path.join(process.env.LOCALAPPDATA, 'nvm', 'v20.18.3', 'npm.cmd');
const cwd = path.join(__dirname, 'cms');

console.log('Running npm install in:', cwd);
console.log('Using npm at:', npmPath);

execSync(`"${npmPath}" install`, {
  cwd,
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: `${path.dirname(npmPath)};${process.env.PATH}`
  }
});
console.log('Installation completed successfully.');
