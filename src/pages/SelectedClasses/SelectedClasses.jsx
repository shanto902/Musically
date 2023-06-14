import { useNavigate } from "react-router-dom";
import useSelectedClass from "../../hooks/useSelectedClass";

const SelectedClasses = () => {

    const [selectedClass ] = useSelectedClass()
    console.log(selectedClass)
    const navigate = useNavigate();

    const handlePay = (id) => {
        console.log(id)
        navigate(`/dashboard/payment/${id}`);
    }
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
      {
                selectedClass.map((classItem, index) => <tr key={classItem._id}>
                    <th>{index+1}</th>
                    <td><img src={classItem.image} alt="" /></td>
                    <td>{classItem.name}</td>
                    <td>{classItem.price}</td>
                    <td><button onClick={()=> handlePay(classItem._id)} className="btn">Pay</button></td>
                  </tr>)
            }

{/* <div className="flex" key={classItem._id}><h2>{classItem.name}</h2>
                <button onClick={()=> handlePay(classItem._id)} className="btn">Pay</button></div> */}
      
      {/* row 2 */}
    
    </tbody>
  </table>
</div>
           
            
            
        </div>
    );
};

export default SelectedClasses;