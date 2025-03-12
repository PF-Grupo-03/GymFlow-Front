/* eslint-disable @next/next/no-img-element */
import {
  FooterIcons,
  FooterIconsItem,
  FooterInfoItem,
  FooterItems,
  FooterLinks,
  FooterLinksItem,
} from "@/data/FooterItems";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="font-ibm bg-gradient-to-b from-primary to-tertiary relative w-full text-secondary py-3 px-4 flex flex-wrap justify-center items-center text-xs md:text-sm gap-4 md:gap-10">
      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1 whitespace-nowrap">
          Información de Contacto
        </span>
        {FooterItems.map((FooterItem: FooterInfoItem) => (
          <p
            key={FooterItem.id}
            className="w-full text-[11px] md:text-sm leading-tight"
          >
            {FooterItem.texto}
          </p>
        ))}
      </div>

      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1">
          Enlaces Rápidos
        </span>
        {FooterLinks.map((FooterLink: FooterLinksItem) => (
          <Link
            key={FooterLink.id}
            href={FooterLink.link}
            className="block text-secondary hover:text-primary transition duration-300 underline"
          >
            {FooterLink.texto}
          </Link>
        ))}
      </div>

      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1">
          Redes Sociales
        </span>
        <div className="flex justify-center gap-3 md:gap-5">
          {FooterIcons.map((FooterIcon: FooterIconsItem) => (
            <Link key={FooterIcon.id} href={FooterIcon.link}>
              <img
                src={FooterIcon.direccion}
                alt={`${FooterIcon.direccion
                  .split("/")
                  .pop()
                  ?.replace(".svg", "")} icon`}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 transition-all duration-300 hover:scale-110"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
