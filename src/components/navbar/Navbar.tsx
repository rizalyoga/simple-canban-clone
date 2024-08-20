import clsx from "clsx";

const Navbar = () => {
  const logoutHandler = () => {
    sessionStorage.clear();
    window.location.href = "/v1/login";
  };

  return (
    <nav className="h-16 bg-neutral-10 border-b-2 border-b-neutral-40 flex items-center justify-center">
      <div className="w-full mx-6 flex justify-between items-center">
        <p className="font-bold text-lg text-start">Product Roadmap</p>
        <button
          className={clsx(
            "font-submit-btn-style text-neutral-10 bg-danger_main",
            "hover:bg-danger_border hover:text-neutral-100"
          )}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
