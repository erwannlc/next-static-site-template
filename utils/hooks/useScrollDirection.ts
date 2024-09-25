import { useEffect, useState } from "react";

export default function useScrollDirection() {

  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(null);

  const step = 10;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (
        scrollY - lastScrollY > step || scrollY - lastScrollY < -step
      )) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection, step]);

  return scrollDirection;
};