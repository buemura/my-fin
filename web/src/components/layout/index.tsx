import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/side-bar";
import { useSidebarStore } from "@/store/app-store";

export function Layout(props: { children: React.ReactNode }) {
  const { sidebarVisible } = useSidebarStore();

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950">
      <div className="fixed w-full z-20">
        <Header />
      </div>

      <div className="flex flex-grow">
        {sidebarVisible && (
          <div className="h-screen flex-none bg-neutral-900 pt-20 fixed z-10">
            <Sidebar />
          </div>
        )}

        <div
          className={`flex-grow overflow-y-auto pt-20 ${
            sidebarVisible && "opacity-35 sm:opacity-100 sm:pl-36"
          }`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
