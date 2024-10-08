import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PostLogin } from "../../lib/api/post-auth";
import { AuthInputInterface as LoginDataInterface } from "../../types/type";
import clsx from "clsx";

const LoginForm = () => {
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
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
        sessionStorage.setItem("auth_token", JSON.stringify(result.data.jwt));
        sessionStorage.setItem(
          "user_data",
          JSON.stringify({
            user_id: result.data.user_id,
            name: result.data.name,
            email: result.data.email,
          })
        );
        setTimeout(() => {
          window.location.href = "/v1/dashboard";
        }, 500);
      })
      .catch((err) => {
        setIsErrorMessage("Error : Please check your data again");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onShowPasswordHandler = (style: string) => {
    return !isShowPassword ? (
      <AiFillEye onClick={showPasswordVisible} className={style} />
    ) : (
      <AiFillEyeInvisible onClick={showPasswordVisible} className={style} />
    );
  };

  const showPasswordVisible = () => {
    setIsShowPassword((visible) => !visible);
  };

  return (
    <div className="modal-container-style">
      <div className="head-form p-6">
        <p className="title-form-style">Login Form</p>
      </div>
      <form onSubmit={onSubmitHandler} className="px-6">
        <div className="email-form-input div-input-style">
          <label className="text-neutral-90 font-bold text-xs" htmlFor="email">
            Email
          </label>
          <input
            className="input-form-style"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={loginData.email}
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="password-form-input div-input-style">
          <label
            className="text-neutral-90 font-bold text-xs"
            htmlFor="password"
          >
            Password
          </label>
          <span className="relative flex">
            <input
              className="input-form-style w-full"
              type={isShowPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              value={loginData.password}
              onChange={onChageHandler}
              required
            />
            {onShowPasswordHandler(
              "absolute text-xl mt-2 text-neutral-70 mr-2 right-0 cursor-pointer"
            )}
          </span>
        </div>
        <p className="text-xs text-red-500 mb-6">{isErrorMessage}</p>
        <input
          className={clsx(
            "w-full text-neutral-10 font-submit-btn-style",
            isLoading
              ? "bg-slate-400 cursor-progress"
              : "bg-primary_main hover:bg-primary_border"
          )}
          type="submit"
          value={isLoading ? "Please wait..." : "Login"}
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
