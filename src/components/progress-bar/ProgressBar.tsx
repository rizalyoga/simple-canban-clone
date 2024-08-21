import clsx from "clsx";
import ChecklistSVG from "../../assets/icons/checklist.svg";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="progress-content flex gap-3 justify-center items-center w-full">
      <div className="w-full bg-neutral-30 rounded-full h-4 ">
        <div
          className={clsx(
            "h-4",
            progress < 100
              ? "bg-primary_main rounded-l-full"
              : "bg-success_main rounded-full"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-neutral-70 text-xs leading-4 font-normal font-sans">
        {progress < 100 ? (
          `${progress}%`
        ) : (
          <img src={ChecklistSVG} alt="checklist" className="w-[18px] h-4" />
        )}
      </span>
    </div>
  );
};

export default ProgressBar;
