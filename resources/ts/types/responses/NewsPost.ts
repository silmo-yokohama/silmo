export interface NewsPost {
  title: string;
  date: string;
  id: string;
  modified: string;
}

export interface NewsResponse {
  result: NewsPost[];
}
