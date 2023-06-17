import useEnrolledClass from "../../../hooks/useEnrolledClass";


const EnrolledClass = () => {
    const [enrolledClasses, loading] = useEnrolledClass()

    return (
        <div>
           

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className="hidden md:table-cell">#</th>
        <th className="hidden md:table-cell">Picture</th>
        <th>Class Name</th>
        <th>Instructor Name & Email</th>
        <th className="hidden md:table-cell">Seat Available</th>
        <th>Enrolled Student</th>
      </tr>
      {!loading &&
                enrolledClasses.map((thisClass, index) => (
                  <tr key={thisClass._id}>
                     <td className="hidden md:table-cell">{index + 1}</td>
                     <td className="hidden md:table-cell">
                      <div className="avatar">
                        <div className="w-14 rounded-xl">
                          <img src={thisClass.classImage} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="md:hidden avatar flex flex-col gap-2 justify-center items-center ">
                        <div className="w-14 rounded-xl">
                          <img src={thisClass.classImage} />
                        </div>
                        <span className="text-center">
                          {thisClass.nameOfClass}
                        </span>
                      </div>
                      <span className="hidden md:block">{thisClass.nameOfClass}</span>
                    </td>
                    <td className="table-cell">
                      <div className="font-bold">
                        {thisClass.instructorName}
                      </div>
                      <div className="text-sm opacity-50">
                        {thisClass.instructorEmail}
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      {thisClass.availableSeats}
                    </td>
                    <td className="table-cell text-end">
                      {thisClass.enrolled}
                    </td>
                     </tr>
     )) }
     
    </thead>
  </table>
</div>
        </div>
    );
};

export default EnrolledClass;