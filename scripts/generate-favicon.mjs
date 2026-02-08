/**
 * favicon生成スクリプト
 * SilMoロゴマークからfavicon用画像を生成する
 *
 * 使用方法: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp';

const LOGOMARK_PATH = 'public/images/silmo-logomark.png';

// ダークテーマの背景色
const BG_COLOR = { r: 15, g: 15, b: 35 }; // #0f0f23

async function generateFavicon() {
  // 32×32 favicon（透過部分をダーク背景で塗りつぶし）
  await sharp(LOGOMARK_PATH)
    .flatten({ background: BG_COLOR })
    .resize(26, 26, { fit: 'contain', background: BG_COLOR })
    .extend({
      top: 3,
      bottom: 3,
      left: 3,
      right: 3,
      background: BG_COLOR,
    })
    .png()
    .toFile('src/app/favicon.ico');

  // 180×180 apple-touch-icon
  await sharp(LOGOMARK_PATH)
    .flatten({ background: BG_COLOR })
    .resize(140, 140, { fit: 'contain', background: BG_COLOR })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: BG_COLOR,
    })
    .png()
    .toFile('public/images/apple-touch-icon.png');

  console.log('favicon を生成しました:');
  console.log('  - src/app/favicon.ico (32×32)');
  console.log('  - public/images/apple-touch-icon.png (180×180)');
}

generateFavicon().catch(console.error);
