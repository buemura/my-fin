import { Link } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ROUTES } from "@/router";
import { AccountListType } from "@/types/account";
import { formatBRL } from "@/utils/currency";
import { AccountDeleteDialog } from "./account-delete-dialog";
import { Pagination } from "./accounts-table-pagination";
import { AccountEditDialog } from "./account-edit-dialog";

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
                  <AccountEditDialog {...acc} />
                  <AccountDeleteDialog {...acc} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination {...metadata} />
      </div>
    </div>
  );
};
