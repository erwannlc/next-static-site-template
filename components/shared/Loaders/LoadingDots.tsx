import { CSSProperties } from "react";
import styles from "./loading-dots.module.css";

// eslint-disable-next-line max-len
/** @see https://github.com/vercel/examples/blob/main/storage/blob-starter/components/loading-dots.module.css */
interface Props {
  color?: string;
  optClassName?: string;
  addStyle?: CSSProperties;
}
function LoadingDots({ color = "#000", optClassName, addStyle }: Props) {
  function getClassName() {
    let actualClassName = styles.loading;
    if (optClassName) actualClassName += ` ${optClassName}`;
    return actualClassName;
  }
  return (
    <span className={getClassName()} style={addStyle}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
}

export default LoadingDots;
