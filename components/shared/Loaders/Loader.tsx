import styles from "./loader-spinner.module.scss";

const Loader = ({ className }: { className?: string }) => (
  <div className={`${styles["loader-spinner"]} ${className}`} />
);

export default Loader;
