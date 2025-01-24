import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

type NotificationPaginationProps = {
  page: number;
  lastPage: string | null;
  onNext: () => void;
  onPrev: () => void;
};

export default function NotificationPagination({
  page,
  lastPage,
  onNext,
  onPrev,
}: NotificationPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" disabled={page === 1}>
            <PaginationPrevious
              to={`/notifications?page=${page - 1}`}
              onClick={onPrev}
            />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button variant="ghost" disabled={!lastPage}>
            <PaginationNext
              to={`/notifications?page=${page + 1}`}
              onClick={onNext}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
