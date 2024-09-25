import styles from "./home.module.scss";
import { HOME_MSG } from "./home_constants";
const { TITLE } = HOME_MSG;

export default function HomePage() {
  return (
    <div className={styles.home}>
      <header>
        <h1 className={styles.title}>
          {TITLE[0]}
          <p>{TITLE[1]}</p>
        </h1>
      </header>
      <div>Mon contenu</div>
    </div>
  );
}
