import { ArrayOfObjectsFromTuple, UnionFromTuple } from "./utility-types";


export type LocalJSONFilename = "imagesData"
export type LocalFolder =
  "mock/blog"
  | "home/page"
  | "home/gallery";

export type StaticImagesDataJsonFilenameTuple = readonly [
  "home_gallery.json"
];
export type StaticImagesDataJsonFilename = UnionFromTuple<
  StaticImagesDataJsonFilenameTuple
>

export type PublicPageUrlTuple = readonly [
  "/",
  "/page1",
  "/page2",
  "/page2/subpage1",
  "/page2/subpage2",
  "/page2/subpage3",
  "/page3",
]
export type OfferingPageUrl = UnionFromTuple<
  PublicPageUrlTuple
>;

export type PageIdTuple = [
  "home",
  "page1Id",
  "page2Id",
  "page2SubPage1Id",
  "page2SubPage2Id",
  "page2SubPage3Id",
  "page3Id"
];
export type PageId = UnionFromTuple<PageIdTuple>

export type RecoPageJoinArray = ArrayOfObjectsFromTuple<
  PageIdTuple,
  "recosId",
  string[]
>;

export interface Res {
  ok: boolean;
  message: string;
}

export type ResFormData =
  | {
    errors?: {
      [key: string]: string[]
    }
    data?: {
      create?: boolean
    }
    ok?: boolean
    message?: string
  }

