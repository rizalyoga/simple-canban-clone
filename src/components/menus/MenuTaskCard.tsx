import { useEffect, useRef, useCallback } from "react";
import LeftArrow from "../../assets/icons/left-arrow.svg";
import RightArrow from "../../assets/icons/right-arrow.svg";
import EditIcon from "../../assets/icons/edit-icon.svg";
import TrashIcon from "../../assets/icons/trash-icon.svg";
import "./MenuTaskCard.css";

import { MenuTaskCardInterface } from "../../types/type";

const MenuTaskCard = (props: MenuTaskCardInterface) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        props.OpenMenuHandler();
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="menu-container bg-neutral-10 absolute z-20 w-[320px] rounded-lg py-2 m-20 shadow-xl border-[1px] border-neutral-30 -top-14"
      ref={menuRef}
    >
      <ul>
        <li
          className="font-menu-style list-menu-container-style text-utilities"
          data-hover="right"
        >
          <img className="ml-1 right-icon" src={RightArrow} alt="right-icon" />
          <span className="ml-[2px]">Move Right</span>
        </li>
        <li
          className="font-menu-style list-menu-container-style text-utilities"
          data-hover="left"
        >
          <img className="ml-1 left-icon" src={LeftArrow} alt="left-icon" />
          <span className="ml-[2px]">Move Left</span>
        </li>
        <li
          className="font-menu-style list-menu-container-style text-utilities"
          data-hover="edit"
        >
          <img className="edit-icon" src={EditIcon} alt="edit-icon" />
          <span>Edit</span>
        </li>
        <li
          className="font-menu-style list-menu-container-style text-utilities hover:text-danger_main"
          data-hover="delete"
        >
          <img className="trash-icon" src={TrashIcon} alt="trash-icon" />
          <span className="ml-[2px]">Delete</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuTaskCard;
