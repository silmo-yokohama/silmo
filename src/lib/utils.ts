import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSSのクラス名をマージするユーティリティ
 * clsx + tailwind-mergeで重複するクラスを安全に統合する
 * @param inputs - クラス名の配列
 * @returns マージされたクラス名文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 日付を日本語フォーマットで表示する
 * @param dateString - ISO形式の日付文字列
 * @returns "2024年1月15日" 形式の文字列
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 日付を短いフォーマットで表示する
 * @param dateString - ISO形式の日付文字列
 * @returns "2024.01.15" 形式の文字列
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 職務経歴の期間を "YYYY年M月〜YYYY年M月" 形式で表示する
 * @param start - 開始日（ISO 8601）
 * @param end - 終了日（ISO 8601）。未指定の場合は「現在」
 * @returns "2023年4月〜2024年3月" 形式の文字列
 */
export function formatPeriod(start: string, end?: string): string {
  const fmt = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  };
  return `${fmt(start)}〜${end ? fmt(end) : '現在'}`;
}

/**
 * 文字列を指定文字数で切り詰め、末尾に「...」を付与する
 * @param text - 元のテキスト
 * @param maxLength - 最大文字数
 * @returns 切り詰められたテキスト
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * カンマ区切りの技術名文字列を配列に変換する
 * @param technologies - カンマ区切りの技術名文字列（例: "Angular, Java, Spring Boot"）
 * @returns トリミングされた技術名の配列。空文字は除外
 */
export function parseTechnologies(technologies?: string): string[] {
  if (!technologies) return [];
  return technologies
    .split(',')
    .map((tech) => tech.trim())
    .filter(Boolean);
}
