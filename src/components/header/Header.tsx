import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/outline";

import { useUser } from "@/redux/reducers/userReducer";

import Authentication from "@/components/header/Authentication";
import Search from "@/components/header/Search";
import User from "@/components/header/User";

import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function Header() {
  // Getting the user id
  const { uid } = useUser();

  // Returned JSX
  return (
    <header className="absolute top-0 left-1/4 lg:left-1/2 right-0 px-12 my-6 h-[4.725rem] flex justify-end items-center gap-10">
      <Search />
      <Link
        to={NAV_LINKS_MAIN.aiMode.path}
        className="text-stone-50 hover:text-red-500 transition-colors duration-200"
        aria-label="AI Mode"
      >
        <SparklesIcon className="w-[2.5rem]" />
      </Link>
      {uid ? <User /> : <Authentication />}
    </header>
  );
}

export default Header;
