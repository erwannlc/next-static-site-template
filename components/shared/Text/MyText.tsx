import styles from "./text.module.scss";

interface MyTextType {
  TITLE: string;
  PARAGRAPHS: string[];
}

interface Props {
  text: MyTextType;
  addClassName?: string;
  withTitle?: boolean;
  readMore?: boolean;
  hyphensAuto?: boolean;
  emphasizeTitle?: boolean;
}

export default function MyText({
  text,
  addClassName,
  withTitle,
  readMore,
  hyphensAuto,
  emphasizeTitle,
}: Props) {
  const { PARAGRAPHS, TITLE } = text;
  let cn = addClassName ? `${styles.paragraphs} ${addClassName}` : styles.paragraphs;
  cn += withTitle ? ` ${styles["with-title"]}` : "";
  const pCn = hyphensAuto ? `${styles.hyphens}` : "";
  const titleCn = emphasizeTitle ? `${styles.title} ${styles["emphasize-title"]} ` : styles.title;

  if (readMore) {
    const getPCn = (i: number) => (readMore && i > 0 ? `${pCn} ${styles["read-more-target"]}` : `${pCn}`);
    const READ_MORE = "... en savoir plus";
    return (
      <div className={`${cn} ${styles["read-more-wrap"]}`}>
        {withTitle && <h3 className={titleCn}>{TITLE}</h3>}
        <input type="checkbox" className={styles["read-more-state"]} id="read-more" />
        {PARAGRAPHS.map((parag, i) => (
          <p key={i} className={getPCn(i)}>
            {parag}
          </p>
        ))}
        <label htmlFor="read-more" className={styles["read-more-trigger"]}>
          {READ_MORE}
        </label>
      </div>
    );
  } else
    return (
      <div className={cn}>
        {withTitle && <h3 className={titleCn}>{TITLE}</h3>}
        {PARAGRAPHS.map((parag, i) => (
          <p key={i} className={pCn}>
            {parag}
          </p>
        ))}
      </div>
    );
}

export type { MyTextType };
