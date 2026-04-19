const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function() {
  const dirs = [
    path.join(process.cwd(), '_casi_studio'),
    path.join(process.cwd(), 'src/_casi_studio')
  ];
  let files = [];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .forEach(f => files.push(matter(fs.readFileSync(path.join(dir, f), 'utf8')).data));
    }
  });
  return files;
};
