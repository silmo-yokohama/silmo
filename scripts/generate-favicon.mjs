/**
 * favicon生成スクリプト
 * ロゴから「S」部分を切り出し、favicon用画像を生成する
 *
 * 使用方法: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp';

const LOGO_PATH = 'public/images/logo.png';

// ロゴの「S」部分の座標（2816×1536の元画像内）
// ピクセルアートの「S」は左端付近にある
const S_CROP = {
  left: 200,
  top: 300,
  width: 580,
  height: 900,
};

async function generateFavicon() {
  // 「S」部分を切り出し
  const sCropped = sharp(LOGO_PATH).extract(S_CROP);

  // 正方形にするためパディング付きでリサイズ
  // ダークテーマの背景色に合わせる
  const BG_COLOR = { r: 15, g: 15, b: 35, alpha: 1 }; // #0f0f23

  // 32×32 favicon用PNG
  await sCropped
    .clone()
    .resize(28, 28, { fit: 'contain', background: BG_COLOR })
    .extend({
      top: 2,
      bottom: 2,
      left: 2,
      right: 2,
      background: BG_COLOR,
    })
    .png()
    .toFile('public/images/favicon-32.png');

  // 180×180 apple-touch-icon用
  await sCropped
    .clone()
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

  // ICO生成（32×32 PNGをそのまま使う）
  // sharp は直接 ICO を出力できないため、PNGをfavicon.icoとして配置
  // ブラウザはPNG形式のfavicon.icoを認識可能
  await sCropped
    .clone()
    .resize(32, 32, { fit: 'contain', background: BG_COLOR })
    .png()
    .toFile('src/app/favicon.ico');

  console.log('favicon を生成しました:');
  console.log('  - src/app/favicon.ico (32×32)');
  console.log('  - public/images/apple-touch-icon.png (180×180)');
}

generateFavicon().catch(console.error);
