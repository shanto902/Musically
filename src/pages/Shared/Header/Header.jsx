import { Link, NavLink } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("user logged out");
      })
      .catch((error) => console.log(error));
  };

  const menuLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuLinks}
          </ul>
        </div>
        <Link to="/">
          <span className=" flex items-center justify-center gap-2 text-3xl font-bold">
            <FaMusic /> Vocal Vista
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
          <NavLink to='dashboard' className="btn">
          Dashboard</NavLink>
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" />
                )}
              </div>
            </div>
            <button onClick={handleLogOut} className=" btn btn-ghost uppercase font-extrabold text-xl mx-3 ">
            {" "}
            Log Out
          </button>
          </>
        ) : (
          <>
            <Link className=" btn" to="/auth/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
