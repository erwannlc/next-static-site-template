import styles from "./legal.module.scss";
import { getLegalNoticeText, legalNoticeInfo } from "./content";
import { MY_COORDS } from "@/constants/my_coords";

const { MY_FULLNAME, MY_MAIL, MY_SITE } = MY_COORDS;

export default function LegalNoticePage() {
  const text = getLegalNoticeText(MY_FULLNAME, MY_SITE, MY_MAIL);

  return (
    <section className={styles.legal} id="top">
      <h1 className={styles.title}>Mentions légales</h1>
      <div className={styles.content}>
        <ul>
          {legalNoticeInfo.map((info, k) => (
            <li key={k}>
              <span>{info[0]}</span>
              {info[1]}
            </li>
          ))}
        </ul>
        <div className={styles.texts}>
          {text.map((paragraph, k) => (
            <p key={k}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
