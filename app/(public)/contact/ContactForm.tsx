"use client";
import { createRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import styles from "./contact-form.module.scss";
import { sendMailAction } from "./mail-action";
import LoadingDots from "shared/Loaders/LoadingDots";
import Dialog from "shared/Dialog/Dialog";
import { CONTACT_FORM_LABEL } from "./contact_constants";

const { NAME, FIRSTNAME, MAIL, PHONE, MESSAGE, SUBMIT } = CONTACT_FORM_LABEL;

const initialState = {
  message: "",
  success: true,
  name: "",
};
/** TODO:
 * - Implement validation
 * - Refactor with toast
 */
export default function ContactForm() {
  const [state, formAction] = useFormState(sendMailAction, initialState);

  const [isModal, setIsModal] = useState(false);

  const formRef = createRef<HTMLFormElement>();
  function resetForm() {
    formRef.current?.reset();
  }

  function closeModal() {
    setIsModal(false);
  }

  async function onSubmit(formData: FormData) {
    formAction(formData);
    if (state.success) {
      setIsModal(true);
      resetForm();
    }
    if (state && !state.success) {
      setIsModal(true);
    }
  }

  return (
    <>
      <form ref={formRef} action={onSubmit} className={styles["contact-form"]}>
        <div className={styles["flex-row"]}>
          <label htmlFor="name">
            {NAME}
            <input type="text" id="name" name="name" placeholder="Nom..." required />
          </label>
          <label htmlFor="firstname">
            {FIRSTNAME}
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom... (optionnel) "
            />
          </label>
        </div>

        <label htmlFor="email">
          {MAIL}
          <input type="email" id="email" name="email" placeholder="adresse@mail.com..." required />
        </label>
        <label htmlFor="phone">
          {PHONE}
          <input type="phone" id="phone" name="phone" placeholder="012345678 (optionnel)" />
        </label>

        <label htmlFor="message">
          {MESSAGE}
          <textarea id="message" name="message" placeholder="Écrivez votre message..." required />
        </label>

        <footer className={styles["form-footer"]}>
          <SubmitButton />
        </footer>

        <p aria-live="polite" className={"screen-reader-only"} role="status">
          {state?.message}
        </p>
      </form>

      <Dialog
        isOpen={isModal}
        onRequestClose={closeModal}
        closeOnOutsideClick
        optClassName={`${styles.contact} ${state?.success ? styles.success : styles.error}`}
        darkButton
        closeBtnClasssName={styles["close-contact"]}
      >
        <ResponseMsg
          name={state?.name}
          errMsg={state?.message}
          isSuccess={state?.success}
          close={closeModal}
        />
      </Dialog>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const content = pending ? <LoadingDots optClassName={styles.loader} /> : SUBMIT;

  return (
    <button type="submit" aria-disabled={pending}>
      {content}
    </button>
  );
}

function ResponseMsg({
  name,
  errMsg,
  isSuccess,
  close,
}: {
  name: string;
  errMsg: string;
  isSuccess: boolean;
  close: () => void;
}) {
  const successContent = {
    TITLE: "Votre message a été envoyé avec succès.",
    P1: (
      <p>
        Merci <span>{name}</span>.
      </p>
    ),
    P2: <p>Nous vous enverrons une réponse dès que possible.</p>,
  };
  const errorContent = {
    TITLE: "Oups, une erreur est apparue.",
    P1: <p>{`Veuillez nous excuser et réessayer l'envoi de votre message.`}</p>,
    P2: <p>{errMsg}</p>,
  };
  const { TITLE, P1, P2 } = isSuccess ? successContent : errorContent;

  return (
    <div className={styles.content}>
      <h1>{TITLE}</h1>
      <div className={styles.text}>
        {P1}
        {P2}
      </div>
      <button onClick={close}>OK</button>
    </div>
  );
}
