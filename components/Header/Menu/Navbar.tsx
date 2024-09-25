import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/ui-types";

import styles from "../header.module.scss";
import { contactItem, menuItems } from "./menuItems";
import BurgerButton from "../../shared/Buttons/BurgerButton";
import SuperNavLink from "./NavLink";
import { SITE_TITLE } from "@/constants/my_coords";

export default function NavBar() {
  const activeLink = usePathname();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  function closeMenu() {
    setIsBurgerOpen(false);
  }
  function toggleMenu() {
    setIsBurgerOpen(bool => !bool);
  }

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    }
    if (!isBurgerOpen) {
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
  }, [isBurgerOpen]);

  const mobileMenuClassName = `${styles["nav-menu"]} ${
    isBurgerOpen ? styles.shown : styles.hidden
  }`;

  function getContactClasssName() {
    const cn = `${styles["navbar-item"]} ${styles["contact"]}`;
    return getIsActive(contactItem) ? `${cn} ${styles.active}` : cn;
  }

  function getIsActive(item: NavItem) {
    if (item.withSub) {
      if (activeLink.includes(`/${item.path}`)) return true;
      else return false;
    }
    return `/${item.path}` === activeLink;
  }

  return (
    <nav className={styles.navbar}>
      <a className={styles.left} href="/">
        {/* <Logo/> */}
        {SITE_TITLE}
      </a>
      <div className={styles.right}>
        <div className={mobileMenuClassName}>
          {menuItems.map(item => (
            <SuperNavLink
              key={item.path}
              item={item}
              isActive={getIsActive(item)}
              closeMenu={closeMenu}
            />
          ))}
          <ContactButton className={getContactClasssName()} {...contactItem} />
        </div>
        <BurgerButton type="main-navbar" isBurgerOpen={isBurgerOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
}

function ContactButton({
  tooltip,
  text,
  className,
}: {
  text: string;
  tooltip: string;
  className: string;
}) {
  return (
    <a className={className} href={`/contact`} title={tooltip}>
      <span>{text}</span>
    </a>
  );
}

// const Logo = () =>
//   <Link href="/#top" className={styles.logo}>
//     <Image
//     src="/images/logo_example.png"
//     alt="logo"
//     priority
//     width={32}
//     height={32}
//     />
//   </Link>;
