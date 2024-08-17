// resources/ts/pages/Works/Index.tsx

import React, { useEffect, useState } from "react";
import { useSilmoAPI } from "../../hooks/useSilmoAPI";
import { Work } from "../../types/Works";
import Pagination from "../../components/ui/pagination/Pagination";
import WorkCard from "./WorkCard";
import SubPageLayout from "../../components/layouts/page/SubPageLayout";
import GridLayout from "../../components/layouts/common/GridLayout";

interface WorksResponse {
  works: Work[];
  current_page: number;
  per_page: number;
  total: number;
}

const WorksIndex: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { get } = useSilmoAPI();

  useEffect(() => {
    fetchWorks(currentPage);
  }, [currentPage]);

  const fetchWorks = async (page: number) => {
    try {
      const response = await get<WorksResponse>("/api/works", { params: { page } });
      setWorks(response.works);
      setCurrentPage(response.current_page);
      setTotalPages(Math.ceil(response.total / response.per_page));
    } catch (error) {
      console.error("Failed to fetch works", error);
    }
  };

  return (
    <SubPageLayout
      title="実績一覧"
      headerTitle="Our Works"
      headerSubtitle="これまでの実績"
      headerImage="/images/works-header.jpg"
    >
      <GridLayout columns={3}>
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </GridLayout>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </SubPageLayout>
  );
};

export default WorksIndex;
