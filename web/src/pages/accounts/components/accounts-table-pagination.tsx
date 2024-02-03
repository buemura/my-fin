import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { ROUTES } from "@/router";
import { PaginationMetadata } from "@/types/pagination-metadata";

export const Pagination = (metadata: PaginationMetadata) => {
  const { router } = useRouterNavigate();

  const disablePrevious = metadata.page - 1 === 0;
  const disableNext = metadata.page + 1 > metadata.totalPages;

  const pages = Array.from(
    { length: metadata.totalPages },
    (_, index) => index + 1
  );

  const handlePageClick = (page: number) => {
    router.navigate(`${ROUTES.ACCOUNTS}?page=${page}`);
  };

  return (
    <div className="py-1 px-4 border-x border-b bg-white dark:bg-neutral-900">
      <nav className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          disabled={disablePrevious}
          onClick={() => handlePageClick(metadata.page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages?.map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="icon"
            aria-current="page"
            disabled={metadata.page === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
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
