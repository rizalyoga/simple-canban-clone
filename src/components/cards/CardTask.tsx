import { useState } from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import SettingIcon from "../../assets/icons/setting-btn.png";
import SettingIconFocus from "../../assets/icons/setting-btn-focus.png";

const CardTask = ({ progress }: { progress: number }) => {
  const [srcImage, setSrcImage] = useState(SettingIcon);

  return (
    <div className="border-[1px] border-neutral-40 rounded-[4px] flex flex-col gap-2 p-4 bg-neutral-20">
      <p className="font-bold text-sm leading-6 text-neutral-90">
        Re-designed the zero-g doggie bags. No more spills!
      </p>
      <div className="border-[1px] border-dashed border-neutral-40"></div>
      <div className="flex gap-[26px] justify-center items-center">
        <ProgressBar progress={progress} />
        <img
          className="cursor-pointer"
          onMouseEnter={() => setSrcImage(SettingIconFocus)}
          onMouseLeave={() => setSrcImage(SettingIcon)}
          src={srcImage}
          alt="setting-icon"
        />
      </div>
    </div>
  );
};

export default CardTask;