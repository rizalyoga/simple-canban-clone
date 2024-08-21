import { useState } from "react";
import SettingIcon from "../../assets/icons/setting-btn.png";
import SettingIconFocus from "../../assets/icons/setting-btn-focus.png";
import { TodosTaskInterface } from "../../types/type";
import ProgressBar from "../progress-bar/ProgressBar";
import MenuTaskCard from "../menus/MenuTaskCard";

import ModalContainer from "../modals/ModalContainer";

const CardTask = ({
  taskData,
  todos_group_id,
  update_state,
}: {
  taskData: TodosTaskInterface;
  update_state: () => void;
  todos_group_id: number;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDeleteModal, setIsDeleteModal] = useState(false);
  const [isOpenEditModal, setIsEditModal] = useState(false);
  const [srcImage, setSrcImage] = useState(SettingIcon);

  const isOpenMenuHandler = () => {
    setIsOpenMenu((open) => !open);
  };

  const isOpenDeleteModalHandler = () => {
    setIsDeleteModal((open) => !open);
    setIsOpenMenu(false);
  };

  const isOpenEditModalHandler = () => {
    setIsEditModal((open) => !open);
    setIsOpenMenu(false);
  };

  return (
    <>
      <div className="border-[1px] relative border-neutral-40 rounded-[4px] flex flex-col gap-2 p-4 bg-neutral-20">
        <p className="font-bold text-sm leading-6 text-neutral-90">
          {taskData.name}
        </p>
        <div className="border-[1px] border-dashed border-neutral-40"></div>
        <div className="flex relative gap-[26px] justify-center items-center">
          <ProgressBar progress={taskData.progress_percentage} />
          <img
            className="cursor-pointer"
            onMouseEnter={() => setSrcImage(SettingIconFocus)}
            onMouseLeave={() => setSrcImage(SettingIcon)}
            src={srcImage}
            alt="setting-icon"
            onClick={isOpenMenuHandler}
          />
          {isOpenMenu && (
            <MenuTaskCard
              openMenuHandler={isOpenMenuHandler}
              openDeleteModalHandler={isOpenDeleteModalHandler}
              openEditModalHandler={isOpenEditModalHandler}
              task_id={taskData.id}
              todos_group_id={todos_group_id}
              update_state={update_state}
            />
          )}
          {isOpenEditModal && (
            <ModalContainer
              modal_type="edit-task"
              task_id={taskData.id}
              todos_group_id={todos_group_id}
              modal_handler={isOpenEditModalHandler}
              update_state={update_state}
              task_name={taskData.name}
              progress_percentage={taskData.progress_percentage}
            />
          )}
          {isOpenDeleteModal && (
            <ModalContainer
              modal_type="delete-task"
              task_id={taskData.id}
              todos_group_id={todos_group_id}
              modal_handler={isOpenDeleteModalHandler}
              update_state={update_state}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CardTask;
