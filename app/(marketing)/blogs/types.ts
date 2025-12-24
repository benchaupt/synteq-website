type Category = {
  id: number;
  name: string;
};

type Media = {
  id: number;
  url: string;
  alt?: string | null;
};

type PaginatedDocs<T> = {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

const posts: PaginatedDocs<{
  id: number;
  title: string;
  categories?: (number | Category)[] | null | undefined;
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  } | undefined;
  slug?: string | null | undefined;
}> = {
  docs: [],
  total: 0,
  limit: 0,
  page: 0,
  pages: 0,
};

export { posts };
