import "server-only";
import { taintObjectReference } from "next/dist/server/app-render/entry-base";
import type {
  LocalFolder,
  OfferingPageUrl,
  PageId,
  PageIdTuple,
  StaticImagesDataJsonFilenameTuple
} from "@/types/app-types";
import type { Prettify, UnionFromTuple } from "@/types/utility-types";

export const PUBLIC_PAGES: PageIdTuple = [
  "home",
  "page1Id",
  "page2Id",
  "page2SubPage1Id",
  "page2SubPage2Id",
  "page2SubPage3Id",
  "page3Id"
];

export const localFolders: LocalFolder[] = [
  "home/page",
  "home/gallery"
];

interface PublicPage {
  id: PageId,
  url: OfferingPageUrl,
  description: string
}

export const offeringPages: PublicPage[] = [
  {
    id: "home",
    url: "/",
    description: "page d'accueil"
  },
  {
    id: "page1Id",
    url: "/page1",
    description: "description page 1"
  },
  {
    id: "page2Id",
    url: "/page2",
    description: "description page 2"
  },
  {
    id: "page2SubPage1Id",
    url: "/page2/subpage1",
    description: "description page2 subpage 1"
  },
  {
    id: "page2SubPage2Id",
    url: "/page2/subpage2",
    description: "description page2 subpage 2"
  },
  {
    id: "page2SubPage3Id",
    url: "/page2/subpage3",
    description: "description page2 subpage 3"
  },
  {
    id: "page3Id",
    url: "/page3",
    description: "description page 3"
  },
];

const staticImagesDataFiles: StaticImagesDataJsonFilenameTuple = [
  "home_gallery.json",
];
type StaticPage = Prettify<
  PublicPage & {
    staticImagesDataFile: UnionFromTuple<StaticImagesDataJsonFilenameTuple>
  }
>

const staticPages: StaticPage[] = offeringPages.map((page, i) => (
  {
    ...page,
    staticImagesDataFile: staticImagesDataFiles[i]
  }
));


export const APP_CONSTANTS = {
  staticImagesDataFiles,
  staticPages
};

taintObjectReference(
  "Do no pass APP_CONSTANTS to client",
  APP_CONSTANTS
);