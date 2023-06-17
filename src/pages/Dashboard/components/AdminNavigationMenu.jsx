import { NavLink } from "react-router-dom";
import { BiChalkboard, BiGroup } from "react-icons/bi";
import useUsers from "../../../hooks/useUsers";
import useAllClasses from "../../../hooks/useAllClasses";

const AdminNavigationMenu = () => {
  const [allClasses] = useAllClasses();
  const [users] = useUsers();
  return (
    <>
      <li>
        <NavLink to="/dashboard/manage-classes">
          <BiChalkboard /> Manage Classes
          <span className="badge">{allClasses ? allClasses.length : "0"}</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-users">
          <BiGroup /> Manage Users
          <span className="badge">{users ? users.length : "0"}</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminNavigationMenu;
