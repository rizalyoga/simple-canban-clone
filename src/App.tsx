import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import MainPage from "./components/pages/MainPage";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "v1/login",
      element: <LoginPage />,
    },
    {
      path: "v1/register",
      element: <RegisterPage />,
    },
    {
      path: "v1/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <div className="bg-light_background dark:bg-dark_background transition">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
