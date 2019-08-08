import React from "react";

type NotePanelButtonProps = {
  label: string;
  onClick(): void;
};

const NotePanelButton = ({ label, onClick }: NotePanelButtonProps) => (
  <button
    data-cy="note-panel-button"
    className="flex-1 bg-gray-300 hover:bg-gray-500 py-2 px-2"
    onClick={() => onClick()}
  >
    {label}
  </button>
);

export default NotePanelButton;
