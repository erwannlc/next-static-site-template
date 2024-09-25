import styles from "./burger-button.module.scss";

interface Props {
  type: "main-navbar" | "sidebar";
  isBurgerOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerButton({ type, isBurgerOpen, toggleMenu }: Props) {
  const className = `${styles.burger} ${styles[type]} ${isBurgerOpen ? styles.close : ""}`;
  return (
    <button
      className={className}
      aria-label={isBurgerOpen ? "Hide menu" : "Show Menu"}
      onClick={toggleMenu}
    >
      <span className={styles["burger-line"]}></span>
    </button>
  );
}
