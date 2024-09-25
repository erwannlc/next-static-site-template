"use client";
import styles from "./header.module.scss";
import { useEffect, useState } from "react";
import NavBar from "./Menu/Navbar";
import useScrollDirection from "@/utils/hooks/useScrollDirection";

interface Props {
  isSession: boolean;
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    function listenToScroll() {
      if (scrollDirection === "down") {
        if (window.scrollY > 0 && isVisible) setIsVisible(false);
      } else if (!isVisible) setIsVisible(true);
    }
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [isVisible, scrollDirection]);

  const className = isVisible ? styles.app_header : `${styles.app_header} ${styles.hidden}`;

  return (
    <header className={className}>
      <NavBar />
    </header>
  );
}
