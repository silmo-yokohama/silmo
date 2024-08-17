// resources/ts/types/responses/Skills.ts

/**
 * APIから取得するスキルデータの個別ノードを表すインターフェース
 */
export interface SkillNode {
  /** スキル名 */
  name: string;
  /** スキルのスラッグ */
  slug: string;
  /** スキルのID */
  skillId: number;
  /** 親カテゴリーのID。nullの場合はカテゴリー自体を示す */
  parentId: string | null;
  /** スキル説明 */
  description: string | null;
  /** スキルの追加カスタムフィールド */
  skillACF: {
    /** スキルレベル（1-10） */
    rate: number;
    /** スキルのロゴ情報 */
    logo: {
      node: {
        /** ロゴのスラッグ */
        slug: string;
        /** ロゴの画像URL */
        sourceUrl: string;
      };
    } | null;
    /** スキルの一意識別子 */
  };
  id: string;
}

/**
 * 整形後のスキルカテゴリーを表すインターフェース
 */
export interface SkillCategory {
  /** カテゴリーの一意識別子 */
  id: string;
  /** カテゴリー名 */
  name: string;
  /** カテゴリーのスラッグ */
  slug: string;
  /** カテゴリーに属するスキルの配列 */
  skills: Skill[];
}

/**
 * 整形後の個別スキルを表すインターフェース
 */
export interface Skill {
  /** スキルの一意識別子 */
  id: string;
  /** スキル名 */
  name: string;
  /** スキルのスラッグ */
  slug: string;
  /** スキルレベル（1-10） */
  rate: number;
  /** スキル説明 */
  description: string | null;
  /** スキルのロゴ情報 */
  logo: {
    /** ロゴのスラッグ */
    slug: string;
    /** ロゴの画像URL */
    sourceUrl: string;
  } | null;
}
