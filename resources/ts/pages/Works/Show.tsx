import React, { useEffect, useRef, useState } from "react";
import ArticleLayout from "../../components/layouts/page/ArticleLayout";
import { Work } from "../../types/responses/Works";
import WordPressArticleContent from "../../components/ui/articles/WordPressArticleContent";
import ProjectInfo from "../../components/ui/tables/ProjectInfo";
import WorkLink from "../../components/ui/links/WorkLink";

interface WorkDetailProps {
  work: Work;
  allWorks: {
    workId: number;
    title: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  }[];
}

const WorkShow: React.FC<WorkDetailProps> = ({ work, allWorks }) => {
  const [isSticky, setIsSticky] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && sidebarRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const headerHeight = 100; // ヘッダーの高さを適切に設定してください
        setIsSticky(window.scrollY > contentRect.top + window.scrollY - headerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const breadcrumbs = [
    { label: "ホーム", href: "/" },
    { label: "実績", href: "/works" },
    { label: work.title, href: `/work/${work.workId}` },
  ];

  const featuredImageUrl = work.featuredImage?.node.sourceUrl || "/images/photo/noimage.png";

  const currentIndex = allWorks.findIndex((w) => w.workId === work.workId);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  return (
    <ArticleLayout
      title={`${work.title} | 実績詳細`}
      headerTitle={work.title}
      headerSubtitle={work.workACF.companyname || "実績詳細"}
      breadcrumbs={breadcrumbs}
    >
      <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <img src={featuredImageUrl} alt={work.title} className="w-full h-auto mb-6 rounded-lg" />
          <div className="flex gap-8 flex-col-reverse md:flex-row">
            <div ref={contentRef} className="md:w-2/3">
              <WordPressArticleContent content={work.content} />
            </div>
            <div className="md:w-1/3">
              <div ref={sidebarRef}>
                <ProjectInfo work={work} isSticky={isSticky} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-12">
        <WorkLink work={prevWork} isPrev={true} />
        <WorkLink work={nextWork} isPrev={false} />
      </div>
    </ArticleLayout>
  );
};

export default WorkShow;
