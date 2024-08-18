import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { gsap } from "gsap";
import MainLayout from "../components/layouts/page/MainLayout";

const NotFound: React.FC = () => {
  useEffect(() => {
    // アニメーション効果
    gsap.from(".animate-fade-in", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
    });
  }, []);

  return (
    <MainLayout>
      <Head title="404 - ページが見つかりません" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content p-4">
        <div className="text-center animate-fade-in">
          <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-5xl font-bold mb-8">ページが見つかりません</h2>
        </div>
        <div className="max-w-md text-center animate-fade-in">
          <p className="mb-8 text-xs md:text-lg">
            お探しのページは存在しないか、
            <br />
            移動または削除された可能性があります。
          </p>
        </div>
        <div className="animate-fade-in">
          <Link href="/" className="btn btn-primary btn-lg">
            ホームへ戻る
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
