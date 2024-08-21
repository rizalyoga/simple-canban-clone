import ModalNewGroup from "./ModalNewGroup";
import ModalNewTask from "./ModalNewTask";
import ModalDeleteConfirmation from "./ModalDeleteConfirmation";
import { ModalPropsInterface } from "../../types/type";

const ModalContainer = (props: ModalPropsInterface) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {props.modal_type == "new-group" ? (
            <ModalNewGroup
              modal_handler={props.modal_handler}
              update_state={props.update_state}
            />
          ) : props.modal_type == "new-task" ? (
            <ModalNewTask
              modal_handler={props.modal_handler}
              todos_group_id={props.todos_group_id}
              update_state={props.update_state}
            />
          ) : (
            <ModalDeleteConfirmation
              modal_handler={props.modal_handler}
              task_id={props.task_id}
              todos_group_id={props.todos_group_id}
              update_state={props.update_state}
            />
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalContainer;
