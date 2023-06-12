const ClassCard = ({ classItem }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={classItem.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{classItem.name}</h2>
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
