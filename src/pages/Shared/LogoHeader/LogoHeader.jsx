
import logoBlack from '../../../assets/logo-black.svg'
const LogoHeader = () => {
    return (
       
       <div className=' flex flex-col justify-center items-center'>
             
            <img className='h-[150px]' src={logoBlack} alt="" />
            <h2 className=' font-roundhand text-5xl'>Welcome To Musically</h2>

        </div>
    );
};

export default LogoHeader;