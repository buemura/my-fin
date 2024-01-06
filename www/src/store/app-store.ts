import { create } from "zustand";

type SideBarStore = {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SideBarStore>((set) => ({
  sidebarVisible: true,
  toggleSidebar: () =>
    set((state: SideBarStore) => ({ sidebarVisible: !state.sidebarVisible })),
}));
