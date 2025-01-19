import { Editor, PageMode, RenderMode } from "./editor";
import floatingToolbarPlugin from "./floatingToolbar";
import type { PropsWithoutRef } from "react";
import { useEffect, useRef } from "react";
import { THEME } from "../../constants";
import { useI18n } from "../../i18n";
import type { Theme } from "../../element/types";
import "./RichContentEditor.scss";
import { FONT_FAMILY } from "../../constants";
import { getFontFamilyString } from "../../utils";
import type { ExcalidrawRichContentElement } from "../../element/types";
import { Fonts } from "../../fonts";

export function RichContentEditor(
  props: PropsWithoutRef<{
    element: ExcalidrawRichContentElement;
    theme: Theme;
    offset: { left: number; top: number };
    size: { width: number; height: number; scale: number };
    onChange: (element: ExcalidrawRichContentElement, content: any) => void;
    onAdjustSize: (
      element: ExcalidrawRichContentElement,
      newSize: { width: number; height: number },
    ) => void;
  }>,
) {
  const container = useRef<HTMLDivElement>(null);
  const editor = useRef<Editor>();
  const { langCode } = useI18n();
  const { theme, onChange, onAdjustSize, element, size } = props;

  useEffect(() => {
    // @ts-ignore
    const data: any = element.data || [];

    editor.current = new Editor(container.current!, data, {
      defaultFont: getFontFamilyString({ fontFamily: FONT_FAMILY.Excalifont }),
      cursor: {
        color: theme === THEME.DARK ? "#fff" : "#000",
      },
      marginIndicatorSize: 0,
      marginIndicatorColor: "transparent",
      margins: [0, 24, 0, 24],
      pageMode: PageMode.CONTINUITY,
      pageGap: 0,
      pageBorder: {
        color: "transparent",
        lineWidth: 0,
      },
      background: { color: "transparent" },
      defaultSize: 18,
      defaultBasicRowMarginHeight: 8,
      defaultTabWidth: 32,
      scrollContainerSelector: container.current?.id,
      zone: { tipDisabled: true },
      contextMenuKeys: [
        "imageInsert",
        "imageChange",
        "imageSaveAs",
        // "divider",
        // 目前无法做到调整边框，先不支持
        // "globalAutoAdjustSize",
      ],
      renderMode: RenderMode.SPEED,
    });

    editor.current.use(floatingToolbarPlugin);

    // TODO https://hufe.club/canvas-editor-docs/guide/i18n.html
    editor.current.register.langMap(langCode, {});
    editor.current.command.executeSetLocale(langCode);

    // container.current?.querySelector('canvas')
    //   ?.addEventListener('scroll', (e) => {
    //     e.stopPropagation();
    //     e.stopImmediatePropagation();
    //     e.preventDefault();
    //     console.debug("scroll:", e);
    //   }, { capture: true, passive: true });

    return () => {
      editor.current?.destroy();
      editor.current = undefined;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    editor.current?.command.executePageScale(size.scale);
    editor.current?.command.executePaperSize(size.width, size.height);
  }, [size.width, size.height, size.scale]);

  useEffect(() => {
    const onContentChange = () => {
      const { data } = editor.current?.command.getValue()!;
      onChange(element, data);
    };
    editor.current?.eventBus.on("contentChange", onContentChange);

    return () => {
      editor.current?.eventBus.off("contentChange", onContentChange);
    };
  }, [onChange, element]);

  useEffect(() => {
    const notify = (evt: CustomEvent) => {
      const { detail } = evt;
      const { width, height } = detail;
      onAdjustSize(element, { width, height });
    };

    const box = container.current!;
    if (!box) {
      return;
    }

    // @ts-ignore
    box.addEventListener("adjust-size", notify);
    return () => {
      // @ts-ignore
      box.removeEventListener("adjust-size", notify);
    };
  }, [onAdjustSize, element]);

  useEffect(() => {
    editor.current?.command.setCursorColor(
      theme === THEME.DARK ? "#fff" : "#000",
    );
  }, [theme]);

  useEffect(() => {
    editor.current?.command.executeSetLocale(langCode);
  }, [langCode]);

  useEffect(() => {
    Fonts.loadAllFonts().finally(() => {
      setTimeout(() => {
        editor.current?.command.executeForceUpdate({ isSubmitHistory: false });
      }, 100);
    });
  }, []);

  return (
    <div
      className="rich-content-editor"
      id={`rich-content-editor-${element.id}`}
      data-element-id={element.id}
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      ref={container}
    ></div>
  );
}
