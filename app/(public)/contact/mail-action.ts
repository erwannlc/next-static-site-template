"use server";
import { ContactFormData } from "@/types/content-types";
import { sendMail } from "../../../lib/mail/send-email";
import getMailTemplate from "./mail-template";

class Mail_subject {
  private static title: string = "Site SGPhotographe";
  private static newMessageFrom(email: string) {
    return `${this.title} : nouveau message de ${email}`;
  }
  public static get(emailFrom: string) {
    return this.newMessageFrom(emailFrom);
  }
}

export async function sendMailAction(
  prevState: { message: string, success: boolean, name: string },
  formData: FormData
): Promise<{
  message: string;
  success: boolean;
  name: string;
}> {
  const contactFormData = Object.fromEntries(formData) as unknown as ContactFormData;
  const { name, email } = contactFormData;

  const response = await sendMail({
    from: email,
    name,
    subject: Mail_subject.get(email),
    body: getMailTemplate(contactFormData)
  });
  if (!response) return { message: "Error: no response from mail API", success: false, name: "" };
  response.name = getSenderName(formData);
  return response;
}

function getSenderName(formData: FormData) {
  const name = formData.get("name") as string;
  const firstname = formData.get("firstname") as string;
  return firstname ? `${firstname}` : name;
}