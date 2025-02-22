"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavItems, { NavItem } from "@/data/NavItems";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onClickRegister = () => {
    console.log("click");
    router.push("/Register");
  };

  return (
    <>
      <header
        className={`bg-tertiary w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          isOpen ? "rounded-b-none" : "rounded-b-[10px]"
        }`}
      >
        <nav className="flex justify-between items-center px-5 h-20 font-odor">
          <button
            className="lg:hidden text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          <Image src="/images/logo.png" alt="logo" width={80} height={80} />

          <ul
            className={`absolute lg:static top-20 left-0 w-full lg:w-auto bg-tertiary lg:bg-transparent flex flex-col lg:flex-row gap-5 p-5 lg:p-0 transition-all duration-300 ${
              isOpen
                ? "max-h-[500px] opacity-100 rounded-b-[10px]"
                : "max-h-0 opacity-0"
            } overflow-hidden lg:overflow-visible lg:max-h-none lg:opacity-100 lg:ml-auto lg:mr-5`}
          >
            {NavItems.map((NavItem: NavItem) => (
              <li key={NavItem.id}>
                <Link href={NavItem.link}>
                  <span className="hover:text-primary transition duration-300 text-secondary text-lg">
                    {NavItem.texto}
                  </span>
                </Link>
              </li>
            ))}

            <li className="lg:hidden">  
              <button 
                onClick={onClickRegister} 
                className="text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] hover:bg-[#4b4b4b] transition duration-300 w-full"
              >
                Registrate
              </button>
            </li>
          </ul>

          <button 
            onClick={onClickRegister} 
            className="hidden lg:block text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] hover:bg-[#4b4b4b] transition duration-300"
          >
            Registrate
          </button>
        </nav>
      </header>

      <div className="mt-20"></div>
    </>
  );
};

export default NavBar;
