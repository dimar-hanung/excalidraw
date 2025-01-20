import "./ToolIcon.scss";

import clsx from "clsx";
import { ToolButton } from "./ToolButton";
import { RichContentIcon } from "./icons";

type LockIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
};

export const RichContentButton = (props: LockIconProps) => {
  return (
    <ToolButton
      className={clsx("Shape", { fillable: false })}
      type="radio"
      icon={RichContentIcon}
      name="editor-current-shape"
      checked={props.checked}
      title={`${props.title}`}
      aria-label={`${props.title}`}
      data-testid={`toolbar-richcontent`}
      onChange={() => props.onChange?.()}
    />
  );
};
