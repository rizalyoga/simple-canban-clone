import { useState } from "react";
import clsx from "clsx";
import ModalContainer from "../modals/ModalContainer";

interface NavbarProps {
  update_state: () => void;
}

const Navbar = (props: NavbarProps) => {
  const [isOpenNewGroupModal, setIsOpenNewGroupModal] = useState(false);
  const [typeModal, setTypeModal] = useState<"logout" | "new-group">(
    "new-group"
  );

  const logoutHandler = () => {
    setTypeModal("logout");
    setIsOpenNewGroupModal((open) => !open);
  };

  const newGroupModalHandler = () => {
    setTypeModal("new-group");
    setIsOpenNewGroupModal((open) => !open);
  };

  return (
    <>
      <nav className="h-16 bg-neutral-10 border-b-2 border-b-neutral-40 flex items-center justify-center">
        <div className="w-full mx-6 flex justify-between items-center">
          <div className="left-content flex justify-center items-center gap-[10px]">
            <p className="font-bold text-lg text-start">Product Roadmap</p>
            <button
              className="bg-primary_main text-white text-xs text-center font-bold leading-5 rounded-lg transition duration-[.2s] px-4 py-1 hover:bg-primary_border"
              onClick={newGroupModalHandler}
            >
              <span className="font-extrabold text-sm">+</span> Add New Group
            </button>
          </div>
          <button
            className={clsx(
              "font-submit-btn-style text-neutral-10 bg-danger_main",
              "hover:bg-danger_border hover:text-neutral-100"
            )}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </nav>
      {isOpenNewGroupModal && (
        <ModalContainer
          modal_handler={newGroupModalHandler}
          modal_type={typeModal}
          update_state={props.update_state}
        />
      )}
    </>
  );
};

export default Navbar;
