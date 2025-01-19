import "@simonwep/pickr/dist/themes/nano.min.css";
import Pickr from "@simonwep/pickr";
import type Editor from "../editor";
import "./style/index.scss";
import { ToolbarType } from "./enum";
import type { IToolbarRegister } from "./interface";
import { PLUGIN_PREFIX } from "./constant";
import { FONT_FAMILY } from "../../../constants";
import { getFontFamilyString } from "../../../utils";
import { RowFlex } from "../editor";

function createPickerToolbar(
  container: HTMLDivElement,
  root: HTMLDivElement,
  toolbarType: ToolbarType,
  changed: (color: string) => void,
) {
  const toolbarItem = document.createElement("div");
  toolbarItem.classList.add(`${PLUGIN_PREFIX}-picker`);
  toolbarItem.classList.add(`${PLUGIN_PREFIX}-${toolbarType}`);
  // 颜色选择容器
  const pickerContainer = document.createElement("div");
  pickerContainer.classList.add(`${PLUGIN_PREFIX}-picker-container`);
  const pickerDom = document.createElement("div");
  pickerContainer.append(pickerDom);
  toolbarItem.append(pickerContainer);
  container.append(toolbarItem);
  // 实例化颜色选择器
  const currentColor = "#000000";
  const pickr = new Pickr({
    el: pickerDom,
    theme: "nano",
    useAsButton: true,
    inline: true,
    default: currentColor,
    i18n: {
      "btn:save": "✓",
    },
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        input: true,
        save: false,
      },
    },
  });
  const icon = document.createElement("i");
  toolbarItem.append(icon);
  const colorBar = document.createElement("span");
  colorBar.style.backgroundColor = currentColor;

  toolbarItem.append(colorBar);
  toolbarItem.onclick = (evt) => {
    const target = evt.target as HTMLElement;
    if (pickerContainer !== target && !pickerContainer.contains(target)) {
      pickr.show();

      // 定位
      const rootRect = root.getBoundingClientRect();
      const colorPicker = pickerContainer.querySelector(
        ".pcr-app",
      )! as HTMLDivElement;
      const pickerRect = colorPicker.getBoundingClientRect();
      const toolbarRect = container.getBoundingClientRect();
      const toolItemRect = pickerContainer.getBoundingClientRect();

      let left = 0;
      let top = toolbarRect.bottom - toolItemRect.top;

      if (toolItemRect.left + pickerRect.width > rootRect.right) {
        left = rootRect.right - (toolItemRect.left + pickerRect.width);
      }

      if (toolItemRect.top + pickerRect.height > rootRect.bottom) {
        top = toolbarRect.top - (toolItemRect.top + pickerRect.height);
      }

      colorPicker.style.left = `${left}px`;
      colorPicker.style.top = `${top}px`;
    }
  };
  pickr.on("change", (cb: any) => {
    const color = cb.toHEXA().toString();
    colorBar.style.backgroundColor = color;
    changed(color);
  });
}

function createFontToolbar(
  toolbarType: ToolbarType,
  container: HTMLDivElement,
  root: HTMLDivElement,
  callback: (font: string) => void,
) {
  const toolbarItem = document.createElement("div");
  toolbarItem.classList.add(`${PLUGIN_PREFIX}-font`);
  toolbarItem.classList.add(`${PLUGIN_PREFIX}-${toolbarType}`);

  const icon = document.createElement("i");
  toolbarItem.append(icon);

  container.append(toolbarItem);

  const fonts = Object.keys(FONT_FAMILY);
  const listContainer = document.createElement("div");
  listContainer.classList.add(`${PLUGIN_PREFIX}-font-list-container`);
  const list = document.createElement("ul");
  list.classList.add(`${PLUGIN_PREFIX}-font-list`);
  listContainer.appendChild(list);
  fonts.forEach((font) => {
    const fontItem = document.createElement("li");
    fontItem.classList.add(`${PLUGIN_PREFIX}-font-list-item`);
    fontItem.innerText = font;
    fontItem.onclick = () => {
      // @ts-ignore
      const fontValue: number = FONT_FAMILY[font];
      const fontString = getFontFamilyString({
        fontFamily: fontValue,
      });
      callback(fontString);
    };
    list.append(fontItem);
  });
  toolbarItem.append(listContainer);

  toolbarItem.onclick = () => {
    listContainer.classList.toggle(
      `${PLUGIN_PREFIX}-font-list-container--visible`,
    );

    // TODO 定位
    // const rootRect = root.getBoundingClientRect();
    // listContainer.style.left = `${rootRect.left}px`;
    // listContainer.style.top = `${rootRect.top}px`;
  };
}

