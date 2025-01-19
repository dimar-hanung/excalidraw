import type { IElement, LocationPosition } from "..";
import type {
  EditorMode,
  PageMode,
  PaperDirection,
  RenderMode,
  WordBreak,
} from "../dataset/enum/Editor";
import type { IBackgroundOption } from "./Background";
import type { ICheckboxOption } from "./Checkbox";
import type { IRadioOption } from "./Radio";
import type { IControlOption } from "./Control";
import type { ICursorOption } from "./Cursor";
import type { IFooter } from "./Footer";
import type { IGroup } from "./Group";
import type { IHeader } from "./Header";
import type { ILineBreakOption } from "./LineBreak";
import type { IMargin } from "./Margin";
import type { IPageBreak } from "./PageBreak";
import type { IPageNumber } from "./PageNumber";
import type { IPlaceholder } from "./Placeholder";
import type { ITitleOption } from "./Title";
import type { IWatermark } from "./Watermark";
import type { IZoneOption } from "./Zone";
import type { ISeparatorOption } from "./Separator";
import type { ITableOption } from "./table/Table";
import type { ILineNumberOption } from "./LineNumber";
import type { IPageBorderOption } from "./PageBorder";
import type { IBadgeOption } from "./Badge";

export interface IEditorData {
  header?: IElement[];
  main: IElement[];
  footer?: IElement[];
}

export interface IEditorOption {
  mode?: EditorMode;
  defaultType?: string;
  defaultColor?: string;
  defaultFont?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  defaultBasicRowMarginHeight?: number;
  defaultRowMargin?: number;
  defaultTabWidth?: number;
  width?: number;
  height?: number;
  scale?: number;
  pageGap?: number;
  underlineColor?: string;
  strikeoutColor?: string;
  rangeColor?: string;
  rangeAlpha?: number;
  rangeMinWidth?: number;
  searchMatchColor?: string;
  searchNavigateMatchColor?: string;
  searchMatchAlpha?: number;
  highlightAlpha?: number;
  resizerColor?: string;
  resizerSize?: number;
  marginIndicatorSize?: number;
  marginIndicatorColor?: string;
  margins?: IMargin;
  pageMode?: PageMode;
  renderMode?: RenderMode;
  defaultHyperlinkColor?: string;
  paperDirection?: PaperDirection;
  inactiveAlpha?: number;
  historyMaxRecordCount?: number;
  printPixelRatio?: number;
  maskMargin?: IMargin;
  letterClass?: string[];
  contextMenuDisableKeys?: string[];
  contextMenuKeys?: string[];
  scrollContainerSelector?: string;
  wordBreak?: WordBreak;
  table?: ITableOption;
  header?: IHeader;
  footer?: IFooter;
  pageNumber?: IPageNumber;
  watermark?: IWatermark;
  control?: IControlOption;
  checkbox?: ICheckboxOption;
  radio?: IRadioOption;
  cursor?: ICursorOption;
  title?: ITitleOption;
  placeholder?: IPlaceholder;
  group?: IGroup;
  pageBreak?: IPageBreak;
  zone?: IZoneOption;
  background?: IBackgroundOption;
  lineBreak?: ILineBreakOption;
  separator?: ISeparatorOption;
  lineNumber?: ILineNumberOption;
  pageBorder?: IPageBorderOption;
  badge?: IBadgeOption;
}

export interface IEditorResult {
  version: string;
  data: IEditorData;
  options: IEditorOption;
}

export interface IEditorHTML {
  header: string;
  main: string;
  footer: string;
}

export type IEditorText = IEditorHTML;

export type IUpdateOption = Omit<
  IEditorOption,
  | "mode"
  | "width"
  | "height"
  | "scale"
  | "pageGap"
  | "pageMode"
  | "paperDirection"
  | "historyMaxRecordCount"
  | "scrollContainerSelector"
>;

export interface ISetValueOption {
  isSetCursor?: boolean;
}

export interface IFocusOption {
  position?: LocationPosition;
}
