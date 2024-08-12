import React from 'react';
import { router } from '@inertiajs/react';
import { useMenu } from '../../../hooks/useMenu';

interface MenuLinkProps {
  name: string;
  path: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ name, path }) => {
  const { setOpen } = useMenu();

  const handleNavigation = () => {
    router.visit(path, {
      method: 'get',
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <button
      onClick={handleNavigation}
      className="menu-item text-4xl md:text-5xl font-light text-white hover:text-[#F8B62B] transition-all duration-300 border-b-2 border-transparent hover:border-[#F8B62B] bg-transparent"
    >
      {name}
    </button>
  );
};

export default MenuLink;
