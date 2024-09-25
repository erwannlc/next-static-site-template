import type { StaticImageData } from "next/image";
import type { Modify, Prettify } from "./utility-types";

export interface NavItem {
  path: "page1" | "page2" | "page3" | "contact" | ""
  text: string
  tooltip: string
  withSub?: boolean
}

type Page2SubPagePath = "page2/subpage1" | "page2/subpage2" | "page2/subpage3";

export type SubNavItem = Prettify<
  Modify<
    NavItem,
    {
      path: Page2SubPagePath;
    }
  >
>;

export interface Page2MenuItem extends SubNavItem {
  title?: string
  itemImage: StaticImageData
}

export type GenericMainMenuItem = Page2MenuItem;

export type EditOrCreate = "create" | "edit";