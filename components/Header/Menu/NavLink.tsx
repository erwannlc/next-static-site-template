import type { NavItem, SubNavItem } from "@/types/ui-types";

import styles from "../header.module.scss";
import { MouseEvent, TouchEvent, useState } from "react";
import { subPage2MenuItems } from "./menuItems";
import { useRouter } from "next/navigation";

interface NavLinkProps extends Omit<Props, "isActive"> {
  className: string;
}
interface Props {
  item: NavItem | SubNavItem;
  isActive: boolean;
  closeMenu: () => void;
}

export default function SuperNavLink(props: Props) {
  if (props.item.withSub) return <NavLinkWithSub {...props} />;
  return <SimpleNavLink {...props} />;
}

function SimpleNavLink({ item, isActive, closeMenu }: Props) {
  const cn = `${styles["navbar-item"]} ${isActive ? styles.active : ""}`;
  return <NavLink item={item} className={cn} closeMenu={closeMenu} />;
}

function NavLinkWithSub({ item: { path, text, tooltip }, isActive, closeMenu }: Props) {
  const router = useRouter();

  const [isSubOpen, setIsSubOpen] = useState(false);

  function handleClick() {
    router.push(`/${path}`);
    closeMenu();
  }

  function handleTouch(e: TouchEvent<HTMLDivElement>) {
    if (!isSubOpen) {
      setIsSubOpen(true);
      e.preventDefault();
    }
  }

  function getClassName() {
    let style = `${styles["navbar-item"]} ${styles["sub-container"]}`;
    if (isActive) style = `${style} ${styles.active}`;
    return isSubOpen ? `${style} ${styles.open}` : style;
  }

  return (
    <div
      className={`${getClassName()}`}
      title={!isSubOpen ? "" : tooltip}
      onMouseEnter={() => setIsSubOpen(true)}
      onMouseLeave={() => setIsSubOpen(false)}
      onTouchEnd={e => handleTouch(e)}
      onClick={handleClick}
    >
      <span className={styles.text}>{text}</span>

      {isSubOpen && (
        <SubMenu
          parentItem={{ text, path }}
          subMenuItems={subPage2MenuItems}
          closeMenu={closeMenu}
          closeSub={() => setIsSubOpen(false)}
        />
      )}
    </div>
  );
}

function SubMenu({
  parentItem,
  subMenuItems,
  closeMenu,
  closeSub,
}: {
  parentItem: {
    path: string;
    text: string;
  };
  subMenuItems: SubNavItem[];
  closeMenu: () => void;
  closeSub: () => void;
}) {
  return (
    <div className={styles.sub}>
      <a className={styles["parent-item"]} href={`/${parentItem.path}`}>
        {parentItem.text}
      </a>

      {subMenuItems.map(item => (
        <NavLink key={item.path} closeMenu={closeMenu} className={styles["sub-item"]} item={item} />
      ))}
      <button className={styles.back} onTouchStart={closeSub}>{`<`}</button>
    </div>
  );
}

function NavLink({ item: { path, text, tooltip }, className, closeMenu }: NavLinkProps) {
  const router = useRouter();
  function handleTouch(e: TouchEvent<HTMLAnchorElement>) {
    e.stopPropagation();
    router.push(`/${path}`);
    closeMenu();
  }
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
    router.push(`/${path}`);
    closeMenu();
  }

  return (
    <a
      className={className}
      href={`/${path}`}
      title={tooltip}
      onClick={e => handleClick(e)}
      onTouchEnd={e => handleTouch(e)}
    >
      <span>{text}</span>
    </a>
    // ------------// Workaround for Next Link scroll to id issue... //-------------
    // <Link
    //   className={`${getClassName()}`}
    //   href={url}
    //   title={tooltip}
    //   onClick={closeMenu} >
    //   <span>{text}</span>
    // </Link>
    // -----------------------------------------------------------------------------
  );
}
