import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import type { Sandbox } from '@/types/sandbox';

type SandboxCardProps = {
  sandbox: Sandbox;
};

/** ステータスに対応するバッジバリアント */
const statusVariant: Record<string, 'primary' | 'accent' | 'outline' | 'muted'> = {
  完成: 'primary',
  開発中: 'accent',
  メンテナンス中: 'outline',
  アーカイブ: 'muted',
};

/**
 * サンドボックス（個人開発プロジェクト）カード
 * プロジェクト概要とリンクを表示する
 */
export function SandboxCard({ sandbox }: SandboxCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-text-dark/20 bg-bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,161,151,0.15)]">
      {/* サムネイル */}
      {sandbox.thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={sandbox.thumbnail.url}
            alt={sandbox.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* コンテンツ */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* ステータス */}
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[sandbox.status] || 'muted'}>{sandbox.status}</Badge>
        </div>

        {/* タイトル */}
        <h3 className="text-lg font-bold text-text-main">{sandbox.title}</h3>

        {/* 使用技術 */}
        {sandbox.technologies && sandbox.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {sandbox.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* 開発目的 */}
        {sandbox.purpose && (
          <p className="text-sm leading-relaxed text-text-sub">{sandbox.purpose}</p>
        )}

        {/* リンク */}
        <div className="mt-auto flex gap-3 pt-2">
          {sandbox.siteUrl && (
            <a
              href={sandbox.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary transition-colors hover:text-primary-light"
            >
              サイトを見る →
            </a>
          )}
          {sandbox.githubUrl && (
            <a
              href={sandbox.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-sub transition-colors hover:text-text-main"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
