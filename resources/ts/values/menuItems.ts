export interface MenuItem {
  name: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Works", path: "/works" },
  { name: "Contact", path: "/contact" },
];
