const fs = require('fs');
const path = require('path');

function fixSyntax(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixSyntax(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix icon="<i className=...>" -> icon={<i className=...>}
      const replaced = content.replace(/icon="(<i className=\\"[^"]+\\"><\/i>)"/g, 'icon={$1}');
      const replaced2 = replaced.replace(/icon="(<i className="[^"]+"><\/i>)"/g, 'icon={$1}');

      // Fix other potential bad replacements inside strings:
      // "<span><i className="fa-solid fa-chart-bar"></i></span>" 
      // This might be tricky, let's just fix `icon="<i...` and `">` in the icon prop.
      // E.g., icon="<i className="fa-solid fa-users"></i>" 
      // The regex above /icon="(<i className="[^"]+"><\/i>)"/g will match icon="<i className="fa-solid fa-users"></i>"
      
      if (content !== replaced2) {
        fs.writeFileSync(fullPath, replaced2, 'utf8');
        console.log(`Fixed syntax in: ${fullPath}`);
      }
    }
  }
}

fixSyntax(path.join(__dirname, 'src'));
console.log('Syntax fix done.');
