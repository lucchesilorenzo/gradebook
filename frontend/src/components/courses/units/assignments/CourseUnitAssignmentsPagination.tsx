import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type CourseUnitAssignmentsPagination = {
  page: number;
  lastPage: string | null;
  totalPages: number;
  courseSlug?: string;
  courseUnitSlug?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CourseUnitAssignmentsPagination({
  page,
  lastPage,
  totalPages,
  courseSlug,
  courseUnitSlug,
  setPage,
}: CourseUnitAssignmentsPagination) {
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
              to={`/courses/${courseSlug}/course-units/${courseUnitSlug}?page=${page - 1}`}
            />
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            key={index}
            onClick={() => handlePageChange(index + 1)}
          >
            <PaginationLink
              to={`/courses/${courseSlug}/course-units/${courseUnitSlug}?page=${index + 1}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button variant="ghost" onClick={handleNextPage} disabled={!lastPage}>
            <PaginationNext
              to={`/courses/${courseSlug}/course-units/${courseUnitSlug}?page=${page + 1}`}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
