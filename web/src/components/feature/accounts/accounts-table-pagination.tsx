import { useRouterNavigate } from "@/hooks";
import { PaginationMetadata } from "@/types/pagination-metadata";

export const Pagination = (metadata: PaginationMetadata) => {
  const router = useRouterNavigate();

  const disablePrevious = metadata.page - 1 === 0;
  const disableNext = metadata.page + 1 > metadata.totalPages;

  const handlePageClick = (page: number) => {
    router.navigate(`/accounts?page=${page}`);
  };

  return (
    <div className="py-1 px-4">
      <nav className="flex items-center space-x-1">
        <button
          type="button"
          className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          disabled={disablePrevious}
          onClick={() => handlePageClick(metadata.page - 1)}
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>

        {renderPages(metadata, handlePageClick)}

        <button
          type="button"
          className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          disabled={disableNext}
          onClick={() => handlePageClick(metadata.page + 1)}
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
  );
};

const renderPages = (
  metadata: PaginationMetadata,
  pegeClick: (page: number) => void
) => {
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
          className="min-w-[40px] flex justify-center items-center text-neutral-100 hover:bg-neutral-800 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
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
