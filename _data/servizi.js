const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function() {
  const dir = path.join(process.cwd(), 'src/_servizi');
  if (!fs.existsSync(dir)) return [];
  const items = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => matter(fs.readFileSync(path.join(dir, f), 'utf8')).data)
    .sort((a, b) => (a.ordine || '').localeCompare(b.ordine || ''));
  const grouped = {};
  items.forEach(item => {
    const cat = item.categoria;
    if (!grouped[cat]) grouped[cat] = { categoria: cat, servizi: [] };
    grouped[cat].servizi.push(item);
  });
  return Object.values(grouped);
};
