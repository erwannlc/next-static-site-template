/* eslint-disable max-len */
import { MY_COORDS } from "@/constants/my_coords";

const { MY_FULLNAME, MY_MAIL, MY_ADDRESS, MY_TEL } = MY_COORDS;

export function getLegalNoticeText(my_name: string, my_site: string, my_mail: string) {
  return [
    `Le site ${my_site} est un site de présentation et de promotion des services de photographie proposés par ${my_name}. Les informations fournies sur ce site sont à titre informatif et ne constituent pas un engagement contractuel.`,
    `Toute reproduction, distribution, modification, ou transmission des contenus du site, en tout ou en partie, est strictement interdite sans l'autorisation préalable écrite de ${my_name}.`,
    `Le site peut contenir des liens vers des sites tiers. ${my_name} ne saurait être tenu responsable du contenu de ces sites tiers.`,
    `Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, et de suppression des données vous concernant. Pour exercer ce droit, veuillez contacter ${my_name} à l'adresse ${my_mail}.`,
    `Ce site est protégé par les lois françaises et internationales sur le droit d'auteur et la propriété intellectuelle.`,
  ];
}

const LEGAL_NOTICE = {
  PUBLISHER: "Éditeur du site",
  ADDRESS: "Adresse",
  PHONE: "Téléphone",
  MAIL: "Email",
  SIRET: "SIRET",
  RESPONSIBLE: "Responsable de la publication",
  HOST_NAME: "Hébergeur",
  HOST_ADDRESS: "Adresse de l'hébergeur",
  HOST_CONTACT: "Contact hébergeur",
};

const {
  PUBLISHER,
  ADDRESS,
  PHONE,
  MAIL,
  SIRET,
  RESPONSIBLE,
  HOST_NAME,
  HOST_ADDRESS,
  HOST_CONTACT,
} = LEGAL_NOTICE;

export const legalNoticeInfo = [
  [PUBLISHER, MY_FULLNAME],
  [ADDRESS, MY_ADDRESS],
  [PHONE, MY_TEL],
  [MAIL, MY_MAIL],
  [SIRET, "123456789456"],
  [RESPONSIBLE, MY_FULLNAME],
  [HOST_NAME, "Vercel"],
  [HOST_ADDRESS, `Vercel Inc. 440 N Barranca Ave #4133 Covina, CA 91723`],
  [HOST_CONTACT, "privacy@vercel.com"],
];
