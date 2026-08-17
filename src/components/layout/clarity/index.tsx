'use client';

import { useEffect } from 'react';

import Clarity from '@microsoft/clarity';

/** Clarity 初期化コンポーネントの Props */
type ClarityInitProps = {
  /** Microsoft Clarity のプロジェクトID */
  projectId: string;
};

/**
 * Microsoft Clarity 初期化コンポーネント
 * マウント時に一度だけ Clarity のトラッキングを開始する
 */
export function ClarityInit({ projectId }: ClarityInitProps) {
  useEffect(() => {
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}
