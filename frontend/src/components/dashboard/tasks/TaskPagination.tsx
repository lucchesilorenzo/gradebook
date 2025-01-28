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
          <Button variant="ghost" onClick={onPrev} disabled={page === 1}>
            <PaginationPrevious to={`/dashboard?page=${page - 1}`} />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button variant="ghost" onClick={onNext} disabled={!lastPage}>
            <PaginationNext to={`/dashboard?page=${page + 1}`} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
