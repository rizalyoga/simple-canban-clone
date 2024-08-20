import CardTask from "./CardTask";
import NewTaskIcon from "../../assets/icons/new-task-btn.png";

const CardTaskGroup = () => {
  return (
    <div className="p-4 rounded-[4px] border-[1px] border-primary_main flex flex-col gap-2 bg-primary_surface">
      <span className="label-group py-[2px] px-2 border-[1px] border-primary_main rounded-[4px] w-fit">
        <p className="label-task-group font-normal text-xs leading-5 text-primary_main ">
          Group Task 1
        </p>
      </span>
      <p className="text-xs leading-5 font-bold text-neutral-90">
        January - March
      </p>
      <div className="task-container flex flex-col gap-2">
        <CardTask progress={30} />
        <CardTask progress={100} />
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
