import { INTERNAL_CONTEXT_MENU_KEY } from "../../../dataset/constant/ContextMenu";
import { ImageDisplay } from "../../../dataset/enum/Common";
import { ElementType } from "../../../dataset/enum/Element";
import type {
  IContextMenuContext,
  IRegisterContextMenu,
} from "../../../interface/contextmenu/ContextMenu";
import type { Command } from "../../command/Command";
const {
  IMAGE: {
    CHANGE,
    SAVE_AS,
    TEXT_WRAP,
    TEXT_WRAP_EMBED,
    TEXT_WRAP_UP_DOWN,
    TEXT_WRAP_SURROUND,
    TEXT_WRAP_FLOAT_TOP,
    TEXT_WRAP_FLOAT_BOTTOM,
    INSERT,
  },
} = INTERNAL_CONTEXT_MENU_KEY;

export const imageMenus: IRegisterContextMenu[] = [
  {
    key: INSERT,
    i18nPath: "contextmenu.image.insert",
    icon: "image",
    when: (payload) => {
      return !payload.isReadonly;
    },
    callback: (command: Command) => {
      // 创建代理元素
      const proxyInputFile = document.createElement("input");
      proxyInputFile.type = "file";
      proxyInputFile.accept = ".png, .jpg, .jpeg";
      // 监听上传
      proxyInputFile.onchange = () => {
        const file = proxyInputFile.files![0]!;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          // 计算宽高
          const image = new Image();
          const value = fileReader.result as string;
          image.src = value;
          image.onload = function () {
            command.executeImage({
              value,
              width: image.width,
              height: image.height,
            });
            // 移除
            proxyInputFile.remove();
          };
        };
      };
      proxyInputFile.click();
    },
  },
  {
    key: CHANGE,
    i18nPath: "contextmenu.image.change",
    icon: "image-change",
    when: (payload) => {
      return (
        !payload.isReadonly &&
        !payload.editorHasSelection &&
        payload.startElement?.type === ElementType.IMAGE
      );
    },
    callback: (command: Command) => {
      // 创建代理元素
      const proxyInputFile = document.createElement("input");
      proxyInputFile.type = "file";
      proxyInputFile.accept = ".png, .jpg, .jpeg";
      // 监听上传
      proxyInputFile.onchange = () => {
        const file = proxyInputFile.files![0]!;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const value = fileReader.result as string;
          command.executeReplaceImageElement(value);
        };
      };
      proxyInputFile.click();
    },
  },
  {
    key: SAVE_AS,
    i18nPath: "contextmenu.image.saveAs",
    icon: "image",
    when: (payload) => {
      return (
        !payload.editorHasSelection &&
        payload.startElement?.type === ElementType.IMAGE
      );
    },
    callback: (command: Command) => {
      command.executeSaveAsImageElement();
    },
  },
  {
    key: TEXT_WRAP,
    i18nPath: "contextmenu.image.textWrap",
    when: (payload) => {
      return (
        !payload.isReadonly &&
        !payload.editorHasSelection &&
        payload.startElement?.type === ElementType.IMAGE
      );
    },
    childMenus: [
      {
        key: TEXT_WRAP_EMBED,
        i18nPath: "contextmenu.image.textWrapType.embed",
        when: () => true,
        callback: (command: Command, context: IContextMenuContext) => {
          command.executeChangeImageDisplay(
            context.startElement!,
            ImageDisplay.BLOCK,
          );
        },
      },
      {
        key: TEXT_WRAP_UP_DOWN,
        i18nPath: "contextmenu.image.textWrapType.upDown",
        when: () => true,
        callback: (command: Command, context: IContextMenuContext) => {
          command.executeChangeImageDisplay(
            context.startElement!,
            ImageDisplay.INLINE,
          );
        },
      },
      {
        key: TEXT_WRAP_SURROUND,
        i18nPath: "contextmenu.image.textWrapType.surround",
        when: () => true,
        callback: (command: Command, context: IContextMenuContext) => {
          command.executeChangeImageDisplay(
            context.startElement!,
            ImageDisplay.SURROUND,
          );
        },
      },
      {
        key: TEXT_WRAP_FLOAT_TOP,
        i18nPath: "contextmenu.image.textWrapType.floatTop",
        when: () => true,
        callback: (command: Command, context: IContextMenuContext) => {
          command.executeChangeImageDisplay(
            context.startElement!,
            ImageDisplay.FLOAT_TOP,
          );
        },
      },
      {
        key: TEXT_WRAP_FLOAT_BOTTOM,
        i18nPath: "contextmenu.image.textWrapType.floatBottom",
        when: () => true,
        callback: (command: Command, context: IContextMenuContext) => {
          command.executeChangeImageDisplay(
            context.startElement!,
            ImageDisplay.FLOAT_BOTTOM,
          );
        },
      },
    ],
  },
];
