"use client";

import { CSSProperties, useEffect, useState } from "react";

export default function ResponseInfo({
  res,
  className,
  closeRes,
  duration,
  style,
}: {
  res: string | null | undefined;
  className: string;
  closeRes: () => void;
  style?: CSSProperties;
  duration?: number | "infinity";
}) {
  const [isVisible, setIsVisible] = useState(false);

  const actualStyle: CSSProperties = {
    ...style,
    height: "1rem",
    visibility: `${isVisible ? "visible" : "hidden"}`,
  };

  useEffect(() => {
    if (!!res) setIsVisible(true);
    if (duration && duration !== "infinity") {
      const timer = setTimeout(() => {
        closeRes();
        setIsVisible(false);
      }, duration || 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!res]);

  return (
    <p className={className} style={actualStyle}>
      {res}
    </p>
  );
}
