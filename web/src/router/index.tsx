import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "@/pages/404";
import { Accounts, AccountsEdit, AccountsNew } from "@/pages/accounts";
import { Dashboard } from "@/pages/dashboard";
import { Expenses } from "@/pages/expenses";
import { Investiments } from "@/pages/investiments";
import { Transactions } from "@/pages/transactions";

export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  ACCOUNTS: "/accounts",
  ACCOUNTS_EDIT: "/accounts/:id",
  ACCOUNTS_NEW: "/accounts/new",
  EXPENSES: "/expenses",
  INVESTIMENTS: "/investiments",
  TRANSACTIONS: "/transactions",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    children: [
      { path: ROUTES.ROOT, element: <Dashboard /> },
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.ACCOUNTS, element: <Accounts /> },
      { path: ROUTES.ACCOUNTS_EDIT, element: <AccountsEdit /> },
      { path: ROUTES.ACCOUNTS_NEW, element: <AccountsNew /> },
      { path: ROUTES.EXPENSES, element: <Expenses /> },
      { path: ROUTES.INVESTIMENTS, element: <Investiments /> },
      { path: ROUTES.TRANSACTIONS, element: <Transactions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
