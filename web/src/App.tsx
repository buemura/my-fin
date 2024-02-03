import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "@/router";
import { ThemeProvider } from "./components/theme/theme-provider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
