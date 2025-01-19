import type { IRegisterContextMenu } from "../../interface/contextmenu/ContextMenu";
import type { IRegisterShortcut } from "../../interface/shortcut/Shortcut";
import type { ContextMenu } from "../contextmenu/ContextMenu";
import type { Shortcut } from "../shortcut/Shortcut";
import type { I18n } from "../i18n/I18n";
import type { ILang } from "../../interface/i18n/I18n";
import type { DeepPartial } from "../../interface/Common";

interface IRegisterPayload {
  contextMenu: ContextMenu;
  shortcut: Shortcut;
  i18n: I18n;
}

export class Register {
  public contextMenuList: (payload: IRegisterContextMenu[]) => void;
  public getContextMenuList: () => IRegisterContextMenu[];
  public shortcutList: (payload: IRegisterShortcut[]) => void;
  public langMap: (locale: string, lang: DeepPartial<ILang>) => void;

  constructor(payload: IRegisterPayload) {
    const { contextMenu, shortcut, i18n } = payload;
    this.contextMenuList =
      contextMenu.registerContextMenuList.bind(contextMenu);
    this.getContextMenuList = contextMenu.getContextMenuList.bind(contextMenu);
    this.shortcutList = shortcut.registerShortcutList.bind(shortcut);
    this.langMap = i18n.registerLangMap.bind(i18n);
  }
}
