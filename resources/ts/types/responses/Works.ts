export interface SourceUrl {
  sourceUrl: string;
}

export interface ImageNode {
  node: SourceUrl;
}

export interface WorkACF {
  eyecatch: ImageNode;
  eyecatch_sp: ImageNode;
  github: string | null;
  targetUrl: string | null;
}

export interface CategoryNode {
  name: string;
}

export interface SkillNode {
  skillId: number;
  name: string;
}

export interface WorkCategory {
  nodes: CategoryNode[];
}

export interface Skill {
  nodes: SkillNode[];
}

export interface Work {
  date: string;
  content: string | null;
  title: string;
  workACF: WorkACF;
  workCategory: WorkCategory;
  skill: Skill;
  workId: number;
}

export type WorksResponse = Work[];
