import Link from "next/link";

import styles from "./footer.module.scss";
import { MY_COORDS } from "@/constants/my_coords";
import MyIcon from "../shared/Icon";
import { InstaColorFooter } from "@/assets/icons";
import { FacebookIcon } from "@/assets/cssgg";

const { MY_FULLNAME, MY_FB, MY_INSTA, MY_MAIL } = MY_COORDS;

export default function Footer() {
  return (
    <footer className={styles["main-footer"]}>
      <div className={styles.socials}>
        <Link href={MY_INSTA} className={styles.social}>
          <MyIcon>
            <InstaColorFooter />
          </MyIcon>
        </Link>
        <Link href={MY_FB} className={styles.social}>
          <MyIcon>
            <FacebookIcon />
          </MyIcon>
        </Link>
      </div>
      <p className={styles.name}>
        {MY_FULLNAME}
        <span>{MY_MAIL}</span>
      </p>
      <Link href={"/legal#top"} className={styles.legal}>
        Mentions légales
      </Link>
    </footer>
  );
}
