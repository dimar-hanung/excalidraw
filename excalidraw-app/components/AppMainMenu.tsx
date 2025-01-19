import React from "react";
import { eyeIcon } from "../../packages/excalidraw/components/icons";
import type { Theme } from "../../packages/excalidraw/element/types";
import { MainMenu } from "../../packages/excalidraw/index";
import { LanguageList } from "../app-language/LanguageList";
import { saveDebugState } from "./DebugCanvas";
import { useI18n } from "../../packages/excalidraw/i18n";

export const AppMainMenu: React.FC<{
  onCollabDialogOpen: () => any;
  isCollaborating: boolean;
  isCollabEnabled: boolean;
  theme: Theme | "system";
  setTheme: (theme: Theme | "system") => void;
  refresh: () => void;
}> = React.memo((props) => {
  const { t } = useI18n();
  return (
    <MainMenu>
      {/* <MainMenu.DefaultItems.Save /> */}
      <MainMenu.DefaultItems.ImportExportScene />
      <MainMenu.DefaultItems.SaveAsImage />
      {props.isCollabEnabled && (
        <MainMenu.DefaultItems.LiveCollaborationTrigger
          isCollaborating={props.isCollaborating}
          onSelect={() => props.onCollabDialogOpen()}
        />
      )}
      <MainMenu.DefaultItems.CommandPalette className="highlighted" />
      <MainMenu.DefaultItems.SearchMenu />
      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.Separator />
      {import.meta.env.DEV && (
        <>
          <MainMenu.Item
            icon={eyeIcon}
            onClick={() => {
              if (window.visualDebug) {
                delete window.visualDebug;
                saveDebugState({ enabled: false });
              } else {
                window.visualDebug = { data: [] };
                saveDebugState({ enabled: true });
              }
              props?.refresh();
            }}
          >
            Debug
          </MainMenu.Item>
          <MainMenu.Separator />
        </>
      )}
      <MainMenu.DefaultItems.ToggleTheme
        allowSystemTheme
        theme={props.theme}
        onSelect={props.setTheme}
      />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
      <MainMenu.ItemCustom>
        <div
          data-testid="change-language-label"
          style={{ fontSize: "0.85rem" }}
        >
          {t("labels.language")}
        </div>
        <LanguageList />
      </MainMenu.ItemCustom>
    </MainMenu>
  );
});
