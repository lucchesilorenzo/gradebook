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
  onNext: () => void;
  onPrev: () => void;
};

export default function TaskPagination({
  page,
  lastPage,
  onNext,
  onPrev,
}: TaskPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" disabled={page === 1}>
            <PaginationPrevious
              to={`/dashboard?page=${page - 1}`}
              onClick={onPrev}
            />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button variant="ghost" disabled={!lastPage}>
            <PaginationNext
              to={`/dashboard?page=${page + 1}`}
              onClick={onNext}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
