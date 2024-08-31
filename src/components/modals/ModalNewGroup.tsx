import React, { useState } from "react";
import { ModalPropsInterface } from "../../types/type";
import { postTodosGroup } from "../../lib/api/todos-group/todos-group";
import clsx from "clsx";
import { useToast } from "../toast/ToastContext";

const ModalNewGroup = (props: ModalPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todosGroupData, setTodosGroupData] = useState({
    title: "",
    description: "",
  });
  const { showToast } = useToast();

  const onChageHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;

    setTodosGroupData({
      ...todosGroupData,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    postTodosGroup(todosGroupData)
      .then((res) => {
        if (res) {
          if (props.update_state) {
            props.update_state(props.todos_group_id as number, "create");
            setIsLoading(false);
            showToast("New group successfully created", "success");
            props.modal_handler();
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        showToast("Failed for create new group", "error");
      });
  };

  const onCancelHandler = () => {
    props.modal_handler();
  };

  return (
    <div className="modal-container-style">
      <div className="head-div-modal-style">
        <p className="title-form-style">Add New Group</p>
      </div>
      <form onSubmit={onSubmitHandler} className="px-6">
        <div className="div-input-style">
          <label className="label-form-style" htmlFor="title">
            Title
          </label>
          <input
            className="input-form-style"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={todosGroupData.title}
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="div-input-style">
          <label className="label-form-style" htmlFor="description">
            Description
          </label>
          <textarea
            className="input-form-style"
            name="description"
            id="description"
            placeholder="Description"
            value={todosGroupData.description}
            onChange={onChageHandler}
            rows={4}
            required
          />
        </div>
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
            value={isLoading ? "Wait..." : "Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalNewGroup;
