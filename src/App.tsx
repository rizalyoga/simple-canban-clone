import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import MainPage from "./components/pages/MainPage";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <div className="bg-light_background dark:bg-dark_background transition">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
