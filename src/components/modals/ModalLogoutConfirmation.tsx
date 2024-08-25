import { ModalPropsInterface } from "../../types/type";
import CloseIcon from "../../assets/icons/close-icon.svg";
import AlertIcon from "../../assets/icons/alert-icon.svg";
import clsx from "clsx";

const ModalLogoutConfirmation = (props: ModalPropsInterface) => {
  const isOpenMenuHandler = () => props.modal_handler();
  const logoutHandler = () => {
    sessionStorage.clear();
    window.location.href = "/v1/login";
  };

  const onCancelHandler = () => {
    isOpenMenuHandler();
  };

  return (
    <div className="modal-container-style gap-4 z-40">
      <div className="head-div-modal-style pt-6 px-6">
        <span className="flex justify-center items-center gap-2">
          <img className="cursor-pointer" src={AlertIcon} alt="alert-icon" />
          <p className="title-form-style">Log Out</p>
        </span>
        <img
          className="cursor-pointer"
          onClick={onCancelHandler}
          src={CloseIcon}
          alt="close-btn"
        />
      </div>
      <p className="text-sm leading-6 font-normal text-neutral-90 px-6">
        Are you sure want to leave?
      </p>
      <div className="buttons-container w-full flex gap-[10px] justify-end pt-4 pb-6 px-6">
        <button className="cancel-btn" onClick={onCancelHandler}>
          Cancel
        </button>
        <button
          onClick={logoutHandler}
          className={clsx(
            "submit-btn",

            "bg-danger_main hover:bg-danger_border"
          )}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ModalLogoutConfirmation;
