import { useRouterNavigate } from "@/hooks/useRouterNavigate";

export function NotFound() {
  const { routerNavigate } = useRouterNavigate();

  const handleGoBack = () => {
    return routerNavigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Oops! You&apos;ve reached a non explored area...</h1>
      <button
        className="bg-primary text-white p-2 rounded-md"
        onClick={handleGoBack}
      >
        Go back to Home
      </button>
    </div>
  );
}
