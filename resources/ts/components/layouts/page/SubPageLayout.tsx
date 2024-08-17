import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "./MainLayout";
import SubPageHeader from "../header/SubPageHeader";

interface SubPageLayoutProps {
  title: string;
  headerTitle: string;
  headerSubtitle: string;
  headerImage: string;
  children: React.ReactNode;
}

const SubPageLayout: React.FC<SubPageLayoutProps> = ({
  title,
  headerTitle,
  headerSubtitle,
  headerImage,
  children,
}) => {
  return (
    <MainLayout>
      <Head title={title} />
      <SubPageHeader title={headerTitle} subtitle={headerSubtitle} image={headerImage} />
      <div className="bg-base-200 min-h-screen">
        <div className="container mx-auto px-4 py-16">{children}</div>
      </div>
    </MainLayout>
  );
};

export default SubPageLayout;
