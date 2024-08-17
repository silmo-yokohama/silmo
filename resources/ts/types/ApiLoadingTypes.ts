/**
 * API読み込み状態に関する型定義
 */

/**
 * API読み込み状態を表すインターフェース
 */
export interface ApiLoadingState {
  /**
   * 現在進行中のAPI呼び出しの数
   */
  counter: number;
}
