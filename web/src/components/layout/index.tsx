import { JSX, Show } from "solid-js";

import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/side-bar";
import { useSidebar } from "@/store/app-store";

export function Layout(props: { children: JSX.Element }): JSX.Element {
  const { hideSidebar } = useSidebar();

  return (
    <div class="flex flex-col h-screen w-screen bg-neutral-950">
      <div class="fixed w-full z-10">
        <Header />
      </div>

      <div class="flex flex-grow">
        <Show when={hideSidebar()}>
          <div class="fixed h-screen flex-none bg-neutral-900 pt-16">
            <Sidebar />
          </div>
        </Show>

        <div class="flex-grow overflow-y-auto sm:pl-32 pt-16">
          {props.children}
        </div>
      </div>
    </div>
  );
}
