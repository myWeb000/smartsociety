const fs = require('fs');
const path = require('path');

const emojiMap = {
  '🏢': '<i className="fa-solid fa-building"></i>',
  '📊': '<i className="fa-solid fa-chart-bar"></i>',
  '🏠': '<i className="fa-solid fa-house"></i>',
  '💵': '<i className="fa-solid fa-money-bill"></i>',
  '📝': '<i className="fa-solid fa-file-pen"></i>',
  '💼': '<i className="fa-solid fa-briefcase"></i>',
  '💳': '<i className="fa-solid fa-credit-card"></i>',
  '⚠️': '<i className="fa-solid fa-triangle-exclamation"></i>',
  '🏊': '<i className="fa-solid fa-person-swimming"></i>',
  '🎟️': '<i className="fa-solid fa-ticket"></i>',
  '📋': '<i className="fa-solid fa-clipboard-list"></i>',
  '🔍': '<i className="fa-solid fa-magnifying-glass"></i>',
  '🚶': '<i className="fa-solid fa-person-walking"></i>',
  '👤': '<i className="fa-solid fa-user"></i>',
  '🚪': '<i className="fa-solid fa-arrow-right-from-bracket"></i>',
  '⭐': '<i className="fa-solid fa-star text-warning"></i>',
  '✅': '<i className="fa-solid fa-check text-success"></i>',
  '❌': '<i className="fa-solid fa-xmark text-danger"></i>',
  '🗑️': '<i className="fa-solid fa-trash"></i>',
  '✏️': '<i className="fa-solid fa-pen"></i>',
  '➕': '<i className="fa-solid fa-plus"></i>',
  '🔔': '<i className="fa-solid fa-bell"></i>',
  '💰': '<i className="fa-solid fa-sack-dollar"></i>',
  '📅': '<i className="fa-solid fa-calendar-days"></i>',
  '⏰': '<i className="fa-solid fa-clock"></i>',
  '📍': '<i className="fa-solid fa-location-dot"></i>',
  '📞': '<i className="fa-solid fa-phone"></i>',
  '✉️': '<i className="fa-solid fa-envelope"></i>',
  '🚀': '<i className="fa-solid fa-rocket"></i>',
  '🔒': '<i className="fa-solid fa-lock"></i>',
  '🔓': '<i className="fa-solid fa-unlock"></i>',
  '⚙️': '<i className="fa-solid fa-gear"></i>',
  '🛠️': '<i className="fa-solid fa-screwdriver-wrench"></i>',
  '🔧': '<i className="fa-solid fa-wrench"></i>',
  '💡': '<i className="fa-solid fa-lightbulb"></i>',
  '📝': '<i className="fa-solid fa-pen-to-square"></i>',
  '📄': '<i className="fa-solid fa-file-lines"></i>',
  '📈': '<i className="fa-solid fa-arrow-trend-up"></i>',
  '📉': '<i className="fa-solid fa-arrow-trend-down"></i>',
  '🤝': '<i className="fa-solid fa-handshake"></i>',
  '🛠️': '<i className="fa-solid fa-toolbox"></i>',
  '👷': '<i className="fa-solid fa-helmet-safety"></i>'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const [emoji, replacement] of Object.entries(emojiMap)) {
        if (content.includes(emoji)) {
          // simple global replacement
          content = content.split(emoji).join(replacement);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
console.log('Scanning directory:', targetDir);
processDirectory(targetDir);
console.log('Done!');
