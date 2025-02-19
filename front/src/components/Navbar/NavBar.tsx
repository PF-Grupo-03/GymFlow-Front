import NavItems, { NavItem } from "@/app/data/NavItems";
import Link from "next/link";

const NavBar = () => {
  return (
    <header>
      <nav className="flex justify-end mr-5 gap-10 font-odor text-xl text-secondary bg-tertiary rounded-b-[10px] w-full h-20">
        <ul className="flex gap-10 mt-5">
          {NavItems.map((NavItem: NavItem) => {
            return (
              <li key={NavItem.id} >
                <Link href={NavItem.link}>
                  <span className="hover:text-primary transition duration-300">{NavItem.texto}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center items-center">
          <button className="text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] mb-2 mr-4 hover:bg-[#4b4b4b] transition duration-300 ] ">
            Registrate
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
