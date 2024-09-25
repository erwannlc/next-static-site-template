import { FC, ReactNode } from "react";
import Dialog from "./Dialog";

interface Props {
  isOpen: boolean;
  messages: {
    HEADER: string;
    BUTTONCONFIRM: string;
    BUTTONDISMISS: string;
  };
  className?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

/** unused */
const ConfirmModal: FC<Props> = ({ isOpen, messages, className, children, onClose, onConfirm }) => {
  let dialogClassName = "confirm";
  if (className) dialogClassName += ` ${className}`;

  return (
    <Dialog
      isOpen={isOpen}
      onRequestClose={onClose}
      closeOnOutsideClick={true}
      optClassName={dialogClassName}
    >
      <h4 className="header">{messages.HEADER}</h4>
      {children}
      <footer>
        <button className="dismiss" onClick={onClose}>
          {messages.BUTTONDISMISS}
        </button>
        <button className="confirm" onClick={onConfirm}>
          {messages.BUTTONCONFIRM}
        </button>
      </footer>
    </Dialog>
  );
};

export default ConfirmModal;
