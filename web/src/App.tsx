import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { NotFound } from "@/pages/404";
import { AccountsEdit, AccountsNew, Accounts } from "@/pages/accounts";
import { Dashboard } from "@/pages/dashboard";
import { Expenses } from "@/pages/expenses";
import { Investiments } from "@/pages/investiments";
import { Transactions } from "@/pages/transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/accounts", element: <Accounts /> },
      { path: "/accounts/:id", element: <AccountsEdit /> },
      { path: "/accounts/new", element: <AccountsNew /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/investiments", element: <Investiments /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
