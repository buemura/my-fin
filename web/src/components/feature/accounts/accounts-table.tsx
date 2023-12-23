import { AccountListType, AccountType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";

const tableHeader = ["Name", "Amount", "Last Updated", "Action"];

export const AccountsTable = ({ data, metadata }: AccountListType) => {
  return (
    <div className="flex flex-col border-2 border-neutral-800 rounded-2xl bg-neutral-900">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead>
                <tr>
                  {tableHeader?.map((h) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-lg font-medium text-neutral-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {data?.map((account) => (
                  <AccountRow {...account} />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination {...metadata} />
        </div>
      </div>
    </div>
  );
};

const AccountRow = (account: AccountType) => {
  return (
    <tr
      key={account.id}
      className="hover:bg-neutral-800 dark:hover:bg-gray-700"
    >
      <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-100">
        {account.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-neutral-100">
        R$ {account.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-neutral-100">
        {account.updatedAt.toLocaleDateString("pt-BR")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-medium flex gap-x-2">
        <button
          type="button"
          className="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
        >
          Edit
        </button>
        <button
          type="button"
          className="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const Pagination = (metadata: PaginationMetadata) => {
  const pagesArray = (length: number) => {
    return Array.from({ length }, (_, index) => index + 1);
  };

  return (
    <div className="py-1 px-4">
      <nav className="flex items-center space-x-1">
        <button
          type="button"
          className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>

        {pagesArray(metadata.totalPages).map((page) => (
          <button
            type="button"
            className="min-w-[40px] flex justify-center items-center text-neutral-100 hover:bg-neutral-800 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
            aria-current="page"
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-neutral-100 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
  );
};
