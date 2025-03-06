import { Button } from "../ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type NotificationPaginationProps = {
  page: number;
  lastPage: string | null;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function NotificationPagination({
  page,
  lastPage,
  totalPages,
  setPage,
}: NotificationPaginationProps) {
  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  function handlePrevPage() {
    setPage((prev) => prev - 1);
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <PaginationPrevious
              to={`/teacher/notifications?page=${page - 1}`}
            />
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            key={index}
            onClick={() => handlePageChange(index + 1)}
          >
            <PaginationLink to={`/teacher/notifications?page=${index + 1}`}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button variant="ghost" onClick={handleNextPage} disabled={!lastPage}>
            <PaginationNext to={`/teacher/notifications?page=${page + 1}`} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
