import { JSX } from "solid-js";

import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/side-bar";

export function Layout(props: { children: JSX.Element }): JSX.Element {
  return (
    <div class="h-screen w-screen bg-neutral-900">
      <Header />

      <div class="flex h-max">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}
