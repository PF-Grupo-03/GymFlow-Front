export interface FooterInfoItem {
  id: number;
  texto: string;
}

export interface FooterLinksItem {
  id: number;
  texto: string;
  link: string;
}

export interface FooterIconsItem {
  id: number;
  direccion: string;
  link: string;
}

export const FooterItems: FooterInfoItem[] = [
  {
    id: 1,
    texto: 'Direccion: Calle falsa 123',
  },
  {
    id: 2,
    texto: 'Cuidad, Pais',
  },
  {
    id: 3,
    texto: 'Telefono: +54 (0) 000 000 000',
  },
  {
    id: 4,
    texto: 'Correo: gymflow@gmail.com',
  },
];

export const FooterLinks: FooterLinksItem[] = [
  {
    id: 1,
    texto: 'Inicio',
    link: '/',
  },
  {
    id: 2,
    texto: 'Planes',
    link: '/Plans',
  },
  {
    id: 3,
    texto: 'Sobre Nosotros',
    link: '/About',
  },
];

export const FooterIcons: FooterIconsItem[] = [
  {
    id: 0,
    direccion: '/assets/facebook.svg',
    link: 'https://www.facebook.com',
  },
  {
    id: 1,
    direccion: '/assets/instagram.svg',
    link: 'https://www.instagram.com',
  },
  {
    id: 2,
    direccion: '/assets/linkedin.svg',
    link: 'https://www.linkedin.com',
  },
];
