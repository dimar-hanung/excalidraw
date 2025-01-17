import { register } from "../actions/register";
import { updateActiveTool } from "../utils";
import { setCursorForShape } from "../cursor";
import { newTextElement } from "./newElement";
import { wrapText } from "./textWrapping";
import { StoreAction } from "../store";
import type { StaticCanvasAppState } from "../types";
import type { NonDeletedExcalidrawElement } from "../element/types";
import type { RoughCanvas } from "roughjs/bin/canvas";
import type { StaticCanvasRenderConfig } from "../scene/types";
import type { Drawable } from "roughjs/bin/core";
import { ShapeCache } from "../scene/ShapeCache";
import { sceneCoordsToViewportCoords } from '../utils';
import {
  findShapeByKey,
  getBoundTextShape,
  getCornerRadius,
  getElementShape,
  isPathALoop,
} from "../shapes";

type RichContentElement = {};

const richContentElementsCanvases = new Map<
  NonDeletedExcalidrawElement["id"],
  HTMLCanvasElement
>();

export function registerRichContentActions() {
}

export function drawRichContentOnCanvas(options: {
  element: NonDeletedExcalidrawElement;
  rc: RoughCanvas;
  context: CanvasRenderingContext2D;
  renderConfig: StaticCanvasRenderConfig;
  appState: StaticCanvasAppState;
}) {
  const { element, rc, context, renderConfig, appState } = options;

  // 绘制矩形作为边框
  const rectBorderFrame = ShapeCache.get(element)! as Drawable;
  rc.draw(rectBorderFrame);

  let canvas: HTMLCanvasElement = richContentElementsCanvases.get(element.id)!;

  // 创建一个 canvas 元素来绘制内容
  if (!canvas) {
    canvas = document.createElement("canvas");
    document.querySelector(".excalidraw-container")!.appendChild(canvas);
    canvas.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    richContentElementsCanvases.set(element.id, canvas);
  }

  const { width, height } = element;
  const { offsetLeft, offsetTop, zoom } = appState;
  const { x, y } = sceneCoordsToViewportCoords(
    { sceneX: element.x, sceneY: element.y },
    appState,
  );
  const left = x - offsetLeft;
  const top = y - offsetTop;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.transform = `translate(${left}px, ${top}px) scale(${zoom.value})`;
  canvas.style.transformOrigin = "0 0";
  canvas.style.borderRadius = `${getCornerRadius(
    Math.min(width, height),
    element,
  )}px`;

  let canvasContext = canvas.getContext("2d")!;


  // console.debug(rectBorderFrame, element, rc, context, renderConfig, appState);

  // // 在 canvas 上绘制一个有边框的矩形
  // canvasContext.strokeStyle = element.strokeColor;
  // canvasContext.lineWidth = 2;
  // canvasContext.strokeRect(0, 0, element.width, element.height);

  // // 将 canvas 绘制到主 canvas 上
  // context.drawImage(canvas, element.x, element.y);

  // HTML 部分暂时留空
  // TODO: 实现 HTML 部分

  // const richContentElement: RichContentElement = {};
  // richContentElementsCanvases.set(element.id, richContentElement);
}

function updateRichContentElement(
  richContentElement: RichContentElement,
  options: {
    rectBorderFrame: Drawable;
    element: NonDeletedExcalidrawElement;
    rc: RoughCanvas;
    context: CanvasRenderingContext2D;
    renderConfig: StaticCanvasRenderConfig;
    appState: StaticCanvasAppState;
  },
) {
  const { rectBorderFrame, element, rc, context, renderConfig, appState } = options;
  console.debug('update:', richContentElement, rectBorderFrame, element, rc, context, renderConfig, appState)
}