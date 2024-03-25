import { Actions } from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

export const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 h-20 z-[50] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
