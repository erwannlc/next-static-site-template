import styles from "./page.module.scss";
import Image from "next/image";
import { page1Images } from "./page1-images";
const { image1 } = page1Images;
const TITLE = "Page un";

export default async function Page1Page() {
  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>{TITLE}</h1>
        <Image
          src={image1.image}
          alt={image1.alt}
          placeholder="blur"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </header>
      <section>Content</section>
    </div>
  );
}
