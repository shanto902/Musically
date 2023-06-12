import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const studentNavOptions = (
    <>
      <li>
        <NavLink to="/dashboard/selected-class">My Selected Classes</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/enrolled-classes">My Enrolled Classes</NavLink>
      </li>
    </>
  );

  const instructorNavOptions = (
    <>
      <li>
        <NavLink to="/dashboard/add-class">Add a Class</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-classes">My Classes</NavLink>
      </li>
    </>
  );

  const adminNavOptions = (
    <>
      <li>
        <NavLink to="/dashboard/manage-classes">Manage Classes</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-users">Manage Users</NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary absolute top-3 left-3 drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {isAdmin
            ? adminNavOptions
            : isInstructor
            ? instructorNavOptions
            : studentNavOptions}
          
            <div className="divider"></div>
            <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/Classes">Classes</NavLink>
      </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
