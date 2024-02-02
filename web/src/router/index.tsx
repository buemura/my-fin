import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "@/pages/404";
import { Accounts } from "@/pages/accounts";
import { Dashboard } from "@/pages/dashboard";
import { Expenses } from "@/pages/expenses";
import { Investiments } from "@/pages/investiments";
import { Transactions } from "@/pages/transactions";
import { SignIn, SignUp } from "@/pages/auth";

export const ROUTES = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
  ACCOUNTS: "/accounts",
  ACCOUNTS_NEW: "/accounts/new",
  EXPENSES: "/expenses",
  INVESTIMENTS: "/investiments",
  TRANSACTIONS: "/transactions",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    children: [
      { path: ROUTES.SIGNIN, element: <SignIn /> },
      { path: ROUTES.SIGNUP, element: <SignUp /> },
      { path: ROUTES.ROOT, element: <Dashboard /> },
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.ACCOUNTS, element: <Accounts /> },
      { path: ROUTES.EXPENSES, element: <Expenses /> },
      { path: ROUTES.INVESTIMENTS, element: <Investiments /> },
      { path: ROUTES.TRANSACTIONS, element: <Transactions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
