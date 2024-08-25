import { useState } from "react";
import { Link } from "react-router-dom";
import { PostRegister } from "../../lib/api/post-auth";
import { RegisterInterface } from "../../types/type";
import clsx from "clsx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterForm = () => {
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
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

  const onShowPasswordHandler = (
    style: string,
    typeInput: "password" | "confirm-password"
  ) => {
    const isVisible =
      typeInput === "password" ? isShowPassword : isShowConfirmPassword;

    return isVisible ? (
      <AiFillEyeInvisible
        onClick={() => showPasswordVisible(typeInput)}
        className={style}
      />
    ) : (
      <AiFillEye
        onClick={() => showPasswordVisible(typeInput)}
        className={style}
      />
    );
  };

  const showPasswordVisible = (typeInput: "password" | "confirm-password") => {
    if (typeInput === "password") {
      setIsShowPassword((visible) => !visible);
    } else {
      setIsShowConfirmPassword((visible) => !visible);
    }
  };

  return (
    <div className="modal-container-style">
      <div className="head-form p-6">
        <p className="title-form-style">Register Form</p>
      </div>
      <form onSubmit={onSubmitHandler} className="px-6">
        <div className="email-form-input div-input-style">
          <label className="label-form-style" htmlFor="name">
            Name
          </label>
          <input
            className="input-form-style"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="email-form-input div-input-style">
          <label className="label-form-style" htmlFor="email">
            Email
          </label>
          <input
            className="input-form-style"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={onChageHandler}
            required
          />
        </div>
        <div className="password-form-input div-input-style">
          <label className="label-form-style" htmlFor="password">
            Password
          </label>
          <span className="relative flex">
            <input
              className="input-form-style w-full"
              type={isShowPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              onChange={onChageHandler}
              required
            />
            {onShowPasswordHandler(
              "absolute text-xl mt-2 text-neutral-70 mr-2 right-0 cursor-pointer",
              "password"
            )}
          </span>
        </div>
        <div className="password-form-input div-input-style">
          <label className="label-form-style" htmlFor="password_confirmation">
            Confirm Password
          </label>
          <span className="relative flex">
            <input
              className="input-form-style w-full"
              type={isShowConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              id="password_confirmation"
              placeholder="password confirmation"
              onChange={onChageHandler}
              required
            />
            {onShowPasswordHandler(
              "absolute text-xl mt-2 text-neutral-70 mr-2 right-0 cursor-pointer",
              "confirm-password"
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
