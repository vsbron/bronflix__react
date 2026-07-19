import { Link } from "react-router-dom";

import FooterHeading from "@/components/footer/FooterHeading";

import { NAV_LINKS_MAIN, NAV_LINKS_SECONDARY } from "@/lib/navLinks";

function FooterNav() {
  // Returned JSX
  return (
    <>
      <FooterHeading>Discover more</FooterHeading>
      <div className="flex">
        <ul className="basis-[35%] sm:basis-[34.5%] lg:basis-[40%] m-0 flex flex-col gap-1">
          {Object.values(NAV_LINKS_MAIN).map(({ path, label }) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
        <ul className="basis-[40%] m-0 flex flex-col gap-1">
          {Object.values(NAV_LINKS_SECONDARY).map(({ path, label }) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FooterNav;
