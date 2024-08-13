const Header = ({ name }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header className="flex justify-between font-semibold text-4xl pb-10 px-10">
      <h1 className="text-black">
        Hello {name},{" "}
        <span className="text-gray-500">let's start planning for today</span>
      </h1>
      <div className="flex gap-x-3 text-base items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={handleLogout}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        <p>Logout</p>
      </div>
    </header>
  );
};
export default Header;
