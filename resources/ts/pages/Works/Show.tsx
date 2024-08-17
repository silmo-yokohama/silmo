import React, { useEffect, useRef, useState } from "react";
import ArticleLayout from "../../components/layouts/page/ArticleLayout";
import { Link } from "@inertiajs/react";
import parse from "html-react-parser";
import { Work } from "../../types/responses/Works";

interface WorkDetailProps {
  work: Work;
  prevWork?: { id: string; title: string };
  nextWork?: { id: string; title: string };
}

const WorkShow: React.FC<WorkDetailProps> = ({ work, prevWork, nextWork }) => {
  work = {
    date: "2024-01-29T12:54:00",
    content: "\n<p>Laravel x React x Inertia.jsで作成しました。</p>\n",
    title: "ＨＰ改修＆予約システム構築",
    workACF: {
      eyecatch: {
        node: {
          sourceUrl: "https://wp.silmo.jp/wp-content/uploads/2024/01/2024-08-04_17h20_18.png",
        },
      },
      eyecatch_sp: {
        node: {
          sourceUrl: "https://wp.silmo.jp/wp-content/uploads/2024/01/2024-08-04_18h07_13.png",
        },
      },
      github: null,
      targetUrl: "https://last-produce.co.jp",
      companyname: "ラストプロデュース株式会社",
    },
    workCategory: {
      nodes: [
        {
          name: "受託",
        },
      ],
    },
    skill: {
      nodes: [
        {
          skillId: 4,
          name: "React",
        },
        {
          skillId: 7,
          name: "Inertia.js",
        },
        {
          skillId: 2,
          name: "Laravel",
        },
        {
          skillId: 6,
          name: "Tailwind CSS",
        },
      ],
    },
    workId: 17,
    featuredImage: {
      node: {
        slug: "lastproduce",
        sourceUrl: "https://wp.silmo.jp/wp-content/uploads/2024/01/lastproduce.png",
      },
    },
  };
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
              {work.content && (
                <article className="prose max-w-none min-h-[300vh] mb-6">
                  {parse(work.content)}
                </article>
              )}
            </div>
            <div className="md:w-1/3">
              <div
                ref={sidebarRef}
                className={`bg-base-200 p-4 rounded-lg ${isSticky ? "md:sticky md:top-4" : ""}`}
              >
                <h2 className="text-xl font-semibold mb-4">プロジェクト情報</h2>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th className="text-left pr-4 py-2">クライアント</th>
                      <td>{work.workACF.companyname || "未指定"}</td>
                    </tr>
                    <tr>
                      <th className="text-left pr-4 py-2">カテゴリ</th>
                      <td>
                        {work.workCategory.nodes.map((cat) => cat.name).join(", ") || "未分類"}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left pr-4 py-2">公開日</th>
                      <td>{new Date(work.date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th className="text-left pr-4 py-2">使用技術</th>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          {work.skill.nodes.map((skill) => (
                            <span
                              key={skill.skillId}
                              className="px-2 py-1 bg-primary text-primary-content text-xs rounded-full"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 flex flex-col gap-4">
                  {work.workACF.github ? (
                    <a
                      href={work.workACF.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      GitHub
                    </a>
                  ) : (
                    <button className="btn btn-error w-full" disabled>
                      非公開
                    </button>
                  )}
                  {work.workACF.targetUrl && (
                    <a
                      href={work.workACF.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary w-full"
                    >
                      プロジェクトを見る
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            {prevWork && (
              <Link href={`/work/${prevWork.id}`} className="btn btn-outline">
                ← {prevWork.title}
              </Link>
            )}
            {nextWork && (
              <Link href={`/work/${nextWork.id}`} className="btn btn-outline">
                {nextWork.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default WorkShow;
