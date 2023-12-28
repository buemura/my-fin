import { AccountListType } from "../../../types/account";
import { Pagination } from "./accounts-table-pagination";
import { AccountRow } from "./accounts-table-row";

const tableHeader = ["Name", "Amount", "Last Updated", "Action"];

export const AccountsTable = ({ data, metadata }: AccountListType) => {
  return (
    <div class="flex flex-col border-2 border-neutral-800 rounded-2xl bg-neutral-900">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-neutral-800">
              <thead>
                <tr>
                  {tableHeader?.map((h) => (
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-lg font-medium text-neutral-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800">
                {data.accounts?.map((account) => (
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
