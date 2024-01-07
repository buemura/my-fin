import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { NotFound } from "@/app/404";
import { AccountEdit, AccountNew, Accounts } from "@/app/accounts";
import { Dashboard } from "@/app/dashboard";
import { Expenses } from "@/app/expenses";
import { Investiments } from "@/app/investiments";
import { Settings } from "@/app/settings";
import { Transactions } from "@/app/transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/accounts", element: <Accounts /> },
      { path: "/accounts/:id", element: <AccountEdit /> },
      { path: "/accounts/new", element: <AccountNew /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/investiments", element: <Investiments /> },
      { path: "/settings", element: <Settings /> },
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
