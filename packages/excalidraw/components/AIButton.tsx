import "./ToolIcon.scss";

import clsx from "clsx";
import { ToolButton } from "./ToolButton";
import { AIIcon } from "./icons";

type LockIconProps = {
  title?: string;
  name?: string;
  onClick?(): void;
  isMobile?: boolean;
};

export const AIButton = (props: LockIconProps) => {
  return (
    <ToolButton
      className={clsx("Shape", { fillable: false })}
      type="radio"
      icon={AIIcon}
      name="editor-current-shape"
      checked={false}
      title={`${props.title}`}
      aria-label={`${props.title}`}
      data-testid={`toolbar-richcontent`}
      onChange={() => props.onClick?.()}
    />
  );
};
