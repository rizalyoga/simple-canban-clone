import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostRegister } from "../../lib/api/post-auth";
import { RegisterInterface } from "../../types/type";
import clsx from "clsx";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterInterface>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRegisterData({
      ...registerData,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    PostRegister(registerData)
      .then((result) => {
        sessionStorage.setItem("auth_token", JSON.stringify(result.auth_token));
        navigate("/v1/dashboard");
      })
      .catch((err) => {
        setIsErrorMessage("Error : Please check your data again");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="w-[420px] rounded-[10px] shadow-md border bg-white mx-2 md:mx-0">
      <div className="head-form p-6">
        <p className="text-lg font-bold">Register Form</p>
      </div>
      <form onSubmit={onSubmitHandler} className="px-6 ">
        <div className="email-form-input flex flex-col gap-2 mb-6">
          <label className="text-[#404040] font-bold text-xs" htmlFor="name">
            Name
          </label>
          <input
            className="font-normal text-xs rounded-lg px-4 py-2 bg-white border-2 border-[#EDEDED]"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="email-form-input flex flex-col gap-2 mb-6">
          <label className="text-[#404040] font-bold text-xs" htmlFor="email">
            Email
          </label>
          <input
            className="font-normal text-xs rounded-lg px-4 py-2 bg-white border-2 border-[#EDEDED]"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="password-form-input flex flex-col gap-2 mb-6">
          <label
            className="text-[#404040] font-bold text-xs"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="font-normal text-xs rounded-lg px-4 py-2 bg-white border-2 border-[#EDEDED]"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="password-form-input flex flex-col gap-2 mb-6">
          <label
            className="text-[#404040] font-bold text-xs"
            htmlFor="password_confirmation"
          >
            Confirm Password
          </label>
          <input
            className="font-normal text-xs rounded-lg px-4 py-2 bg-white border-2 border-[#EDEDED]"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="password confirmation"
            onChange={onChageHandler}
            required
          />
        </div>
        <p className="text-xs text-red-500 mb-6">{isErrorMessage}</p>
        <input
          className={clsx(
            "w-full text-white font-bold text-sm  px-4 py-2 rounded-lg cursor-pointer ",
            isLoading
              ? "bg-slate-400 cursor-progress"
              : "bg-[#01959F] hover:bg-[#43936C]"
          )}
          type="submit"
          value={"Register"}
        />
      </form>
      <p className="p-6 text-center text-xs text-[#404040]">
        Already have an account ?
        <Link
          className="underline font-semibold hover:text-blue-600"
          to={"/v1/login"}
        >
          {" "}
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
