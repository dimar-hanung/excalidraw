import type { PropsWithoutRef } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useUIAppState } from "../../context/ui-appState";

export function AISidebar(
  props: PropsWithoutRef<{
    docked: boolean;
    onDock: (docked: boolean) => void;
  }>,
) {
  const appState = useUIAppState();

  if (!appState) {
    return null;
  }

  console.debug('hint-->')

  return (
    <Sidebar name="ai-sidebar">
      <Sidebar.Header />
      <div>xxx</div>
    </Sidebar>
  );
}
