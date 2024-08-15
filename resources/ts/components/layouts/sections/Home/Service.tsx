import React from "react";
import SectionHeader from "../../header/SectionHeader";
import { useSpring, animated } from "react-spring";
import FrontendIcon from "../../../../assets/svg/FrontendIcon";
import BackendIcon from "../../../../assets/svg/BackendIcon";
import CMSIcon from "../../../../assets/svg/CMSIcon";
import WebDesignIcon from "../../../../assets/svg/WebDesignIcon";
import CodingIcon from "../../../../assets/svg/CordingIcon";
import ECommerceIcon from "../../../../assets/svg/ECommerceIcon";

interface ServiceItemProps {
  icon: React.ReactNode;
  titleEn: string;
  titleJa: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, titleEn, titleJa, description }) => {
  const [springs, api] = useSpring(() => ({
    from: { scaleY: 1, scaleX: 1 },
    config: {
      tension: 300,
      friction: 10,
    },
  }));

  const handleMouseEnter = () => {
    api.start({
      to: async (next) => {
        // 押し潰される瞬間 (約200ms)
        await next({
          scaleY: 0.6,
          scaleX: 1.3,
          config: { tension: 300, friction: 10, duration: 200 },
        });
        // 跳ね返る瞬間 (約60ms)
        await next({
          scaleY: 1.2,
          scaleX: 0.8,
          config: { tension: 500, friction: 15, duration: 60 },
        });
        // 元の形に戻る (約40ms)
        await next({
          scaleY: 1,
          scaleX: 1,
          config: { tension: 600, friction: 15, duration: 40 },
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <animated.div
        style={{
          ...springs,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px", // 150pxに変更
          height: "150px", // 150pxに変更
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "1rem",
        }}
        onMouseEnter={handleMouseEnter}
      >
        <div className="w-24 h-24 text-primary">
          {" "}
          {/* アイコンのサイズも調整 */}
          {icon}
        </div>
      </animated.div>
      <div className="text-center">
        <h3 className="t en-title text-2xl font-bold mb-1 text-neutral-content">{titleEn}</h3>
        <p className="text-sm text-primary mb-4">{titleJa}</p>
        <p className="t text-sm text-neutral-content text-left">{description}</p>
      </div>
    </div>
  );
};

const Service: React.FC = () => {
  const services: ServiceItemProps[] = [
    {
      icon: <FrontendIcon />,
      titleEn: "Frontend Development",
      titleJa: "フロントエンド開発",
      description:
        "最新のReactやVue.jsを駆使し、高速で動的なWebアプリケーションを構築。Next.jsにも対応し、SEO対策も万全。ユーザー体験を重視した直感的なインターフェースで、ビジネスの成功を支援します。",
    },
    {
      icon: <BackendIcon />,
      titleEn: "Backend Development",
      titleJa: "バックエンド開発",
      description:
        "PHPのフレームワークLaravelを主軸に、堅牢で拡張性の高いバックエンドシステムを構築。効率的なデータベース設計やAPIの実装により、安全かつ高速なWebサービスの基盤を提供します。",
    },
    {
      icon: <CMSIcon />,
      titleEn: "CMS Development",
      titleJa: "CMS開発",
      description:
        "WordPressを中心に、カスタムテーマやプラグイン開発を行います。SEO対策やパフォーマンス最適化を考慮し、運用しやすく拡張性の高いCMSサイトを構築。ビジネスニーズに合わせた柔軟な開発が可能です。",
    },
    {
      icon: <WebDesignIcon />,
      titleEn: "Web Design",
      titleJa: "Webデザイン",
      description:
        "ユーザー体験（UX）を最優先に考えたモダンで魅力的なデザインを提供。最新のデザイントレンドを取り入れつつ、ブランドの個性を活かしたビジュアルで、訪問者の心を掴む印象的なWebサイトを実現します。",
    },
    {
      icon: <CodingIcon />,
      titleEn: "Coding",
      titleJa: "コーディング",
      description:
        "セマンティックHTMLによる構造化されたマークアップを提供。FLOCSSやBEMなどの命名規則に準拠したCSS設計で、保守性と再利用性の高いコードを実現。レスポンシブデザインにも対応し、多様なデバイスに最適化。",
    },
    {
      icon: <ECommerceIcon />,
      titleEn: "EC Site",
      titleJa: "ECサイト",
      description:
        "ShopifyなどのASPを活用し、迅速かつ安全なECサイトを構築。カスタマイズやテーマ開発により、ブランドに合わせた独自のオンラインストアを実現。決済システムの導入から在庫管理まで、包括的なサポートを提供します。",
    },
  ];

  return (
    <section className="bg-neutral pb-1">
      <SectionHeader
        title="Service"
        subtitle="SilMoにできること。"
        image="/images/photo/monitor.jpg"
      />
      <div className="relative z-10">
        <div className="container mx-auto px-4 mt-5 md:-mt-[100px] mb-32 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceItem key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
