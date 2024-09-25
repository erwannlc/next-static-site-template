
import type { ImageDataType } from "./image-types";
import type { DateString, MakePropsOptional, Prettify } from "./utility-types";

// generic / universal content type
interface ContentData {
  id: string
  title: string
  text: TextType
  images: (ImageDataType | { id: string })[]
  subtitle?: string
  teaser?: Teaser
  date?: ContentDate
  author?: string
  comments?: CommentType[]
  recommendations?: Recommendation[]
  addContents?: UIType[]
}

interface TextType {
  paragraphs: Paragraph[]
  title?: string
  footer?: string // ou signature?: string
}

interface Paragraph {
  id: string
  content: string
}

interface ContentDate {
  creation: DateString
  lastUpdate: DateString
}

interface Teaser {
  thumbnail: ImageDataType | { id: string }
  description: string // ou TextType
}

interface CommentType {
  id: string   // model: "Article02-C4"
  article_id: string
  author: string
  text: string
  date: DateString
  rating?: number
}

type TextContentData = Prettify<
  MakePropsOptional<
    Omit<ContentData, "images" | "teaser" | "recommendations">,
    "title"
  >
>

export type RecoId = string

interface Recommendation extends TextContentData {
  id: RecoId,
  author: string,
  text: TextType
  images?: (ImageDataType | { id: string })[]
  date?: ContentDate
}

type UIType =
  | { type: "txt"; content: TextType }
  | { type: "image"; disposition: "unique"; content: ImageDataType }
  | { type: "images"; disposition: ImagesDisposition; content: ImageDataType[] }
  | { type: "comment"; content: CommentType };

type ImagesDisposition = "carousel" | "fill" | "mozaic" | "unique"

interface ContactFormData {
  name: string;
  firstname: string
  email: string;
  phone: string
  message: string;
}

export type {
  ContentData,
  TextType,
  Paragraph,
  Teaser,
  ContentDate,
  TextContentData,
  CommentType,
  ImagesDisposition,
  UIType,
  Recommendation,
  ContactFormData
};