export interface NavItem {
  texto: string;
  link: string;
  id: number;
}

export const NavItemsLogIn: NavItem[] = [
  { texto: "Inicio", link: "/", id: 1 },
  { texto: "Planes", link: "/Plans", id: 2 },
  { texto: "Sobre Nosotros", link: "/About", id: 3 },
  { texto: "Agendar Turno", link: "/Booking", id: 4 },
  { texto: "Mi cuenta", link: "/MyAccount", id: 5 },
];

export const NavItemsLogOut: NavItem[] = [
  { texto: "Inicio", link: "/", id: 1 },
  { texto: "Planes", link: "/Plans", id: 2 },
  { texto: "Sobre Nosotros", link: "/About", id: 3 },
  { texto: "Iniciar Sesion", link: "/Login", id: 4 },
];
