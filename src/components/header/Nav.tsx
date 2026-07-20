import { Link } from "react-router-dom";
import * as OutlineIcons from "@heroicons/react/24/outline";

import { useUser } from "@/redux/reducers/userReducer";

import { NAV_LINKS_OTHER, NAV_LINKS_MAIN } from "@/lib/navLinks";
import { NavItemProps } from "@/lib/types";

function Nav() {
  // Getting the id from user store
  const { uid } = useUser();

  // Returned JSX
  return (
    <nav className="flex flex-col gap-16 my-auto">
      {Object.values(NAV_LINKS_MAIN).map(
        ({ path, label, icon }) =>
          icon && (
            <Link key={path} to={path}>
              <NavItem icon={icon} title={label} />
            </Link>
          ),
      )}
      {uid && (
        <Link to={NAV_LINKS_OTHER.profile.path}>
          <NavItem
            icon={NAV_LINKS_OTHER.profile.icon}
            title={NAV_LINKS_OTHER.profile.label}
          />
        </Link>
      )}
    </nav>
  );
}

export default Nav;

// Link Item element
function NavItem({ icon, title }: NavItemProps) {
  // Resolving the icon component from its name
  const Icon = icon ? OutlineIcons[icon as keyof typeof OutlineIcons] : null;

  // Returned JSX
  return (
    <div className="flex gap-6 whitespace-nowrap items-center text-stone-50 hover:text-red-500 transition-colors duration-200">
      <span className="block basis-[2.5rem] flex-shrink-0">
        {Icon && <Icon />}
      </span>
      <span className="sidebar__nav-title">{title}</span>
    </div>
  );
}
