import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../components/layouts/page/MainLayout";

interface NotFoundProps {
  status?: number;
}

/**
 * 404 Not Found ページコンポーネント
 */
const NotFound: React.FC<NotFoundProps> = ({ status = 404 }) => {
  return (
    <MainLayout>
      <Head title={`${status} - Not Found`} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content">
        <h1 className="text-6xl font-bold mb-4">{status}</h1>
        <p className="text-2xl mb-8">ページが見つかりません</p>
        <a href="/" className="btn btn-primary">
          ホームに戻る
        </a>
      </div>
    </MainLayout>
  );
};

export default NotFound;
