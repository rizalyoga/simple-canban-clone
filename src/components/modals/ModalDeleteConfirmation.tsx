import { useState } from "react";
import { ModalPropsInterface } from "../../types/type";
import CloseIcon from "../../assets/icons/close-icon.svg";
import AlertIcon from "../../assets/icons/alert-icon.svg";
import clsx from "clsx";
import { useToast } from "../toast/ToastContext";
import { deleteTodosTask } from "../../lib/api/todos-task/todos-task";

const ModalDeleteConfirmation = (props: ModalPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenMenuHandler = () => props.modal_handler();
  const { showToast } = useToast();

  const deleteTaskHandler = () => {
    setIsLoading(true);
    deleteTodosTask({
      group_id: props.todos_group_id as number,
      task_id: props.task_id as number,
    })
      .then((res) => {
        if (res) {
          if (props.update_state) {
            props.update_state(props.todos_group_id as number, "delete");
            setIsLoading(false);
            showToast("Task successfully deleted", "success");
            isOpenMenuHandler();
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        showToast("Failed to delete task", "error");
      });
  };

  const onCancelHandler = () => {
    isOpenMenuHandler();
  };

  return (
    <div className="modal-container-style gap-4 z-40">
      <div className="head-div-modal-style pt-6 px-6">
        <span className="flex justify-center items-center gap-2">
          <img className="cursor-pointer" src={AlertIcon} alt="alert-icon" />
          <p className="title-form-style">Delete Task</p>
        </span>
        <img
          className="cursor-pointer"
          onClick={onCancelHandler}
          src={CloseIcon}
          alt="close-btn"
        />
      </div>
      <p className="text-sm leading-6 font-normal text-neutral-90 px-6">
        Are you sure want to delete this task? Your action cant be reverted.
      </p>
      <div className="buttons-container w-full flex gap-[10px] justify-end pt-4 pb-6 px-6">
        <button className="cancel-btn" onClick={onCancelHandler}>
          Cancel
        </button>
        <button
          onClick={deleteTaskHandler}
          className={clsx(
            "submit-btn",
            isLoading
              ? "bg-slate-400 cursor-progress"
              : "bg-danger_main hover:bg-danger_border"
          )}
        >
          {isLoading ? "Wait..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteConfirmation;
