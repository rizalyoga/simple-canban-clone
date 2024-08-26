import React, { useState } from "react";
import { ModalPropsInterface } from "../../types/type";
import { editTodosTask } from "../../lib/api/todos-task/todos-task";
import clsx from "clsx";
import CloseIcon from "../../assets/icons/close-icon.svg";

const ModalEditTask = (props: ModalPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [todosTaskData, setTodosTaskData] = useState({
    taks_name: props.task_name,
    progress: props.progress_percentage?.toString(),
  });
  const validProgressValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const onChageHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setTodosTaskData({
      ...todosTaskData,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const progressValue = parseInt(todosTaskData.progress as string);

    if (validProgressValues.includes(progressValue)) {
      const newTask = {
        name: todosTaskData.taks_name as string,
        todos_group_id: props.todos_group_id as number,
        progress_percentage: progressValue,
        task_id: props.task_id as number,
      };

      editTodosTask(newTask)
        .then((res) => {
          if (res) {
            if (props.update_state) {
              props.update_state(props.todos_group_id as number);
            }
          }
        })
        .then(() => setIsLoading(false))
        .then(() => props.modal_handler());
    } else {
      setIsErrorMessage(
        "The progress range is only from 10, 20, 30, 40 ... 100"
      );
      setIsLoading(false);
    }
  };

  const onCancelHandler = () => {
    props.modal_handler();
  };

  return (
    <div className="modal-container-style">
      <div className="head-div-modal-style">
        <p className="title-form-style">Edit Task</p>
        <img
          className="cursor-pointer"
          onClick={onCancelHandler}
          src={CloseIcon}
          alt="close-btn"
        />
      </div>
      <form onSubmit={onSubmitHandler} className="px-6">
        <div className="div-input-style">
          <label className="label-form-style" htmlFor="taks_name">
            Task Name
          </label>
          <input
            className="input-form-style"
            type="text"
            name="taks_name"
            id="taks_name"
            placeholder="Type your task"
            value={todosTaskData.taks_name}
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="div-input-style">
          <label className="label-form-style" htmlFor="progress">
            Progress
          </label>
          <select
            className="input-form-style w-[143px] appearance-none"
            name="progress"
            id="progress"
            value={todosTaskData.progress}
            onChange={onChageHandler}
            required
          >
            <option value="" disabled>
              70%
            </option>
            {validProgressValues.map((value) => (
              <option key={value} value={value}>
                {value}%
              </option>
            ))}
          </select>
        </div>
        <p className="error-text-form-style">{isErrorMessage}</p>
        <div className="buttons-container pb-6 w-full flex gap-[10px] justify-end">
          <button className="cancel-btn" onClick={onCancelHandler}>
            Cancel
          </button>
          <input
            type="submit"
            className={clsx(
              "submit-btn",
              isLoading
                ? "bg-slate-400 cursor-progress"
                : "bg-primary_main hover:bg-primary_border"
            )}
            value={isLoading ? "Wait..." : "Save Task"}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalEditTask;
