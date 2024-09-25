import type { CSSProperties, ReactNode } from "react";
import styles from "../CMS/CMSButtons/icon-buttons.module.scss";
import MyIcon from "../Icon";

export type HoverType =
  | "invert"
  | "golden"
  | "gold"
  | "goldBlack"
  | "goldBlack"
  | "opacity"
  | "dark"
  | "light";

function getHover(hover?: HoverType): string {
  switch (hover) {
    case "invert":
      return "invert-on-hover";
    case "dark":
      return "dark-on-hover";
    case "light":
      return "light-on-hover";
    case "golden":
      return "golden-on-hover";
    case "gold":
      return "gold-on-hover";
    case "goldBlack":
      return "goldblack-on-hover";
    case "opacity":
      return "opacity-on-hover";
    default:
      return "";
  }
}

function MyIconTextButton({
  onClick,
  tooltip,
  cn,
  addStyle,
  options,
  type,
  children,
}: {
  children: ReactNode;
  onClick?: () => void;
  tooltip?: string;
  cn?: string;
  addStyle?: CSSProperties;
  type?: "reset" | "submit";
  options?: {
    hover: HoverType;
  };
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      type={type || "button"}
      className={`${styles["icon-text-button"]} ${cn} ${getHover(options?.hover)}`}
      style={{
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // gap: "0 4px",

        // margin: "0" ,
        // padding: "4px 8px",
        // width: "6rem",
        // height: "3rem",

        // borderRadius: "var(--border-radius)",
        // border: "none",
        // backgroundColor: "transparent",
        // transition: "all 0.3s ease-in-out",

        ...addStyle,
      }}
    >
      <MyIcon
        addStyle={{
          maxWidth: "1.5rem",
        }}
      >
        {children}
      </MyIcon>
      <span className={styles.text}>{tooltip}</span>
    </button>
  );
}

function MyIconButton({
  onClick,
  tooltip,
  addStyle,
  options,
  type,
  isDisabled,
  children,
}: {
  children: ReactNode;
  onClick?: () => void;
  tooltip?: string;
  type?: "reset" | "submit";
  isDisabled?: boolean;
  addStyle?: CSSProperties;
  options?: {
    hover: HoverType;
  };
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      type={type || "button"}
      className={getHover(options?.hover)}
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "baseline",

        margin: "0",
        padding: "4px",
        width: "2rem",
        height: "2rem",

        borderRadius: "var(--border-radius)",
        border: "none",
        backgroundColor: "transparent",
        cursor: isDisabled ? "default" : "pointer",

        ...addStyle,
      }}
      disabled={isDisabled}
    >
      <MyIcon
        addStyle={{
          maxWidth: "1.5rem",
        }}
      >
        {children}
      </MyIcon>
    </button>
  );
}

export { MyIconButton, MyIconTextButton };
