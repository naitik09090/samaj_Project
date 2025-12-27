const fs = require('fs');
const path = require('path');

// This script creates an optimized version of the logo
// Since we don't have sharp installed, we'll document the manual process

console.log('\n=== Logo Optimization Guide ===\n');
console.log('Current logo: src/images/ahir_samaj_logo.webp (62.18 KB)');
console.log('Display size: 105x40 pixels');
console.log('Recommended size: 315x120 pixels (3x for retina displays)\n');

console.log('To optimize the logo, you have two options:\n');

console.log('Option 1: Use an online tool');
console.log('  1. Go to https://squoosh.app/');
console.log('  2. Upload: src/images/ahir_samaj_logo.webp');
console.log('  3. Resize to: 315x120 pixels');
console.log('  4. Set format to: WebP');
console.log('  5. Set quality to: 80-85');
console.log('  6. Download and replace the original file\n');

console.log('Option 2: Install sharp and run optimization');
console.log('  npm install --save-dev sharp');
console.log('  Then run this script again\n');

// Check if sharp is available
try {
    const sharp = require('sharp');

    const inputPath = path.join(__dirname, 'src', 'images', 'ahir_samaj_logo.webp');
    const outputPath = path.join(__dirname, 'src', 'images', 'ahir_samaj_logo_optimized.webp');

    console.log('Sharp is installed! Optimizing logo...\n');

    sharp(inputPath)
        .resize(315, 120, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 85 })
        .toFile(outputPath)
        .then(info => {
            console.log('✓ Logo optimized successfully!');
            console.log(`  Input size: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);
            console.log(`  Output size: ${(info.size / 1024).toFixed(2)} KB`);
            console.log(`  Dimensions: ${info.width}x${info.height}`);
            console.log(`  Saved to: ${outputPath}\n`);
            console.log('Now update Navbar.js to use: ahir_samaj_logo_optimized.webp');
        })
        .catch(err => {
            console.error('Error optimizing logo:', err);
        });

} catch (e) {
    console.log('Sharp is not installed. Use Option 1 above or install sharp.\n');
}
