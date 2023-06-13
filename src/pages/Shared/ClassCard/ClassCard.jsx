import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";

const ClassCard = ({ classItem }) => {
  const { user } = useAuthentication();
  const [secureAxios] = useSecureAxios();
  const [isStudent, isLoading] = useUserRole();

  const navigate = useNavigate();

  const handleBuy = async (classItem) => {
    if (isLoading) {
      return; // Do nothing if data is still loading
    }

    if (!user) {
      Swal.fire({
        title: "Please Login to enroll in class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }

    if (!isStudent) {
      Swal.fire({
        title: "Only students can enroll in this class",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    const selectedClass = {
      classId: classItem._id,
      email: user.email,
      name: classItem.nameOfClass,
      image: classItem.classImage,
      price: classItem.price,
      seats: classItem.availableSeats,
    };

    try {
      const res = await secureAxios.post("/classes/select", selectedClass);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added to Dashboard",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle the error if needed
      console.error("Failed to enroll in class:", error);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={classItem.classImage} alt="Class" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{classItem.name}</h2>
        { !isLoading && user ? (
          isStudent ? (
            <button
              className="btn"
              disabled={isLoading}
              onClick={() => handleBuy(classItem)}
            >
              {isLoading ? "Loading..." : "Buy"}
            </button>
          ) : (
            <p>Only students can enroll in this class</p>
          )
        ) : (
          <button className="btn" onClick={() => navigate("/auth/login")}>
            Login to Enroll
          </button>
        )}
        <p>{classItem.instructorName}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{classItem.availableSeats}</div>
          <div className="badge badge-outline">$ {classItem.price}</div>
          <div className="badge badge-outline">{classItem.location}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
