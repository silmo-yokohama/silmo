'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * モバイルメニューの開閉状態を管理するフック
 * スクロールロック・ESCキーでの閉鎖もハンドリングする
 */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  /** メニューを開く */
  const open = useCallback(() => setIsOpen(true), []);

  /** メニューを閉じる */
  const close = useCallback(() => setIsOpen(false), []);

  /** メニューの開閉をトグル */
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // メニュー開放時のスクロールロックとESCキー閉鎖
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, close]);

  return { isOpen, open, close, toggle };
}
