import "server-only";
import type { ContactFormData } from "@/types/content-types";

const MAIL_TEXTS = {
  TITLE: "Hey Seb !",
  SUBTITLE: "Tu as reçu ce nouveau message :",
  COORDS_TITLE: "Coordonnées du destinateur",
  COORDS: {
    NAME: `Nom : `,
    FIRSTNAME: `Prénom : `,
    MAIL: `Email : `,
    PHONE: `Téléphone : `
  }
};

const {
  TITLE,
  SUBTITLE,
  COORDS_TITLE,
  COORDS: {
    NAME,
    FIRSTNAME,
    MAIL,
    PHONE,
  }
} = MAIL_TEXTS;

export default function getMailTemplate(contactFormData: ContactFormData) {
  const {
    name,
    firstname,
    email,
    phone,
    message
  } = contactFormData;

  const parsedMessage = parseMessage(message);

  const html = `
    <body style="
      padding: 1rem;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1rem;
      color: #151515;
    ">
    <h1 style="font-size: 1rem; opacity: 0.8">${TITLE}</h1>
    <h2 style="font-size: 1rem; font-weight: 400; opacity: 0.8">
      ${SUBTITLE}
    </h2>

    <div
      style="
        width: 60%;
        height: auto;
        margin: 2rem auto;
        margin-left: 0;
        padding: 2rem;
        padding-top: 0.5rem;
        padding-bottom: 1rem;
        border: 1px solid grey;
        border-radius: 6px;
        background-color: rgba(245, 245, 245, 0.5);
      "
    >
      <p>
        ${parsedMessage}
      </p>
    </div>
    <div
      style="
        margin: 3rem auto 3rem;
        border-left: 4px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
        padding-top: 0;
        opacity: 0.9;
      "
    >
      ${COORDS_TITLE}
      <p><span style="font-weight: bold">${NAME}</span>${name}</p>
      <p><span style="font-weight: bold">${FIRSTNAME}</span>${firstname}l</p>
      <p>
        <span style="font-weight: bold">${MAIL}</span>${email}
      </p>
      <p><span style="font-weight: bold">${PHONE}</span>${phone}</p>
    </div>
  </body>`;
  const minified = minify(html);
  return minified;
}

function minify(s: string) {
  return s
    ? s
      // Removes new lines and irrelevant spaces which might affect layout, and are better gone
      .replace(/\>[\r\n ]+\</g, "><")
      .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : " ")
      .trim()
    : "";
}

function parseMessage(message: string) {
  return message.replace(/\n/g, "<br />");
}