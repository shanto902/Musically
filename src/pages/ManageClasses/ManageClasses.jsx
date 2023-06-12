import useClasses from "../../hooks/useClasses";

const ManageClasses = () => {
  const [classes, isClassLoading] = useClasses();
  return (
    <div>
      {/* TODO: helmet  */}
      <h3>Total Users:{classes.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isClassLoading &&
              classes.map((thisClass, index) => (
                <tr key={thisClass._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="avatar w-24 h-24 rounded-xl"
                      src={thisClass.picture}
                      alt=""
                    />
                  </td>
                  <td>{thisClass.name}</td>
                  <td>{thisClass.instructorName}</td>
                  <td>{thisClass.instructorEmail}</td>
                  <td>{thisClass.availableSeats}</td>
                  <td>{thisClass.price}</td>
                  <td>
                    {thisClass.status === "approved"
                      ? "Approved"
                      : thisClass.status === "denied"
                      ? "Denied"
                      : "Pending"}
                  </td>
                  <td>
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-outline">Approve</button>
                      <button className="btn btn-outline">Deny</button>
                      <button className="btn btn-outline">Send feedback</button>
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

export default ManageClasses;
