import { EditOrCreate } from "@/types/ui-types";
import LoadingDots from "../Loaders/LoadingDots";
import styles from "./saveandResetButtons.module.scss";
import { ARE_YOU_SURE_TO } from "@/constants/UI/global_messages";

interface Props {
  type: EditOrCreate;
  isDisabled: boolean;
  isSaving: boolean;
  handleRestore: () => void;
  handleSubmit: () => void;
}

/** unused */
export function SaveAndResetButtons({
  type,
  isDisabled,
  isSaving,
  handleRestore,
  handleSubmit,
}: Props) {
  const RESET_BUTTON = type === "create" ? "Réinitialiser" : "Annuler";
  const SUBMIT_BUTTON = type === "create" ? "Créer l'article" : "Sauvegarder";

  const CANCEL_MODIFICATIONS = "annuler les modifications";
  const SAVE_DATA = "sauvegarder les modifications dans la base de données";
  function onReset() {
    if (confirm(`${ARE_YOU_SURE_TO} ${CANCEL_MODIFICATIONS} ?`)) handleRestore();
  }
  function onSubmit() {
    if (confirm(`${ARE_YOU_SURE_TO} ${SAVE_DATA} ?`)) handleSubmit();
  }

  if (isSaving) return <LoadingDots optClassName={styles.loader} />;

  return (
    <div className={styles["save-reset--buttons"]}>
      <button
        className={`${styles.reset} default`}
        title={CANCEL_MODIFICATIONS}
        onClick={onReset}
        disabled={isDisabled}
      >
        {RESET_BUTTON}
      </button>
      <button
        className={`${styles.submit} default`}
        title={SAVE_DATA}
        onClick={onSubmit}
        disabled={isDisabled}
      >
        {SUBMIT_BUTTON}
      </button>
    </div>
  );
}
