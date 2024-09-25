import styles from "./call-to-action.module.scss";

interface Props {
  optClassName?: string;
  optId?: string;
  optTxt?: string;
}
const CTA_TEXT = "réserver une séance";

export default function CallToAction({ optClassName, optId, optTxt }: Props) {
  const content = (optTxt || CTA_TEXT).toLocaleUpperCase();
  return (
    <div className={`${styles.cta} ${optClassName}`} id={optId}>
      <a href={`/contact`}>{content}</a>
    </div>
  );
}
