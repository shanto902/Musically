const Banner = ({ url, title }) => {
  return (
    <div className=" -mt-44 mb-20">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.0) 100%)",
        }}
      ></div>
 <div
  style={{
    backgroundImage: `url('${url}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "75vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <h2 className="mt-24 text-center text-white font-roundhand text-5xl z-50 drop-shadow-xl">{title}</h2>
</div>

    </div>
  );
};

export default Banner;
