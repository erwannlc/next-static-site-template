import "server-only";
import nodemailer from "nodemailer";

const { SMTP_EMAIL, SMTP_PWD } = process.env;

export async function sendMail({
  from,
  name,
  subject,
  body
}: {
  from: string
  name: string
  subject: string
  body: string
}) {

  const response = { message: "", success: false, name: "" };

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PWD
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("sending mail testResult : ", testResult);
    if (testResult) response.success = true;
  } catch (error) {
    if (error instanceof Error) {
      response.success = false;
      response.message = error.message;
      return response;
    }
  }
  // async function mockedSendMail() {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => { res("done !"); }, 1500);
  //   });
  // }
  try {

    // Mocking ------------------------------------

    // const msg = await mockedSendMail() as string;
    // response.message = msg;
    // throw new Error("Une erreur est appparue OMG ");

    // -------------------------------------------

    const sendResult = await transport.sendMail({
      from,
      to: [`${SMTP_EMAIL}`],
      subject,
      html: body,
    });

    response.name = name;
    response.message = "mail correctly send to " + sendResult.accepted[0];
    return response;

  } catch (error) {
    if (error instanceof Error) {
      response.success = false;
      response.message = error.message;
      return response;
    }
  }
}


