import { createSignal } from "solid-js";

const [hideSidebar, setHideSidebar] = createSignal(true);
export const useSidebar = () => ({
  hideSidebar,
  setHideSidebar,
});
