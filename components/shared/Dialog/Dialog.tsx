"use client";
import type { MouseEvent, TouchEvent } from "react";
import { useRef, useEffect } from "react";

import styles from "./dialog.module.scss";
import CloseButton from "./CloseButton";

type DialogType = "warning" | "success" | "error" | "info";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  closeOnOutsideClick?: boolean;
  optClassName?: string;
  darkButton?: boolean;
  closeBtnClasssName?: string;
  type?: DialogType;
}

function Dialog({
  children,
  isOpen,
  onRequestClose,
  closeOnOutsideClick,
  optClassName,
  darkButton,
  closeBtnClasssName,
  type,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function getClassName(type?: DialogType) {
    let classN = styles.modal;
    classN += type ? ` ${styles.type}` : "";
    classN += optClassName ? ` ${optClassName}` : "";
    return classN;
  }

  function getCloseBtnClassName() {
    let classN = styles["close-modal"];
    classN += closeBtnClasssName ? ` ${closeBtnClasssName}` : "";
    return classN;
  }

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        dialogNode.showModal();
      } else {
        dialogNode.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.height = "100%";
      document.body.style.overflowY = "hidden";
    }
    if (!isOpen) {
      document.body.style.height = "unset";
      document.body.style.overflowY = "unset";
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onRequestClose();
  };

  function handleOutsideClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (closeOnOutsideClick && event.target === dialogRef.current) {
      onRequestClose();
    }
  }

  const dialogClassName = getClassName(type);

  return (
    <dialog
      ref={dialogRef}
      className={dialogClassName}
      onClick={handleOutsideClick}
      onCancel={(e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
        handleCancel(e);
      }}
    >
      {children}
      <CloseButton
        handleClose={onRequestClose}
        className={getCloseBtnClassName()}
        dark={darkButton}
      />
    </dialog>
  );
}

export default Dialog;
