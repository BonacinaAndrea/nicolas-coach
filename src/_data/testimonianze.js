const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function() {
  const dir = path.join(__dirname, '../../src/_testimonianze');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => matter(fs.readFileSync(path.join(dir, f), 'utf8')).data);
};
