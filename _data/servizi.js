const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function() {
  const dirs = [
    path.join(process.cwd(), '_servizi'),
    path.join(process.cwd(), 'src/_servizi')
  ];
  let items = [];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .forEach(f => items.push(matter(fs.readFileSync(path.join(dir, f), 'utf8')).data));
    }
  });
  items.sort((a, b) => (a.ordine || '').localeCompare(b.ordine || ''));
  const grouped = {};
  items.forEach(item => {
    const cat = item.categoria;
    if (!grouped[cat]) grouped[cat] = { categoria: cat, servizi: [] };
    grouped[cat].servizi.push(item);
  });
  return Object.values(grouped);
};
