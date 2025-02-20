import {
  FooterIcons,
  FooterIconsItem,
  FooterInfoItem,
  FooterItems,
  FooterLinks,
  FooterLinksItem,
} from "@/data/FooterItems";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="font-ibm bg-gradient-to-b from-primary to-tertiary relative w-full text-secondary py-3 px-4 flex flex-wrap justify-center items-center text-xs md:text-sm gap-4 md:gap-10">
      {/* Información de Contacto */}
      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1 whitespace-nowrap">
          Información de Contacto
        </span>
        {FooterItems.map((FooterItem: FooterInfoItem) => (
          <p key={FooterItem.id} className="w-full text-[11px] md:text-sm leading-tight">
            {FooterItem.texto}
          </p>
        ))}
      </div>

      {/* Enlaces Rápidos */}
      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1">Enlaces Rápidos</span>
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

      {/* Redes Sociales */}
      <div className="flex-1 w-full md:w-auto text-center">
        <span className="block font-semibold text-sm md:text-base mb-1">Redes Sociales</span>
        <div className="flex justify-center gap-2">
          {FooterIcons.map((FooterIcon: FooterIconsItem) => (
            <Image
              key={FooterIcon.id}
              src={FooterIcon.direccion}
              alt="Logo"
              width={30}
              height={30}
              className="w-8 h-8"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
