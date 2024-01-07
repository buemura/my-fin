interface TableSkeletonProps {
  rowsCount: number;
}

export const TableSkeleton = ({ rowsCount }: TableSkeletonProps) => {
  const count = Array.from({ length: rowsCount }, (_, index) => index + 1);

  return (
    <div className="border-2 border-neutral-800 bg-neutral-900 shadow rounded-2xl p-4 w-full h-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 bg-neutral-800 rounded"></div>
          <div className="space-y-3">
            {count.map((index) => (
              <TableRowSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRowSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="h-6 bg-neutral-800 rounded"></div>
      <div className="h-6 bg-neutral-800 rounded"></div>
      <div className="h-6 bg-neutral-800 rounded"></div>
      <div className="h-6 bg-neutral-800 rounded"></div>
    </div>
  );
};
