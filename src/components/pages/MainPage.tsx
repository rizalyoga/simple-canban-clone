import { useEffect } from "react";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/v1/login");
  }, [navigate]);

  return <div></div>;
};

export default MainPage;
