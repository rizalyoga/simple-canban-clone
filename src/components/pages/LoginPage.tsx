import { useEffect } from "react";
import LoginForm from "../form/LoginForm";
import { useNavigate } from "react-router";
import { getToken as token } from "../../lib/api/get-token";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/v1/dashboard");
    }
  }, [navigate]);

  return (
    <section className="min-h-screen flex justify-center items-center bg-slate-100">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
