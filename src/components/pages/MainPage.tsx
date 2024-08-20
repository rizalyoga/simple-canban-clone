import { useEffect } from "react";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return <div></div>;
};

export default MainPage;
