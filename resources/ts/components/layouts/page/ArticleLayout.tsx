// resources/ts/components/layouts/page/ArticleLayout.tsx

import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "./MainLayout";
import Breadcrumb from "../../ui/navigations/Breadcrumb";
import ArticleHeader from "../header/ArticleHeader";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ArticleLayoutProps {
  title: string;
  headerTitle: string;
  headerSubtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  title,
  headerTitle,
  headerSubtitle,
  breadcrumbs,
  children,
}) => {
  return (
    <MainLayout>
      <Head title={title} />
      <ArticleHeader headerTitle={headerTitle} headerSubtitle={headerSubtitle} />
      <Breadcrumb
        items={breadcrumbs}
        className="bg-base-100 border-t border-b border-base-300 dark:border-base-content/10"
      />
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-12 md:py-16">{children}</div>
      </div>
    </MainLayout>
  );
};
export default ArticleLayout;
