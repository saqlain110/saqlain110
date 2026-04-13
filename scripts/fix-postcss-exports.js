const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, '..', 'node_modules', 'postcss', 'package.json'),
  path.join(__dirname, '..', 'node_modules', 'gatsby', 'node_modules', 'postcss', 'package.json'),
];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    continue;
  }

  const raw = fs.readFileSync(target, 'utf8');
  const pkg = JSON.parse(raw);

  if (!pkg.exports || typeof pkg.exports !== 'object') {
    continue;
  }

  if (pkg.exports['./package.json']) {
    continue;
  }

  pkg.exports['./package.json'] = './package.json';
  fs.writeFileSync(target, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Patched PostCSS exports in ${target}`);
}
