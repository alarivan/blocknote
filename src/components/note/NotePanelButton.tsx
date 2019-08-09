import React from "react";

type NotePanelButtonProps = {
  label: string;
  className: string;
  onClick(): void;
};

const defaultClassNames = "flex-1 py-2 px-2 ";

const NotePanelButton = ({
  label,
  onClick,
  className
}: NotePanelButtonProps) => (
  <button
    data-cy="note-panel-button"
    className={defaultClassNames.concat(className)}
    onClick={() => onClick()}
  >
    {label}
  </button>
);

export default NotePanelButton;
