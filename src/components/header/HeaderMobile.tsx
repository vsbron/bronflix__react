import Hamburger from "@/components/header/Hamburger";
import LogoFull from "@/components/header/LogoFull";
import MobileNav from "@/components/header/MobileNav";

function HeaderMobile() {
  // Returned JSX
  return (
    <header className="fixed inset-0 bottom-auto px-6 py-5 z-20 flex justify-between items-center bg-header-gradient">
      <LogoFull />
      <Hamburger />
      <MobileNav />
    </header>
  );
}

export default HeaderMobile;
