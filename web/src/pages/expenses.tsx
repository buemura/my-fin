import { Sidebar } from "@/components/navigation/side-bar";

export function Expenses() {
  return (
    <div class="flex">
      <Sidebar />
      <main class="h-screen w-screen bg-neutral-950 p-10 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl mt-4">Expenses</h1>
      </main>
    </div>
  );
}
