import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleMenu, setMenuOpen } from "../store/slices/menuSlice";

export const useMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  const toggle = () => dispatch(toggleMenu());
  const setOpen = (open: boolean) => dispatch(setMenuOpen(open));

  return { isOpen, toggle, setOpen };
};
