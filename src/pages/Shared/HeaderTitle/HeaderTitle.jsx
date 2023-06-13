import arrow from "../../../assets/arrow.svg";
const HeaderTitle = ({title}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <h2 className=" font-roundhand text-5xl">{title}</h2>
      <img src={arrow} alt="" />
    </div>
  );
};

export default HeaderTitle;
