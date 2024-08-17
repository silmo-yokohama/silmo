import React, { useEffect } from "react";
import { router, useRemember } from "@inertiajs/react";
import { useSilmoAPI } from "../../hooks/useSilmoAPI";
import SubPageLayout from "../../components/layouts/page/SubPageLayout";
import GridLayout from "../../components/layouts/common/GridLayout";
import { Work } from "../../types/responses/Works";
import GridItemLink from "../../components/ui/links/GridItemLink";

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface WorksResponse {
  works: Work[];
  pageInfo: PageInfo;
}

const WorksIndex: React.FC = () => {
  const [works, setWorks] = useRemember<Work[]>([], "works");
  const [pageInfo, setPageInfo] = useRemember<PageInfo>(
    { hasNextPage: false, endCursor: null },
    "pageInfo"
  );
  const [currentPage, setCurrentPage] = useRemember(1, "currentPage");
  const { get } = useSilmoAPI();

  useEffect(() => {
    if (works.length === 0) {
      fetchWorks(currentPage, pageInfo.endCursor);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage.toString());
    if (pageInfo.endCursor) {
      urlParams.set("cursor", pageInfo.endCursor);
    }
    router.visit(`${window.location.pathname}?${urlParams.toString()}`, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  }, [currentPage, pageInfo.endCursor]);

  const fetchWorks = async (page: number, cursor: string | null) => {
    try {
      const response = await get<WorksResponse>("/api/works", {
        params: { per_page: 9, after: cursor },
      });
      if (page === 1) {
        setWorks(response.works);
      } else {
        setWorks((prev) => [...prev, ...response.works]);
      }
      setPageInfo(response.pageInfo);
    } catch (error) {
      console.error("Failed to fetch works", error);
    }
  };

  const loadMore = () => {
    if (pageInfo.hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchWorks(nextPage, pageInfo.endCursor);
    }
  };

  return (
    <SubPageLayout
      title="実績一覧"
      headerTitle="Works"
      headerSubtitle="実績"
      headerImage="/images/photo/workdesk.jpg"
    >
      <div className="container mx-auto px-4 py-16">
        <GridLayout columns={3}>
          {works.map((work) => (
            <GridItemLink
              key={work.workId}
              href={`/work/${work.workId}`}
              image={work.workACF.eyecatch.node.sourceUrl}
              title={work.title}
              badges={work.skill.nodes.map((category) => category.name)}
            />
          ))}
        </GridLayout>
        {pageInfo.hasNextPage && (
          <div className="text-center mt-8">
            <button onClick={loadMore} className="btn btn-primary">
              さらに読み込む
            </button>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
};

export default WorksIndex;
