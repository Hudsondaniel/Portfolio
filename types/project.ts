export interface Project {
  slug: string;
  content: string;
  title: string;
  description: string;
  date?: string;
  url?: string;
  repository?: string;
  published: boolean;
} 