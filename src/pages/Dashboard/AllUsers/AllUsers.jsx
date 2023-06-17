import { Toaster } from "react-hot-toast";
import useUsers from "../../../hooks/useUsers";
import useUserManager from "../../../hooks/userUserManager";
import useAuthentication from "../../../hooks/useAuthentication";

const AllUsers = () => {
  const [users, isLoading] = useUsers();
  const { user: isUser } = useAuthentication();

  const handleManageUser = useUserManager();
  const adminManageClassTableHeader = (
    <>
      <th className="hidden md:block">#</th>
      <th className="hidden md:table-cell">Photo</th>
      <th>Name</th>
      <th>Email</th>
      <th className="hidden md:block">Role</th>
      <th>Action</th>
    </>
  );
  return (
    <div>
      <Toaster position="bottom-left" />
      {/* TODO: helmet  */}
      <div className="">
        <table className="table overflow-hidden">
          <thead>
            <tr>{adminManageClassTableHeader}</tr>
          </thead>
          <tbody>
            {!isLoading &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="hidden md:table-cell">{index + 1}</td>
                  <td className="hidden md:table-cell">
                    <div className="avatar ">
                      <div className="w-14 rounded-xl">
                        <img src={user.picture} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="hidden md:table-cell  text-white">
                    <div className="">
                      {user.role === "admin" ? (
                        <div className="badge bg-cyan-200  text-cyan-700">Admin</div>
                      ) : user.role === "instructor" ? (
                        <div className="badge bg-green-200  text-green-700">Instructor</div>
                      ) : (
                        <div className="badge badge-accent  text-white">
                          Student
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {" "}
                    {user.email === isUser.email ? (
                      <p></p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          disabled={
                            user.role !== "admin" && user.role !== "student"
                          }
                          onClick={() => {
                            handleManageUser(user, "instructor");
                          }}
                          className="btn btn-xs btn-outline"
                        >
                          Instructor
                        </button>

                        <button
                          disabled={
                            user.role !== "instructor" &&
                            user.role !== "student"
                          }
                          onClick={() => {
                            handleManageUser(user, "admin");
                          }}
                          className="btn btn-xs btn-outline"
                        >
                          Admin
                        </button>
                      </div>
                    )}
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
