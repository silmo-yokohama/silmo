/**
 * OGPデフォルト画像生成スクリプト
 * SVGからPNG（1200×630）を生成し /public/images/og-default.png に配置する
 *
 * 使用方法: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const OUTPUT_PATH = 'public/images/og-default.png';
const WIDTH = 1200;
const HEIGHT = 630;

// テーマカラー（globals.css と同期）
const COLORS = {
  bgMain: '#0f0f23',
  bgSecondary: '#1a1a2e',
  primary: '#00a197',
  primaryLight: '#33b5ad',
  accent: '#f8b62b',
  textMain: '#f2f2f2',
  textSub: '#c9d6df',
};

/**
 * ピクセルグリッド装飾を生成する
 * レトロゲーム風の背景パターン
 */
function generatePixelGrid() {
  const rects = [];
  const gridSize = 30;

  for (let x = 0; x < WIDTH; x += gridSize) {
    for (let y = 0; y < HEIGHT; y += gridSize) {
      // ランダムにドットを配置（疎らに）
      const hash = (x * 7 + y * 13) % 100;
      if (hash < 8) {
        const opacity = 0.03 + (hash % 5) * 0.01;
        rects.push(
          `<rect x="${x}" y="${y}" width="${gridSize - 1}" height="${gridSize - 1}" fill="${COLORS.primary}" opacity="${opacity}" />`
        );
      }
    }
  }
  return rects.join('\n');
}

/**
 * スキャンライン効果を生成する
 */
function generateScanlines() {
  const lines = [];
  for (let y = 0; y < HEIGHT; y += 4) {
    lines.push(
      `<rect x="0" y="${y}" width="${WIDTH}" height="1" fill="black" opacity="0.08" />`
    );
  }
  return lines.join('\n');
}

// RPG風の枠線を描画するSVG
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 背景グラデーション -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.bgMain}" />
      <stop offset="100%" style="stop-color:${COLORS.bgSecondary}" />
    </linearGradient>
    <!-- プライマリグロー -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- 背景 -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)" />

  <!-- ピクセルグリッド装飾 -->
  ${generatePixelGrid()}

  <!-- RPG風の外枠（二重線） -->
  <rect x="16" y="16" width="${WIDTH - 32}" height="${HEIGHT - 32}" rx="2"
        fill="none" stroke="${COLORS.primary}" stroke-width="3" opacity="0.6" />
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" rx="2"
        fill="none" stroke="${COLORS.primary}" stroke-width="1" opacity="0.3" />

  <!-- 角のドット装飾（RPGウィンドウ風） -->
  <rect x="12" y="12" width="8" height="8" fill="${COLORS.accent}" />
  <rect x="${WIDTH - 20}" y="12" width="8" height="8" fill="${COLORS.accent}" />
  <rect x="12" y="${HEIGHT - 20}" width="8" height="8" fill="${COLORS.accent}" />
  <rect x="${WIDTH - 20}" y="${HEIGHT - 20}" width="8" height="8" fill="${COLORS.accent}" />

  <!-- メインテキスト: SilMo -->
  <text x="${WIDTH / 2}" y="240" text-anchor="middle"
        font-family="monospace" font-size="96" font-weight="bold"
        fill="${COLORS.primary}" filter="url(#glow)">
    SilMo
  </text>

  <!-- サブテキスト: 肩書き -->
  <text x="${WIDTH / 2}" y="320" text-anchor="middle"
        font-family="sans-serif" font-size="28" fill="${COLORS.textSub}">
    Freelance Frontend Engineer
  </text>

  <!-- 区切り線（RPGメニュー風） -->
  <line x1="400" y1="370" x2="800" y2="370"
        stroke="${COLORS.accent}" stroke-width="2" opacity="0.5" />
  <rect x="592" y="364" width="16" height="12" fill="${COLORS.accent}" opacity="0.7" />

  <!-- 技術スタック表示 -->
  <text x="${WIDTH / 2}" y="430" text-anchor="middle"
        font-family="monospace" font-size="20" fill="${COLORS.textSub}" opacity="0.8">
    Next.js / React / TypeScript / Tailwind CSS
  </text>

  <!-- URL -->
  <text x="${WIDTH / 2}" y="540" text-anchor="middle"
        font-family="monospace" font-size="22" fill="${COLORS.primary}" opacity="0.7">
    https://silmo.jp
  </text>

  <!-- スキャンライン効果 -->
  ${generateScanlines()}
</svg>
`;

// PNG生成
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(OUTPUT_PATH);
console.log(`OGP画像を生成しました: ${OUTPUT_PATH} (${WIDTH}×${HEIGHT})`);