// 工具栏列表
const toolbarRegisterList: IToolbarRegister[] = [
  {
    render(container, editor) {
      const root = editor.command.getContainer();
      createFontToolbar(
        ToolbarType.FONT_CHANGE,
        container,
        root,
        (font: string) => {
          editor.command.executeFont(font);
        },
      );
    },
  },
  {
    isDivider: true,
  },
  {
    key: ToolbarType.ALIGN_AUTO,
    callback(editor) {
      editor.command.executeRowFlex(RowFlex.ALIGNMENT);
    },
  },
  {
    key: ToolbarType.ALIGN_LEFT,
    callback(editor) {
      editor.command.executeRowFlex(RowFlex.LEFT);
    },
  },
  {
    key: ToolbarType.ALIGN_RIGHT,
    callback(editor) {
      editor.command.executeRowFlex(RowFlex.RIGHT);
    },
  },
  {
    key: ToolbarType.ALIGN_CENTER,
    callback(editor) {
      editor.command.executeRowFlex(RowFlex.CENTER);
    },
  },
  {
    key: ToolbarType.ALIGN_JUSTIFY,
    callback(editor) {
      editor.command.executeRowFlex(RowFlex.JUSTIFY);
    },
  },
  {
    isDivider: true,
  },
  {
    key: ToolbarType.SIZE_ADD,
    callback(editor) {
      editor.command.executeSizeAdd();
    },
  },
  {
    key: ToolbarType.SIZE_MINUS,
    callback(editor) {
      editor.command.executeSizeMinus();
    },
  },
  {
    isDivider: true,
  },
  {
    key: ToolbarType.BOLD,
    callback(editor) {
      editor.command.executeBold();
    },
  },
  {
    key: ToolbarType.ITALIC,
    callback(editor) {
      editor.command.executeItalic();
    },
  },
  {
    key: ToolbarType.UNDERLINE,
    callback(editor) {
      editor.command.executeUnderline();
    },
  },
  {
    key: ToolbarType.STRIKEOUT,
    callback(editor) {
      editor.command.executeStrikeout();
    },
  },
  {
    isDivider: true,
  },
  {
    render(container, editor) {
      const root = editor.command.getContainer();
      createPickerToolbar(container, root, ToolbarType.COLOR, (color) => {
        editor.command.executeColor(color);
      });
    },
  },
  {
    render(container, editor) {
      const root = editor.command.getContainer();
      createPickerToolbar(container, root, ToolbarType.HIGHLIGHT, (color) => {
        editor.command.executeHighlight(color);
      });
    },
  },
  {
    isDivider: true,
  },
  {
    key: ToolbarType.CLEAN,
    callback(editor) {
      editor.command.executeFormat();
    },
  },
];

function createToolbar(editor: Editor): HTMLDivElement {
  const toolbarContainer = document.createElement("div");
  toolbarContainer.classList.add(`${PLUGIN_PREFIX}-floating-toolbar`);
  for (const toolbar of toolbarRegisterList) {
    if (toolbar.render) {
      toolbar.render(toolbarContainer, editor);
    } else if (toolbar.isDivider) {
      const divider = document.createElement("div");
      divider.classList.add(`${PLUGIN_PREFIX}-divider`);
      toolbarContainer.append(divider);
    } else {
      const { key, callback } = toolbar;
      const toolbarItem = document.createElement("div");
      toolbarItem.classList.add(`${PLUGIN_PREFIX}-${key}`);
      const icon = document.createElement("i");
      toolbarItem.append(icon);
      toolbarItem.onclick = () => {
        callback?.(editor);
      };
      toolbarContainer.append(toolbarItem);
    }
  }
  return toolbarContainer;
}

function toggleToolbarVisible(toolbar: HTMLDivElement, visible: boolean) {
  visible ? toolbar.classList.remove("hide") : toolbar.classList.add("hide");
}

function toggleToolbarItemActive(toolbarItem: HTMLDivElement, active: boolean) {
  active
    ? toolbarItem.classList.add("active")
    : toolbarItem.classList.remove("active");
}

export default function floatingToolbarPlugin(editor: Editor) {
  // 创建工具栏
  const toolbarContainer = createToolbar(editor);
  const editorContainer = editor.command.getContainer();
  editorContainer.append(toolbarContainer);
  toolbarContainer.classList.add("hide");

  // 监听选区样式变化
  editor.eventBus.on("rangeStyleChange", (rangeStyle) => {
    if (rangeStyle.type === null) {
      toggleToolbarVisible(toolbarContainer, false);
      return;
    }

    const context = editor.command.getRangeContext();
    if (!context || context.isCollapsed || !context.rangeRects[0]) {
      toggleToolbarVisible(toolbarContainer, false);
      return;
    }

    // 样式回显
    const boldDom = toolbarContainer.querySelector<HTMLDivElement>(
      `.${PLUGIN_PREFIX}-bold`,
    );
    if (boldDom) {
      toggleToolbarItemActive(boldDom, rangeStyle.bold);
    }
    const italicDom = toolbarContainer.querySelector<HTMLDivElement>(
      `.${PLUGIN_PREFIX}-italic`,
    );
    if (italicDom) {
      toggleToolbarItemActive(italicDom, rangeStyle.italic);
    }
    const underlineDom = toolbarContainer.querySelector<HTMLDivElement>(
      `.${PLUGIN_PREFIX}-underline`,
    );
    if (underlineDom) {
      toggleToolbarItemActive(underlineDom, rangeStyle.underline);
    }
    const strikeoutDom = toolbarContainer.querySelector<HTMLDivElement>(
      `.${PLUGIN_PREFIX}-strikeout`,
    );
    if (strikeoutDom) {
      toggleToolbarItemActive(strikeoutDom, rangeStyle.strikeout);
    }

    toggleToolbarVisible(toolbarContainer, true);
    adjustPosition();
  });

  // 定位
  function adjustPosition() {
    const context = editor.command.getRangeContext()!;
    const position = context.rangeRects[0];

    let left = position.x;
    let top = position.y + position.height;

    const width = toolbarContainer.offsetWidth;
    const height = toolbarContainer.offsetHeight;

    const editorRect = editorContainer.getBoundingClientRect();
    // 边界检测
    if (left + width > editorRect.width) {
      left = editorRect.width - width;
    }
    if (top + height > editorRect.height) {
      top = position.y - height;
    }

    toolbarContainer.style.left = `${left}px`;
    toolbarContainer.style.top = `${top}px`;
  }
}
