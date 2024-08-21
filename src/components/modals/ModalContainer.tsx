import ModalNewGroup from "./ModalNewGroup";
import ModalNewTask from "./ModalNewTask";
import { ModalPropsInterface } from "../../types/type";

const ModalContainer = (ModalProps: ModalPropsInterface) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {ModalProps.modal_type == "new-group" ? (
            <ModalNewGroup
              modal_handler={ModalProps.modal_handler}
              update_state={ModalProps.update_state}
            />
          ) : (
            <ModalNewTask
              modal_handler={ModalProps.modal_handler}
              todos_group_id={ModalProps.todos_group_id}
              update_state={ModalProps.update_state}
            />
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalContainer;
