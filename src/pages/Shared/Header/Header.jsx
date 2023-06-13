import { Link, NavLink} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from "../../../assets/logo.svg"

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
        <NavLink className={' link hover:!link-hover'} style={
          ({ isActive }) => ({
          color: isActive ? '#fff' : '#fff',
          background: isActive ? 'none' : 'none',
          textDecoration: isActive ? "underline" : "none"
    
        })} to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className={' link hover:!link-hover'}
         to="/instructors"
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#fff',
          background: isActive ? 'none' : 'none',
          textDecoration: isActive ? "underline" : "none"
        })}>Instructors</NavLink>
      </li>
      <li>
        <NavLink className={' link !link-hover'}
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#fff',
          background: isActive ? 'none' : 'none',
          textDecoration: isActive ? "underline" : "none"
        })} to="/classes">Classes</NavLink>
      </li>
    </>
  );

  return (
    <nav className="w-full flex justify-center ">
      <div className="navbar h-36 bg-transparent z-10 max-w-6xl border-b-white border-b-2 flex items-end text-w">
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
            <img className="w-20" src={logo} alt="" />
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white font-skia">{menuLinks}</ul>
      </div>
      <div className="navbar-end gap-4 ">
        {user ? (
          <>
          <NavLink to='dashboard' className="btn bg-white font-skia border-0 text-base normal-case hover:bg-[#474545] hover:text-white rounded-2xl">
          Dashboard</NavLink>
            <div className="avatar">
              <div className="w-12 h-12 rounded-full drop-shadow-lg bg-white">
                {user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" />
                )}
              </div>
            </div>
            <button onClick={handleLogOut} className=" btn  bg-[#474545] text-white hover:text-black hover:bg-white font-skia border-0 text-base normal-case rounded-2xl ">
            {" "}
            Log Out
          </button>
          </>
        ) : (
          <>
            <Link className=" btn bg-[#474545] border-0 text-white font-skia text-base hover:text-black hover:border-0" to="/auth/login">
              Login
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Header;
