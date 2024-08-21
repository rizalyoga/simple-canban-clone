import { useState } from "react";
import SettingIcon from "../../assets/icons/setting-btn.png";
import SettingIconFocus from "../../assets/icons/setting-btn-focus.png";
import { TodosTaskInterface } from "../../types/type";
import ProgressBar from "../progress-bar/ProgressBar";
import MenuTaskCard from "../menus/MenuTaskCard";

const CardTask = ({ taskData }: { taskData: TodosTaskInterface }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [srcImage, setSrcImage] = useState(SettingIcon);

  const isOpenMenuHandler = () => {
    setIsOpenMenu((open) => !open);
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
          {isOpenMenu && <MenuTaskCard OpenMenuHandler={isOpenMenuHandler} />}
        </div>
      </div>
    </>
  );
};

export default CardTask;
