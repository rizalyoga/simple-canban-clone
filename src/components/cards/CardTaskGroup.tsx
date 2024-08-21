import React, { useState, useEffect } from "react";
import CardTask from "./CardTask";
import NewTaskIcon from "../../assets/icons/new-task-btn.png";
import { TodosGroupInterface, TodosTaskInterface } from "../../types/type";
import { getTaskTodos } from "../../lib/api/todos-task/todos-task";

const CardTaskGroup = ({
  TodosGroupData,
}: {
  TodosGroupData: TodosGroupInterface;
}) => {
  const [listTaskTodos, setListTaskTodos] = useState<TodosTaskInterface[]>([]);

  useEffect(() => {
    getTaskTodos(TodosGroupData.id).then((response) =>
      setListTaskTodos(response)
    );
  }, [TodosGroupData.id]);

  return (
    <div className="p-4 rounded-[4px] border-[1px] border-primary_main flex flex-col gap-2 bg-primary_surface">
      <span className="label-group py-[2px] px-2 border-[1px] border-primary_main rounded-[4px] w-fit">
        <p className="label-task-group font-normal text-xs leading-5 text-primary_main ">
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
              <CardTask taskData={task} />
            </React.Fragment>
          ))
        )}
      </div>
      <div className="w-fit flex items-center justify-center gap-1 cursor-pointer">
        <img src={NewTaskIcon} alt="new-task-icon" />
        <p className="font-normal text-xs leading-5 mt-1 text-neutral-100 ">
          New Task
        </p>
      </div>
    </div>
  );
};

export default CardTaskGroup;
