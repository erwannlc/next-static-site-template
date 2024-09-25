import { Page2MenuItem, NavItem, SubNavItem } from "@/types/ui-types";
import placeholder from "@/public/images/placeholder.png";

const PAGE1 = "Page 1";
const PAGE2 = "Page 2";
const PAGE3 = "Page 3";

const menuItems: NavItem[] = [
  {
    path: "",
    text: "Home",
    tooltip: "Page d'accueil",
  },
  {
    path: "page1",
    text: PAGE1,
    tooltip: "Page 1 tooltip",
  },
  {
    path: "page2",
    text: PAGE2,
    tooltip: "Page 2 tooltip",
    withSub: true,
  },
  {
    path: "page3",
    text: PAGE3,
    tooltip: "Page 3 tooltip",
  },
];

const subPage2MenuItems: SubNavItem[] = [
  {
    path: "page2/subpage1",
    text: "Subpage1",
    tooltip: "Subpage 1 tooltip",
  },
  {
    path: "page2/subpage2",
    text: "Subpage2",
    tooltip: "Subpage 1 tooltip",
  },
  {
    path: "page2/subpage3",
    text: "Subpage3",
    tooltip: "Subpage 1 tooltip",
  },
];

const thumbnailMenuItems: Page2MenuItem[] = [
  { ...subPage2MenuItems[0], title: "Subpage1 title", itemImage: placeholder },
  { ...subPage2MenuItems[1], itemImage: placeholder },
  { ...subPage2MenuItems[2], itemImage: placeholder },
];

const contactItem: NavItem = {
  path: "contact",
  text: "Contact",
  tooltip: "Contactez-moi",
};

export { menuItems, contactItem, subPage2MenuItems, thumbnailMenuItems };
