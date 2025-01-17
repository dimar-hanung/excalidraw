import { ExportIcon, saveAs } from "../components/icons";
import { ToolButton } from "../components/ToolButton";
import { saveAsJSON } from "../data";
import { t } from "../i18n";
import { useDevice } from "../components/App";
import { KEYS } from "../keys";
import { register } from "./register";
import { nativeFileSystemSupported } from "../data/filesystem";

import "../components/ToolIcon.scss";
import { StoreAction } from "../store";

export const actionSave = register({
  name: "save",
  label: "buttons.save",
  icon: ExportIcon,
  trackEvent: { category: "export" },
  perform: async (elements, appState, value, app) => {
    try {
      const { fileHandle } = await saveAsJSON(
        elements,
        {
          ...appState,
          fileHandle: null,
        },
        app.files,
        app.getName(),
      );
      return {
        storeAction: StoreAction.NONE,
        appState: {
          ...appState,
          openDialog: null,
          fileHandle,
          toast: { message: t("toast.fileSaved") },
        },
      };
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        console.error(error);
      } else {
        console.warn(error);
      }
      return { storeAction: StoreAction.NONE };
    }
  },
  keyTest: (event) =>
    event.key === KEYS.S && event.shiftKey && event[KEYS.CTRL_OR_CMD],
  PanelComponent: ({ updateData }) => (
    <ToolButton
      type="button"
      icon={saveAs}
      title={t("buttons.saveAs")}
      aria-label={t("buttons.saveAs")}
      showAriaLabel={useDevice().editor.isMobile}
      hidden={!nativeFileSystemSupported}
      onClick={() => updateData(null)}
      data-testid="save-as-button"
    />
  ),
});
