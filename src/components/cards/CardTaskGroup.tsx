import React, { useState, useEffect } from "react";
import CardTask from "./CardTask";
import NewTaskIcon from "../../assets/icons/new-task-btn.png";
import ModalContainer from "../modals/ModalContainer";
import { TodosGroupInterface, TodosTaskInterface } from "../../types/type";
import { getTodosTask } from "../../lib/api/todos-task/todos-task";
import {
  getColorBackground,
  getColorBorder,
  getColorText,
} from "../../lib/get-color";
import clsx from "clsx";

const CardTaskGroup = ({
  TodosGroupData,
  index,
}: {
  TodosGroupData: TodosGroupInterface;
  index: number;
}) => {
  const [isOpenNewTaskModal, setIsOpenNewTaskModal] = useState(false);
  const [listTaskTodos, setListTaskTodos] = useState<TodosTaskInterface[]>([]);

  useEffect(() => {
    getTodosTask(TodosGroupData.id).then((response) =>
      setListTaskTodos(response)
    );
  }, [TodosGroupData.id]);

  const openNewTaskModalHandler = () => {
    setIsOpenNewTaskModal((open) => !open);
  };

  const updateListTask = () => {
    getTodosTask(TodosGroupData.id).then((response) => {
      setListTaskTodos(response);
    });
  };

  return (
    <>
      <div
        className={clsx(
          "p-4 rounded-[4px] border-[1px] flex flex-col gap-2 h-fit",
          getColorBackground(index),
          getColorBorder(index)
        )}
      >
        <span
          className={clsx(
            "label-group py-[2px] px-2 border-[1px] rounded-[4px] w-fit",
            getColorBorder(index)
          )}
        >
          <p
            className={clsx(
              "label-task-group font-normal text-xs leading-5",
              getColorText(index)
            )}
          >
            {TodosGroupData.title}
          </p>
        </span>
        <p className="text-xs leading-5 font-bold text-neutral-90">
          {TodosGroupData.description}
        </p>
        <div className="task-container flex flex-col gap-2">
          {listTaskTodos.length <= 0 ? (
            <div className="border-[1px] border-neutral-40 rounded-[4px] gap-2 py-2 px-4 bg-neutral-20">
              <p className="font-normal text-sm leading-6 text-neutral-70">
                No Task
              </p>
            </div>
          ) : (
            listTaskTodos.map((task) => (
              <React.Fragment key={task.id}>
                <CardTask
                  taskData={task}
                  todos_group_id={TodosGroupData.id}
                  update_state={updateListTask}
                />
              </React.Fragment>
            ))
          )}
        </div>
        <button
          className="w-fit flex items-center justify-center gap-1 cursor-pointer"
          onClick={openNewTaskModalHandler}
        >
          <img src={NewTaskIcon} alt="new-task-icon" />
          <p className="font-normal text-xs leading-5 mt-1 text-neutral-100 ">
            New Task
          </p>
        </button>
      </div>
      {isOpenNewTaskModal && (
        <ModalContainer
          modal_handler={openNewTaskModalHandler}
          modal_type="new-task"
          todos_group_id={TodosGroupData.id}
          update_state={updateListTask}
        />
      )}
    </>
  );
};

export default CardTaskGroup;
