import { Link } from "react-router-dom";

import { SITE_NAME } from "@/lib/constants";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";
import logo from "@/assets/bronflix-logo.svg";

function Logo() {
  // Returned JSX
  return (
    <Link to={NAV_LINKS_MAIN.movies.path}>
      <img
        src={logo}
        width="35"
        height="50"
        alt={SITE_NAME}
        title={`${SITE_NAME} logo`}
      />
    </Link>
  );
}

export default Logo;
