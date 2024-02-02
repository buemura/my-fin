import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { ROUTES } from "@/router";
import { PaginationMetadata } from "@/types/pagination-metadata";

export const Pagination = (metadata: PaginationMetadata) => {
  const router = useRouterNavigate();

  const disablePrevious = metadata.page - 1 === 0;
  const disableNext = metadata.page + 1 > metadata.totalPages;

  const handlePageClick = (page: number) => {
    router.navigate(`${ROUTES.ACCOUNTS}?page=${page}`);
  };

  return (
    <div className="py-1 px-4 border-x border-b bg-white dark:bg-neutral-900">
      <nav className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          disabled={disablePrevious}
          onClick={() => handlePageClick(metadata.page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Pages metadata={metadata} pegeClick={handlePageClick} />

        <Button
          variant="outline"
          size="icon"
          disabled={disableNext}
          onClick={() => handlePageClick(metadata.page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

interface PagesProps {
  metadata: PaginationMetadata;
  pegeClick: (page: number) => void;
}

const Pages = ({ metadata, pegeClick }: PagesProps) => {
  const pages = Array.from(
    { length: metadata.totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      {pages?.map((page) => (
        <button
          key={page}
          type="button"
          className="min-w-[40px] flex justify-center items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
          aria-current="page"
          disabled={metadata.page === page}
          onClick={() => pegeClick(page)}
        >
          {page}
        </button>
      ))}
    </>
  );
};
