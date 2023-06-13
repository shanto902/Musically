import useSelectedClass from "../../hooks/useSelectedClass";

const SelectedClasses = () => {

    const [selectedClass , refetch] = useSelectedClass()
    console.log(selectedClass)
    return (
        <div>
           
            {
                selectedClass.map(classItem => <p key={classItem._id}>{classItem.name}</p>)
            }
            
        </div>
    );
};

export default SelectedClasses;