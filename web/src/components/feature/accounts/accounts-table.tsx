import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { AccountListType } from "@/types/account";
import { formatBRL } from "@/utils/currency";
import { Pagination } from "./accounts-table-pagination";
import { AccountRow } from "./accounts-table-row";

const tableHeader = ["Name", "Amount", "Last Updated", "Action"];

export const AccountsTable = ({ data, metadata }: AccountListType) => {
  return (
    <div className="max-w-full">
      <div className="border">
        <Table className="border bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <TableHeader className="border-b">
            {tableHeader?.map((h) => (
              <TableHead>{h}</TableHead>
            ))}
          </TableHeader>

          <TableBody>
            {data.accounts.map((acc) => (
              <TableRow key={acc.id}>
                <TableCell>{acc.name}</TableCell>
                <TableCell>{formatBRL(acc.amount)}</TableCell>
                <TableCell>
                  {new Date(acc.updatedAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-400"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-400"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination {...metadata} />
      </div>
    </div>
  );

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
