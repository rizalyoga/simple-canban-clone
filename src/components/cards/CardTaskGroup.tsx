import React, { useState } from "react";
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
import useSWR, { mutate } from "swr";
import { Droppable } from "react-beautiful-dnd";
import { useToast } from "../toast/ToastContext";

const CardTaskGroup = ({
  TodosGroupData,
  index,
  lisIdGroup,
}: {
  TodosGroupData: TodosGroupInterface;
  index: number;
  lisIdGroup: number[];
}) => {
  const [isOpenNewTaskModal, setIsOpenNewTaskModal] = useState(false);
  const { showToast } = useToast();
  const {
    data,
    isLoading,
    mutate: mutateTask,
  } = useSWR<TodosTaskInterface[]>(
    `/api/todos/${TodosGroupData.id}/items`,
    () => getTodosTask(TodosGroupData.id)
  );

  const updateData = (newGroupId: number, action: string) => {
    mutateTask();
    if (lisIdGroup.includes(newGroupId)) {
      mutate(`/api/todos/${newGroupId}/items`)
        .then(() => {
          if (action == "move") showToast("Task successfully moved", "success");
        })
        .catch(() => {
          if (action == "move") showToast("Failed to move task", "error");
        });
    }
  };

  const openNewTaskModalHandler = () => {
    setIsOpenNewTaskModal((open) => !open);
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
            {TodosGroupData.title} - {TodosGroupData.id}
          </p>
        </span>
        <p className="text-xs leading-5 font-bold text-neutral-90">
          {TodosGroupData.description}
        </p>
        <div className="task-container flex flex-col gap-2">
          {isLoading && (
            <div className="animate-pulse border-[1px] relative border-neutral-40 rounded-[4px] flex flex-col gap-2 p-4 bg-neutral-20">
              <div className="h-8 w-full bg-neutral-40 rounded"></div>
            </div>
          )}
          {data && data?.length <= 0 && !isLoading && (
            <div className="border-[1px] border-neutral-40 rounded-[4px] gap-2 py-2 px-4 bg-neutral-20">
              <p className="font-normal text-sm leading-6 text-neutral-70">
                No Task
              </p>
            </div>
          )}
          <Droppable droppableId={TodosGroupData.id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-container flex flex-col gap-2"
              >
                {data?.map((task, taskIndex) => (
                  <React.Fragment key={task.id}>
                    <CardTask
                      taskData={task}
                      todos_group_id={TodosGroupData.id}
                      list_group_id={lisIdGroup}
                      update_state={updateData}
                      index={taskIndex}
                    />
                  </React.Fragment>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <button
          className="w-fit flex items-center justify-center gap-1 cursor-pointer"
          onClick={openNewTaskModalHandler}
        >
          <img src={NewTaskIcon} alt="new-task-icon" />
          <p className="font-normal text-xs leading-5 text-neutral-100 ">
            New Task
          </p>
        </button>
      </div>
      {isOpenNewTaskModal && (
        <ModalContainer
          modal_handler={openNewTaskModalHandler}
          modal_type="new-task"
          todos_group_id={TodosGroupData.id}
          update_state={updateData}
        />
      )}
    </>
  );
};

export default CardTaskGroup;
