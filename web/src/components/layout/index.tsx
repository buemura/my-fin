import { JSX } from "solid-js";

import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/side-bar";

export function Layout(props: { children: JSX.Element }): JSX.Element {
  return (
    <div class="flex flex-col h-screen w-screen bg-neutral-950">
      <div class="fixed w-full">
        <Header />
      </div>

      <div class="flex flex-grow">
        <div class="flex-none bg-neutral-900 pt-16">
          <Sidebar />
        </div>

        <div class="flex-grow overflow-y-auto pt-16">{props.children}</div>
      </div>
    </div>
  );
}
