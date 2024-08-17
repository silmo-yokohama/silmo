import React from "react";

interface ArticleHeaderProps {
  headerTitle: string;
  headerSubtitle?: string;
}
const ArticleHeader: React.FC<ArticleHeaderProps> = ({ headerTitle, headerSubtitle }) => {
  return (
    <header className="bg-base-200  pt-[120px] pb-20 md:pt-[150px] md:pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content relative inline-block z-[2]">
          {headerTitle}
        </h1>
        {headerSubtitle && (
          <p className="text-xl md:text-2xl text-base-content/80 mt-2">{headerSubtitle}</p>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
