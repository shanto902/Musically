import { NavLink, Outlet } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { BiBookAlt, BiHomeAlt, BiClipboard } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";

import useAuthentication from "../hooks/useAuthentication";
import useAdmin from "../hooks/useAdmin";

import useInstructor from "../hooks/useInstructor";
import AdminNavigationMenu from "../pages/Dashboard/components/adminNavigationMenu";
import InstructorNavMenu from "../pages/Dashboard/components/InstructorNavMenu.Jsx";

const Dashboard = () => {
  const { user, logOut } = useAuthentication();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const studentNavOptions = (
    <>
      <li>
        <NavLink to="/dashboard/selected-class">
          {" "}
          <BiBookAlt /> My Selected Classes
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/enrolled-classes">
          <SiGoogleclassroom /> My Enrolled Classes
        </NavLink>
      </li>
    </>
  );

  

  return (
    <>
      <div className="fixed  z-10 navbar bg-base-200 ">
        <div className="flex-1 ">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-outline top-3 left-3 drawer-button lg:hidden "
          >
            <GiHamburgerMenu />
          </label>
          <p className="px-4 font-skia normal-case text-xl">
            {isAdmin
              ? "Admin Home"
              : isInstructor
              ? "Instructor Home"
              : "Dashboard"}{" "}
            | Musically
          </p>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div className=" flex justify-center items-center gap-3">
              <p className=" font-skia">{user.displayName}</p>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  ">
          <div className="lg:ml-80 mt-16">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul className="fixed menu p-4 w-80 top-16 h-full bg-base-200 text-base-content">
            {isAdmin ? (
              <AdminNavigationMenu />
            ) : isInstructor ? (
              <InstructorNavMenu/>
            ) : (
              studentNavOptions
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <BiHomeAlt /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Instructors">
                {" "}
                <FaChalkboardTeacher /> Instructors
              </NavLink>
            </li>
            <li>
              <NavLink to="/Classes">
                {" "}
                <BiClipboard /> Classes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
