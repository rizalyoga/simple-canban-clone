import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="w-[420px] rounded-[10px] shadow-md border bg-white">
      <div className="head-form p-6">
        <p className="text-lg font-bold">Login Form</p>
      </div>
      <form className="px-6 ">
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
            required
          />
        </div>
        <input
          className="w-full text-white font-bold text-sm bg-[#01959F] px-4 py-2 rounded-lg cursor-pointer"
          type="submit"
          value={"Login"}
        />
      </form>
      <p className="p-6 text-center text-xs text-[#404040]">
        Don't have an account ?
        <Link className="hover:text-blue-600" to={"/register"}>
          {" "}
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
