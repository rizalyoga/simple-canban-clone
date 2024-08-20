import clsx from "clsx";
import Checklist from "../../assets/icons/checklist.png";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="progress-content flex gap-3 justify-center items-center w-full">
      <div className="w-full bg-neutral-30 rounded-full h-4 ">
        <div
          className={clsx(
            "h-4 rounded-full",
            progress < 100 ? "bg-primary_main" : "bg-success_main"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-neutral-70 text-xs leading-4 font-normal font-sans">
        {progress < 100 ? (
          `${progress}%`
        ) : (
          <img src={Checklist} alt="checklist" className="w-[18px] h-4" />
        )}
      </span>
    </div>
  );
};

export default ProgressBar;
