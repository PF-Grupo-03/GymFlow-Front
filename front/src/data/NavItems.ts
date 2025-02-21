export interface NavItem {
  texto: string;
  link: string;
  id: number;
}

const NavItems: NavItem[] = [
  { texto: 'Inicio', link: '/', id: 1 },
  { texto: 'Planes', link: '/Plans', id: 2 },
  { texto: 'Sobre Nosotros', link: '/about-us', id: 3 },
  { texto: 'Iniciar Sesion', link: '/Login', id: 4 },
];

export default NavItems;
