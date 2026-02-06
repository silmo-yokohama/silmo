import { TECH_SKILLS } from '@/lib/constants';

/**
 * 技術スタック表示グリッド
 * カテゴリ別にスキルとレベルを表示する
 */
export function TechStackGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(TECH_SKILLS).map(([key, category]) => (
        <div
          key={key}
          className="rounded-lg border border-text-dark/20 bg-bg-card p-6 transition-all duration-300 hover:border-primary/30"
        >
          {/* カテゴリ名 */}
          <h3 className="mb-4 font-[family-name:var(--font-pixel)] text-lg text-primary">
            {category.label}
          </h3>

          {/* スキル一覧 */}
          <div className="space-y-3">
            {category.skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between gap-3">
                <span className="text-sm text-text-sub">{skill.name}</span>
                {/* レベルバー（ピクセル風） */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-3 w-3 ${
                        i < skill.level ? 'bg-primary' : 'bg-text-dark/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
