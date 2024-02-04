import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useCheckAuth } from "@/hooks";
import { NotFound } from "@/pages/404";
import { SignIn, SignUp } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { useUserStore } from "@/store";

export const ROUTES = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
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
