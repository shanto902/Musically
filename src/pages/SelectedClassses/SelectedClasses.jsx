import { useNavigate } from "react-router-dom";
import useSelectedClass from "../../hooks/useSelectedClass";

const SelectedClasses = () => {

    const [selectedClass , refetch] = useSelectedClass()
    console.log(selectedClass)
    const navigate = useNavigate();

    const handlePay = (id) => {
        console.log(id)
        navigate(`/dashboard/payment/${id}`);
    }
    return (
        <div>
           
            {
                selectedClass.map(classItem => <div className="flex" key={classItem._id}><h2>{classItem.name}</h2>
                <button onClick={()=> handlePay(classItem._id)} className="btn">Pay</button></div>)
            }
            
        </div>
    );
};

export default SelectedClasses;