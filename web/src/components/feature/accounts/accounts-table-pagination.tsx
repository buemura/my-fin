import { PaginationMetadata } from "@/types/pagination-metadata";

export const Pagination = (metadata: PaginationMetadata) => {
  return (
    <div class="py-1 px-4">
      <nav class="flex items-center space-x-1">
        <button
          type="button"
          class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </button>

        {renderPages(metadata)}

        <button
          type="button"
          class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
  );
};

const renderPages = (metadata: PaginationMetadata) => {
  const pages = Array.from(
    { length: metadata.totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      {pages?.map((page) => (
        <button
          type="button"
          class="min-w-[40px] flex justify-center items-center text-neutral-100 hover:bg-neutral-800 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
          aria-current="page"
          disabled={metadata.page === page}
        >
          {page}
        </button>
      ))}
    </>
  );
};