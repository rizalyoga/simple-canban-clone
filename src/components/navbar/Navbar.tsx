import clsx from "clsx";

const Navbar = () => {
  const logoutHandler = () => {
    sessionStorage.clear();
    window.location.href = "/v1/login";
  };

  return (
    <nav className="h-16 bg-neutral-10 border-b-2 border-b-neutral-40 flex items-center justify-center">
      <div className="w-full mx-6 flex justify-between items-center">
        <div className="left-content flex justify-center items-center gap-[10px]">
          <p className="font-bold text-lg text-start">Product Roadmap</p>
          <button className="bg-primary_main text-white text-xs text-center font-bold leading-5 rounded-lg transition duration-[.2s] px-4 py-1 hover:bg-primary_border">
            <span className="font-extrabold text-sm">+</span> Add New Group
          </button>
        </div>
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
