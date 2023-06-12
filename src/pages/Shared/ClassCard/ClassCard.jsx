const ClassCard = ({ item }) => {
    console.log(item)
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={item.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.instructorName}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{item.availableSeats}</div>
          <div className="badge badge-outline">$ {item.price}</div>
          <div className="badge badge-outline">{item.location}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
