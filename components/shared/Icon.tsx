import type { CSSProperties, FC, PropsWithChildren } from "react";

interface Props {
  className?: string;
  addStyle?: CSSProperties;
}

const MyIcon: FC<PropsWithChildren<Props>> = ({
  className,
  addStyle,
  children,
}) => {
  return (
    <span
      aria-hidden="true"
      className={className ? ` ${className}` : ""}
      style={addStyle}>
      {children}
    </span>
  );
};

export default MyIcon;
