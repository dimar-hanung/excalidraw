import Editor from "@hufe921/canvas-editor";
import docxPlugin from "@hufe921/canvas-editor-plugin-docx";
import floatingToolbarPlugin from "@hufe921/canvas-editor-plugin-floating-toolbar";
import type { PropsWithoutRef } from "react";
import { useEffect, useRef } from "react";
import { THEME } from "../../constants";
import { useI18n } from "../../i18n";
import "./RichContentEditor.scss";
import { init } from "./init";

export function RichContentEditor(props: PropsWithoutRef<any>) {
  const container = useRef<HTMLDivElement>(null);
  const editor = useRef<Editor>();
  const { langCode } = useI18n();

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const { theme, scale, config = {} } = props;
    const isDarkTheme = theme === THEME.DARK;
    editor.current = new Editor(
      container.current!,
      [
        {
          value: "hello world!",
        },
      ],
      {
        cursor: {
          color: isDarkTheme ? "#fff" : "#000",
        },
        scale,
        ...config,
      },
    );

    editor.current.use(docxPlugin);
    editor.current.use(floatingToolbarPlugin);

    // https://hufe.club/canvas-editor-docs/guide/i18n.html
    editor.current.register.langMap(langCode, {});
    editor.current.command.executeSetLocale(langCode);

    init(editor.current, container.current, {
      commentList: [],
      userName: "testUser",
    });

    return () => {
      editor.current?.destroy();
    };
  });

  useEffect(() => {
    const destroy = (evt: any) => {
      const visibleDom = document.querySelector(".visible");
      if (!visibleDom || visibleDom.contains(evt.target)) {
        return;
      }
      visibleDom.classList.remove("visible");
    };

    // 菜单弹窗销毁
    window.addEventListener("click", destroy, {
      capture: true,
    });

    return () => {
      window.removeEventListener("click", destroy);
    };
  });

  useEffect(() => {
    editor.current?.command.executeSetLocale(langCode);
  }, [langCode]);

  return (
    <div className="rich-content-editor" ref={container}>
      <div className="menu" editor-component="menu">
        <div className="menu-item">
          <div className="menu-item__undo">
            <i></i>
          </div>
          <div className="menu-item__redo">
            <i></i>
          </div>
          <div className="menu-item__painter" title="格式刷(双击可连续使用)">
            <i></i>
          </div>
          <div className="menu-item__format" title="清除格式">
            <i></i>
          </div>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-item">
          <div className="menu-item__font">
            <span className="select" title="字体">
              微软雅黑
            </span>
            <div className="options">
              <ul>
                <li
                  data-family="Microsoft YaHei"
                  style={{ fontFamily: "Microsoft YaHei" }}
                >
                  微软雅黑
                </li>
                <li data-family="华文宋体" style={{ fontFamily: "华文宋体" }}>
                  华文宋体
                </li>
                <li data-family="华文黑体" style={{ fontFamily: "华文黑体" }}>
                  华文黑体
                </li>
                <li data-family="华文仿宋" style={{ fontFamily: "华文仿宋" }}>
                  华文仿宋
                </li>
                <li data-family="华文楷体" style={{ fontFamily: "华文楷体" }}>
                  华文楷体
                </li>
                <li data-family="华文琥珀" style={{ fontFamily: "华文琥珀" }}>
                  华文琥珀
                </li>
                <li data-family="华文楷体" style={{ fontFamily: "华文楷体" }}>
                  华文楷体
                </li>
                <li data-family="华文隶书" style={{ fontFamily: "华文隶书" }}>
                  华文隶书
                </li>
                <li data-family="华文新魏" style={{ fontFamily: "华文新魏" }}>
                  华文新魏
                </li>
                <li data-family="华文行楷" style={{ fontFamily: "华文行楷" }}>
                  华文行楷
                </li>
                <li data-family="华文中宋" style={{ fontFamily: "华文中宋" }}>
                  华文中宋
                </li>
                <li data-family="华文彩云" style={{ fontFamily: "华文彩云" }}>
                  华文彩云
                </li>
                <li data-family="Arial" style={{ fontFamily: "Arial" }}>
                  Arial
                </li>
                <li data-family="Segoe UI" style={{ fontFamily: "Segoe UI" }}>
                  Segoe UI
                </li>
                <li data-family="Ink Free" style={{ fontFamily: "Ink Free" }}>
                  Ink Free
                </li>
                <li data-family="Fantasy" style={{ fontFamily: "Fantasy" }}>
                  Fantasy
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-item__size">
            <span className="select" title="字体">
              小四
            </span>
            <div className="options">
              <ul>
                <li data-size="56" style={{ fontSize: "56px" }}>
                  初号
                </li>
                <li data-size="48" style={{ fontSize: "48px" }}>
                  小初
                </li>
                <li data-size="34" style={{ fontSize: "34px" }}>
                  一号
                </li>
                <li data-size="32" style={{ fontSize: "32px" }}>
                  小一
                </li>
                <li data-size="29" style={{ fontSize: "29px" }}>
                  二号
                </li>
                <li data-size="24" style={{ fontSize: "24px" }}>
                  小二
                </li>
                <li data-size="21" style={{ fontSize: "21px" }}>
                  三号
                </li>
                <li data-size="20" style={{ fontSize: "20px" }}>
                  小三
                </li>
                <li data-size="18" style={{ fontSize: "18px" }}>
                  四号
                </li>
                <li data-size="16" style={{ fontSize: "16px" }}>
                  小四
                </li>
                <li data-size="14" style={{ fontSize: "14px" }}>
                  五号
                </li>
                <li data-size="12" style={{ fontSize: "12px" }}>
                  小五
                </li>
                <li data-size="10" style={{ fontSize: "10px" }}>
                  六号
                </li>
                <li data-size="8" style={{ fontSize: "8px" }}>
                  小六
                </li>
                <li data-size="7" style={{ fontSize: "7px" }}>
                  七号
                </li>
                <li data-size="6" style={{ fontSize: "6px" }}>
                  八号
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-item__size-add">
            <i></i>
          </div>
          <div className="menu-item__size-minus">
            <i></i>
          </div>
          <div className="menu-item__bold">
            <i></i>
          </div>
          <div className="menu-item__italic">
            <i></i>
          </div>
          <div className="menu-item__underline">
            <i></i>
            <span className="select"></span>
            <div className="options">
              <ul>
                <li data-decoration-style="solid">
                  <i></i>
                </li>
                <li data-decoration-style="double">
                  <i></i>
                </li>
                <li data-decoration-style="dashed">
                  <i></i>
                </li>
                <li data-decoration-style="dotted">
                  <i></i>
                </li>
                <li data-decoration-style="wavy">
                  <i></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-item__strikeout" title="删除线(Ctrl+Shift+X)">
            <i></i>
          </div>
          <div className="menu-item__superscript">
            <i></i>
          </div>
          <div className="menu-item__subscript">
            <i></i>
          </div>
          <div className="menu-item__color" title="字体颜色">
            <i></i>
            <span></span>
            <input type="color" id="color" />
          </div>
          <div className="menu-item__highlight" title="高亮">
            <i></i>
            <span></span>
            <input type="color" id="highlight" />
          </div>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-item">
          <div className="menu-item__title">
            <span className="select" title="切换标题">
              正文
            </span>
            <div className="options">
              <ul>
                <li style={{ fontSize: "16px" }}>正文</li>
                <li data-level="first" style={{ fontSize: "26px" }}>
                  标题1
                </li>
                <li data-level="second" style={{ fontSize: "24px" }}>
                  标题2
                </li>
                <li data-level="third" style={{ fontSize: "22px" }}>
                  标题3
                </li>
                <li data-level="fourth" style={{ fontSize: "20px" }}>
                  标题4
                </li>
                <li data-level="fifth" style={{ fontSize: "18px" }}>
                  标题5
                </li>
                <li data-level="sixth" style={{ fontSize: "16px" }}>
                  标题6
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-item__left">
            <i></i>
          </div>
          <div className="menu-item__center">
            <i></i>
          </div>
          <div className="menu-item__right">
            <i></i>
          </div>
          <div className="menu-item__alignment">
            <i></i>
          </div>
          <div className="menu-item__justify">
            <i></i>
          </div>
          <div className="menu-item__row-margin">
            <i title="行间距"></i>
            <div className="options">
              <ul>
                <li data-rowmargin="1">1</li>
                <li data-rowmargin="1.25">1.25</li>
                <li data-rowmargin="1.5">1.5</li>
                <li data-rowmargin="1.75">1.75</li>
                <li data-rowmargin="2">2</li>
                <li data-rowmargin="2.5">2.5</li>
                <li data-rowmargin="3">3</li>
              </ul>
            </div>
          </div>
          <div className="menu-item__list">
            <i></i>
            <div className="options">
              <ul>
                <li>
                  <label>取消列表</label>
                </li>
                <li data-list-type="ol" data-list-style="decimal">
                  <label>有序列表：</label>
                  <ol>
                    <li>________</li>
                  </ol>
                </li>
                <li data-list-type="ul" data-list-style="checkbox">
                  <label>复选框列表：</label>
                  <ul style={{ listStyleType: "checkbox" }}>
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="disc">
                  <label>实心圆点列表：</label>
                  <ul style={{ listStyleType: "disc" }}>
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="circle">
                  <label>空心圆点列表：</label>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="square">
                  <label>空心方块列表：</label>
                  <ul style={{ listStyleType: "square" }}>
                    <li>________</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-item">
          <div className="menu-item__table">
            <i title="表格"></i>
          </div>
          <div className="menu-item__table__collapse">
            <div className="table-close">×</div>
            <div className="table-title">
              <span className="table-select">插入</span>
              <span>表格</span>
            </div>
            <div className="table-panel"></div>
          </div>
          <div className="menu-item__image">
            <i title="图片"></i>
            <input
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg, .svg, .gif"
            />
          </div>
          <div className="menu-item__hyperlink">
            <i title="超链接"></i>
          </div>
          <div className="menu-item__separator">
            <i title="分割线"></i>
            <div className="options">
              <ul>
                <li data-separator="0,0">
                  <i></i>
                </li>
                <li data-separator="1,1">
                  <i></i>
                </li>
                <li data-separator="3,1">
                  <i></i>
                </li>
                <li data-separator="4,4">
                  <i></i>
                </li>
                <li data-separator="7,3,3,3">
                  <i></i>
                </li>
                <li data-separator="6,2,2,2,2,2">
                  <i></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-item__watermark">
            <i title="水印(添加、删除)"></i>
            <div className="options">
              <ul>
                <li data-menu="add">添加水印</li>
                <li data-menu="delete">删除水印</li>
              </ul>
            </div>
          </div>
          <div className="menu-item__codeblock" title="代码块">
            <i></i>
          </div>
          <div className="menu-item__page-break" title="分页符">
            <i></i>
          </div>
          <div className="menu-item__control">
            <i title="控件"></i>
            <div className="options">
              <ul>
                <li data-control="text">文本</li>
                <li data-control="number">数值</li>
                <li data-control="select">列举</li>
                <li data-control="date">日期</li>
                <li data-control="checkbox">复选框</li>
                <li data-control="radio">单选框</li>
              </ul>
            </div>
          </div>
          <div className="menu-item__checkbox" title="复选框">
            <i></i>
          </div>
          <div className="menu-item__radio" title="单选框">
            <i></i>
          </div>
          <div className="menu-item__latex" title="LateX">
            <i></i>
          </div>
          <div className="menu-item__date">
            <i title="日期"></i>
            <div className="options">
              <ul>
                <li data-format="yyyy-MM-dd"></li>
                <li data-format="yyyy-MM-dd hh:mm:ss"></li>
              </ul>
            </div>
          </div>
          <div className="menu-item__block" title="内容块">
            <i></i>
          </div>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-item">
          <div className="menu-item__search" data-menu="search">
            <i></i>
          </div>
          <div className="menu-item__search__collapse" data-menu="search">
            <div className="menu-item__search__collapse__search">
              <input type="text" />
              <label className="search-result"></label>
              <div className="arrow-left">
                <i></i>
              </div>
              <div className="arrow-right">
                <i></i>
              </div>
              <span>×</span>
            </div>
            <div className="menu-item__search__collapse__replace">
              <input type="text" />
              <button>替换</button>
            </div>
          </div>
          <div className="menu-item__print" data-menu="print">
            <i></i>
          </div>
        </div>
      </div>
      <div className="catalog" editor-component="catalog">
        <div className="catalog__header">
          <span>目录</span>
          <div className="catalog__header__close">
            <i></i>
          </div>
        </div>
        <div className="catalog__main"></div>
      </div>
      <div className="editor"></div>
      <div className="comment" editor-component="comment"></div>
      <div className="footer" editor-component="footer">
        <div>
          <div className="catalog-mode" title="目录">
            <i></i>
          </div>
          <div className="page-mode">
            <i title="页面模式(分页、连页)"></i>
            <div className="options">
              <ul>
                <li data-page-mode="paging" className="active">
                  分页
                </li>
                <li data-page-mode="continuity">连页</li>
              </ul>
            </div>
          </div>
          <span>
            可见页码：<span className="page-no-list">1</span>
          </span>
          <span>
            页面：<span className="page-no">1</span>/
            <span className="page-size">1</span>
          </span>
          <span>
            字数：<span className="word-count">0</span>
          </span>
        </div>
        <div
          className="editor-mode"
          title="编辑模式(编辑、清洁、只读、表单、设计)"
        >
          编辑模式
        </div>
        <div>
          <div className="page-scale-minus" title="缩小(Ctrl+-)">
            <i></i>
          </div>
          <span
            className="page-scale-percentage"
            title="显示比例(点击可复原Ctrl+0)"
          >
            100%
          </span>
          <div className="page-scale-add" title="放大(Ctrl+=)">
            <i></i>
          </div>
          <div className="paper-size">
            <i title="纸张类型"></i>
            <div className="options">
              <ul>
                <li data-paper-size="794*1123" className="active">
                  A4
                </li>
                <li data-paper-size="1593*2251">A2</li>
                <li data-paper-size="1125*1593">A3</li>
                <li data-paper-size="565*796">A5</li>
                <li data-paper-size="412*488">5号信封</li>
                <li data-paper-size="450*866">6号信封</li>
                <li data-paper-size="609*862">7号信封</li>
                <li data-paper-size="862*1221">9号信封</li>
                <li data-paper-size="813*1266">法律用纸</li>
                <li data-paper-size="813*1054">信纸</li>
              </ul>
            </div>
          </div>
          <div className="paper-direction">
            <i title="纸张方向"></i>
            <div className="options">
              <ul>
                <li data-paper-direction="vertical" className="active">
                  纵向
                </li>
                <li data-paper-direction="horizontal">横向</li>
              </ul>
            </div>
          </div>
          <div className="paper-margin" title="页边距">
            <i></i>
          </div>
          <div className="fullscreen" title="全屏显示">
            <i></i>
          </div>
          <div className="editor-option" title="编辑器设置">
            <i></i>
          </div>
        </div>
      </div>
    </div>
  );
}
