import Link from "next/link";

import styles from "./contact.module.scss";
import { FacebookIcon, MailIcon, PhoneIcon } from "@/assets/cssgg";
import { InstaColor } from "@/assets/icons";
import MyIcon from "shared/Icon";
import ContactForm from "./ContactForm";
import { MY_COORDS } from "@/constants/my_coords";
import { CONTACT_PAGE } from "./contact_constants";

const { MY_MAIL, MY_TEL, MY_FB, MY_INSTA } = MY_COORDS;
const { TITLE, OWNER_DESCRIPTION, OWNER_NAME } = CONTACT_PAGE;

export default async function ContactPage() {
  return (
    <div className={styles.contact}>
      <div className={styles.infos}>
        <h1 className={styles.title}>{TITLE}</h1>

        <p>{OWNER_NAME}</p>
        <p>{OWNER_DESCRIPTION}</p>

        <div className={styles.coords}>
          <Link href={`mailto:${MY_MAIL}`} target="_blank" className={styles.mail}>
            {MY_MAIL}
            <MyIcon>
              <MailIcon />
            </MyIcon>
          </Link>

          <Link href={`tel:+33${MY_TEL.slice(1)}`} target="_blank" className={styles.tel}>
            {MY_TEL}
            <MyIcon>
              <PhoneIcon />
            </MyIcon>
          </Link>

          <div className={styles.socials}>
            <Link href={MY_INSTA} target="_blank" className={styles.social}>
              <MyIcon>
                <InstaColor />
              </MyIcon>
            </Link>
            <Link href={MY_FB} target="_blank" className={styles.social}>
              <MyIcon>
                <FacebookIcon />
              </MyIcon>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        {/* <h2>{`Demande d'informations`}</h2> */}
        <ContactForm />
      </div>
    </div>
  );
}
