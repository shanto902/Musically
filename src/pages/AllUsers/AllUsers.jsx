import { useQuery } from "@tanstack/react-query";

import useSecureAxios from "../../hooks/useSecureAxios";

const AllUsers = () => {
  const [secureAxios] = useSecureAxios();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await secureAxios.get("/users");
    return res.data;
  });

  const handleManageUser = async (user, role) => {
  
    try {
      const response = await secureAxios.patch(`/users/${role}/${user._id}`);
      const data = response.data;
  
      if (data.modifiedCount) {
        refetch();
        alert(`${user.name} is now ${role}`);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      // Handle error
    }
  };
  return (
    <div>
      {/* TODO: helmet  */}
      <h3>Total Users:{users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="avatar w-24 h-24 rounded-xl"
                    src={user.picture}
                    alt=""
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "instructor"
                    ? "Instructor"
                    : "Student"}
                </td>
                <td>
                  <div className="flex flex-col gap-2">
                    <button
                      disabled={
                        user.role !== "admin" && user.role !== "student"
                      }
                      onClick={() => {
                        handleManageUser(user, "instructor");
                      }}
                      className="btn btn-outline"
                    >
                      Make Instructor
                    </button>
                    <button
                      disabled={
                        user.role !== "instructor" && user.role !== "student"
                      }
                      onClick={() => {
                        handleManageUser(user, "admin");
                      }}
                      className="btn btn-outline"
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
