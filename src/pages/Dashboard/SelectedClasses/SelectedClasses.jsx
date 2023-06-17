import { useNavigate } from "react-router-dom";
import useSelectedClass from "../../../hooks/useSelectedClass";



const SelectedClasses = () => {
  const [selectedClass] = useSelectedClass();
 
  const navigate = useNavigate();

  const handlePay = (id) => {
   
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {selectedClass.map((classItem, index) => (
              <tr key={classItem._id}>
                <th>{index + 1}</th>
                <td>
                    
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img src={classItem.image} />
                    </div>
                  </div>
                </td>
                <td>{classItem.name}</td>
                <td>{classItem.price}</td>
                <td>
                  <button
                    onClick={() => handlePay(classItem._id)}
                    className="btn btn-outline"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
