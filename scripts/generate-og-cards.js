const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureHomepageCards() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const tempScreenshot = path.resolve('temp-homepage.png');

  console.log('Capturing actual running homepage at http://localhost:3000 (1200x630)...');
  
  const cmd = `"${edgePath}" --headless=new --screenshot="${tempScreenshot}" --window-size=1200,630 --virtual-time-budget=5000 --run-all-compositor-stages-before-draw http://localhost:3000`;
  execSync(cmd, { stdio: 'inherit' });

  if (!fs.existsSync(tempScreenshot)) {
    throw new Error('Screenshot failed to generate at ' + tempScreenshot);
  }

  const destinations = [
    'public/opengraph-image.png',
    'public/twitter-image.png',
    'public/images/og-image.png',
    'public/images/twitter-card.png',
    'src/app/opengraph-image.png',
    'src/app/twitter-image.png'
  ];

  for (const dest of destinations) {
    const fullPath = path.resolve(dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.copyFileSync(tempScreenshot, fullPath);
    console.log(`Saved exact homepage UI card to: ${dest}`);
  }

  if (fs.existsSync(tempScreenshot)) {
    fs.unlinkSync(tempScreenshot);
  }

  console.log('Successfully updated all Open Graph and Twitter cards with the exact actual homepage UI!');
}

captureHomepageCards().catch(console.error);
