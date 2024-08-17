// resources/ts/components/works/ArticleContent.tsx

import React from "react";
import parse from "html-react-parser";

interface WordPressArticleContentProps {
  content: string | null;
}

const WordPressArticleContent: React.FC<WordPressArticleContentProps> = ({ content }) => {
  if (!content) return null;

  return <article className="prose max-w-none mb-6">{parse(content)}</article>;
};

export default WordPressArticleContent;
