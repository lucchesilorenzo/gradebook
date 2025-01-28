import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TaskPaginationProps = {
  page: number;
  lastPage: string | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function TaskPagination({
  page,
  lastPage,
  setPage,
}: TaskPaginationProps) {
  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  function handlePrevPage() {
    setPage((prev) => prev - 1);
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
            <PaginationPrevious to={`/dashboard?page=${page - 1}`} />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button variant="ghost" onClick={handleNextPage} disabled={!lastPage}>
            <PaginationNext to={`/dashboard?page=${page + 1}`} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
