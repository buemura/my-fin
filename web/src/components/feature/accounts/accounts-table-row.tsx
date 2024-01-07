import { useState } from "react";
import { Link } from "react-router-dom";

import { deleteAccountById } from "@/api/accounts";
import { ConfirmationModal } from "@/components/ui/modal";
import { AccountType } from "@/types/account";
import { formatBRL } from "@/utils/currency";

export const AccountRow = (account: AccountType) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async () => {
    const res = await deleteAccountById(account.id);
    if (!res) {
      alert("Unable to delete account");
    }
    location.reload();
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
          {new Date(account.updatedAt).toLocaleDateString("pt-BR")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-medium flex gap-x-2">
          <Link
            to={`/accounts/${account.id}`}
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

      {showDeleteModal && (
        <ConfirmationModal
          modalTitle="Delete Account"
          modalText={`Are you sure you want to delete ${account.name} account ?`}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={handleDeleteAccount}
        />
      )}
    </>
  );
};
