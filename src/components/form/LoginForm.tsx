import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostLogin } from "../../lib/api/post-auth";
import { AuthInputInterface as LoginDataInterface } from "../../types/type";
import clsx from "clsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginDataInterface>({
    email: "",
    password: "",
  });

  const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLoginData({
      ...loginData,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    PostLogin(loginData)
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
        <p className="text-lg font-bold">Login Form</p>
      </div>
      <form onSubmit={onSubmitHandler} className="px-6 ">
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
            value={loginData.email}
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
            value={loginData.password}
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
          value={"Login"}
          disabled={isLoading}
        />
      </form>
      <p className="p-6 text-center text-xs text-[#404040]">
        Don't have an account ?
        <Link
          className="underline font-semibold hover:text-blue-600"
          to={"/v1/register"}
        >
          {" "}
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
