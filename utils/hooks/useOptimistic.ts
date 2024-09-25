import { useState, useEffect } from "react";

export default function useCustomOptimistic<T>(passthrough: T) {
  const [value, setValue] = useState<T>(passthrough);

  useEffect(() => {
    setValue(passthrough);
  }, [passthrough]);

  return [value, setValue] as const;
}