"use client";
import { useState } from "react";

import { ConfirmationModal } from "@/components/ui/modal/confirmation-modal";
import { AccountListType, AccountType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";
import { formatBRL } from "@/utils/currency";
import Link from "next/link";

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
                      key={h}
                      scope="col"
                      className="px-6 py-3 text-start text-lg font-medium text-neutral-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {data.accounts?.map((account) => (
                  <AccountRow key={account.id} {...account} />
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Delete account action on id", account.id);
  };

  return (
    <>
      <tr className="hover:bg-neutral-800 dark:hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-100">
          {account.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-neutral-100">
          {formatBRL(account.amount)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-neutral-100">
          {account.updatedAt.toLocaleDateString("pt-BR")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-medium flex gap-x-2">
          <Link
            href={`/accounts/${account.id}`}
            className="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Edit
          </Link>
          <button
            type="button"
            className="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setShowDeleteModal(!showDeleteModal)}
          >
            Delete
          </button>
        </td>
      </tr>

      <ConfirmationModal
        key={account.id}
        modalTitle="Delete Account"
        modalText={`Are you sure you want to delete ${account.name} account ?`}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        confirmAction={handleDeleteAccount}
      />
    </>
  );
};

const Pagination = (metadata: PaginationMetadata) => {
  const renderPages = (metadata: PaginationMetadata) => {
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
          >
            {page}
          </button>
        ))}
      </>
    );
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

        {renderPages(metadata)}

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
