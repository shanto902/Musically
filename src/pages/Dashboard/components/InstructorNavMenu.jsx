import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdOutlineClass } from 'react-icons/md';
import useMyClasses from "../../../hooks/useMyClasses";

const InstructorNavMenu = () => {
    const { myClasses } = useMyClasses();
  return (
    <>
      <li>
        <NavLink to="/dashboard/add-class">
          {" "}
          <AiOutlineFileAdd /> Add a Class 
        
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-classes">
          <MdOutlineClass /> My Classes 
          <span className="badge">{myClasses ? myClasses.length : "0"}</span>
        </NavLink>
      </li>
    </>
  );
};

export default InstructorNavMenu;
