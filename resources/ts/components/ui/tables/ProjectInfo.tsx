// resources/ts/components/works/ProjectInfo.tsx

import React from "react";
import { Work } from "../../../types/responses/Works";

interface ProjectInfoProps {
  work: Work;
  isSticky: boolean;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ work, isSticky }) => {
  return (
    <div
      className={`bg-base-300 p-4 rounded-lg ${isSticky ? "md:sticky" : ""}`}
      style={{ position: isSticky ? "sticky" : "static", top: "1rem" }}
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
            <td>{work.workCategory.nodes.map((cat) => cat.name).join(", ") || "未分類"}</td>
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
                  <span key={skill.skillId} className="badge badge-primary text-white">
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
  );
};

export default ProjectInfo;
