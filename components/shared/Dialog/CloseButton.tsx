import styles from "./close-button.module.scss";

interface Props {
  handleClose: () => void;
  className?: string;
  tooltip?: string;
  dark?: boolean;
}

function CloseButton({ handleClose, className, tooltip, dark }: Props) {
  function getClassName() {
    let btnClassName = styles["close--button"];
    btnClassName += className ? ` ${className}` : "";
    return btnClassName;
  }

  function getLineCN() {
    const lineCN = styles[`close--button--line`];
    return dark ? `${lineCN} ${styles.dark}` : lineCN;
  }

  return (
    <button
      onContextMenu={event => {
        event.preventDefault();
      }}
      className={getClassName()}
      onClick={handleClose}
      title={tooltip ?? "Close"}
    >
      <span className={getLineCN()}></span>
    </button>
  );
}
export default CloseButton;
