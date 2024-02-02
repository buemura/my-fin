export function CardSkeleton() {
  return (
    <div className="flex flex-col items-center border-2 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 p-12 rounded-2xl">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 bg-neutral-300 dark:bg-neutral-800 rounded"></div>
          <div className="h-2 w-36 bg-neutral-300 dark:bg-neutral-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}
