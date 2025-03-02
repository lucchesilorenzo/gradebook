export type TTask = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TaskWithPagination = {
  current_page: number;
  data: TTask[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
