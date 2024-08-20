import { useEffect } from "react";
import { useNavigate } from "react-router";
import RegisterForm from "../form/RegisterForm";
import { getToken as token } from "../../lib/api/get-token";

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/v1/dashboard");
    }
  }, [navigate]);

  return (
    <section className="min-h-screen flex justify-center items-center bg-slate-100">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
