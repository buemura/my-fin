import { Show, createSignal } from "solid-js";

import { AccountType } from "../../../types/account";
import { formatBRL } from "../../../utils/currency";
import { ConfirmationModal } from "../../ui/modal/confirmation-modal";

export const AccountRow = (account: AccountType) => {
  const [showDeleteModal, setShowDeleteModal] = createSignal(false);

  const handleDeleteAccount = () => {
    console.log("Delete account action on id", account.id);
  };

  return (
    <>
      <tr class="hover:bg-neutral-800 dark:hover:bg-gray-700">
        <td class="px-6 py-4 whitespace-nowrap font-medium text-neutral-100">
          {account.name}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-neutral-100">
          {formatBRL(account.amount)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-neutral-100">
          {account.updatedAt.toLocaleDateString("pt-BR")}
        </td>
        <td class="px-6 py-4 whitespace-nowrap font-medium flex gap-x-2">
          <a
            href={`/accounts/${account.id}/edit`}
            class="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Edit
          </a>
          <button
            type="button"
            class="font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setShowDeleteModal(!showDeleteModal())}
          >
            Delete
          </button>
        </td>
      </tr>

      <Show when={showDeleteModal()}>
        <ConfirmationModal
          modalTitle="Delete Account"
          modalText={`Are you sure you want to delete ${account.name} account ?`}
          showModal={showDeleteModal()}
          setShowModal={setShowDeleteModal}
          confirmAction={handleDeleteAccount}
        />
      </Show>
    </>
  );
};
