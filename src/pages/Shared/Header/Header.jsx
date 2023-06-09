import {  NavLink } from "react-router-dom";

const Header = () => {


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
      {/* {user ? (
        <>
        <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
          <button
            onClick={handleLogOut}
            className=" btn btn-ghost uppercase font-extrabold text-xl mx-3 "
          >
            {" "}
            Log Out
          </button>
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              {user.photoURL ? (
                <img src={user.photoURL} />
              ) : (
                <img src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" />
              )}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  ); */}

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
        <a className="btn btn-ghost normal-case text-xl">Vocal Vista</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </nav>
  );
};

export default Header;
