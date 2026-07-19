import { Link } from "react-router-dom";

import logoFull from "@/assets/bronflix-logo-full.svg";
import { useMobileNav } from "@/context/MobileNavContext";
import { SITE_NAME } from "@/lib/constants";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function LogoFull() {
  // Getting the close mobile nav function from the context
  const { closeMenu } = useMobileNav();

  // Returned JSX
  return (
    <Link to={NAV_LINKS_MAIN.movies.path} onClick={closeMenu}>
      <img
        src={logoFull}
        width="138"
        height="35"
        alt={SITE_NAME}
        title={`${SITE_NAME} logo`}
      />
    </Link>
  );
}

export default LogoFull;
