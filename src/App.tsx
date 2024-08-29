import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import MainPage from "./components/pages/MainPage";
import Dashboard from "./components/pages/Dashboard";
import { ToastProvider } from "./components/toast/ToastContext";
import { Toaster } from "react-hot-toast";

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
    <ToastProvider>
      <div className="bg-light_background dark:bg-dark_background transition">
        <Toaster position="top-center" />
        <RouterProvider router={Router} />
      </div>
    </ToastProvider>
  );
}

export default App;
