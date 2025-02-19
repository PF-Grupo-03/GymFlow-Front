import {
  FooterIcons,
  FooterIconsItem,
  FooterInfoItem,
  FooterItems,
  FooterLinks,
  FooterLinksItem,
} from "@/app/data/FooterItems";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="font-ibm bg-gradient-to-b from-primary to-tertiary fixed bottom-0 left-0 w-full text-secondary py-4 flex justify-around items-center">
        <div className="">
          <span className="block font-semibold">Información de Contacto</span>
          {FooterItems.map((FooterItem: FooterInfoItem) => (
            <div
              key={FooterItem.id}
              className="flex justify-center items-center "
            >
              <p className=" text-left w-full">{FooterItem.texto}</p>
            </div>
          ))}
        </div>

        <div>
          <span className="block font-semibold">Enlaces Rápidos</span>
          {FooterLinks.map((FooterLink: FooterLinksItem) => (
            <div
              key={FooterLink.id}
              className="flex justify-center items-center"
            >
              <Link
                href={FooterLink.link}
                className="text-secondary text-left w-full hover:text-primary transition duration-300 underline"
              >
                <span>{FooterLink.texto}</span>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <span className="block font-semibold">Redes Sociales</span>
          <div className="flex justify-center items-center">
            {FooterIcons.map((FooterIcon: FooterIconsItem) => (
              <div
                key={FooterIcon.id}
                className="flex justify-center items-center"
              >
                <Image
                  src={FooterIcon.direccion}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-2"
                />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
