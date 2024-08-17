/**
 * 画像情報を表すインターフェース
 */
interface FeaturedImage {
  node: {
    sourceUrl: string;
  };
}

/**
 * 沿革項目を表すインターフェース
 */
export interface HistoryItem {
  /**
   * 年代や時期を表すタイトル
   */
  title: string;

  /**
   * その時期の詳細な内容（HTMLを含む可能性がある）
   */
  content: string;

  /**
   * いらすとや画像情報
   */
  featuredImage: FeaturedImage;
}

/**
 * 沿革項目の配列を表す型
 */
export type HistoryItems = HistoryItem[];
