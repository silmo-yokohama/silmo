import React from "react";

const FrontendIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    {/* モニター本体 */}
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />

    {/* 画面 */}
    <rect x="4" y="5" width="16" height="10" />

    {/* コードを表す線 */}
    <line x1="7" y1="8" x2="13" y2="8" />
    <line x1="7" y1="11" x2="11" y2="11" />
    <line x1="7" y1="14" x2="15" y2="14" />

    {/* スタンド */}
    <line x1="12" y1="17" x2="12" y2="21" />
    <line x1="8" y1="21" x2="16" y2="21" />

    {/* ブラウザタブ */}
    <path d="M4 5h3" />
  </svg>
);

export default FrontendIcon;
