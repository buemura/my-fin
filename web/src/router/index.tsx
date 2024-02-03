import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { NotFound } from "@/pages/404";
import { Accounts } from "@/pages/accounts";
import { SignIn, SignUp } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Expenses } from "@/pages/expenses";
import { Investiments } from "@/pages/investiments";
import { Transactions } from "@/pages/transactions";
import { useUserStore } from "@/store";
import { useCheckAuth } from "@/hooks";

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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route
          path={ROUTES.SIGNIN}
          element={
            <RedirectToRoot>
              <SignIn />
            </RedirectToRoot>
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            <RedirectToRoot>
              <SignUp />
            </RedirectToRoot>
          }
        />

        {/* APP */}
        <Route
          path={ROUTES.ROOT}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ACCOUNTS}
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EXPENSES}
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.INVESTIMENTS}
          element={
            <ProtectedRoute>
              <Investiments />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TRANSACTIONS}
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

function RedirectToRoot({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  if (user) return <Navigate to={ROUTES.DASHBOARD} />;
  return children;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  if (!user) return <Navigate to={ROUTES.SIGNIN} />;

  const { status } = useCheckAuth(user);
  if (status === "error") return <Navigate to={ROUTES.SIGNIN} />;

  return children;
}
