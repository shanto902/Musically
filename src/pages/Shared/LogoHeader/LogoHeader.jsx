
import { useNavigate } from 'react-router-dom';
import logoBlack from '../../../assets/logo-black.svg'
const LogoHeader = () => {
    const navigate = useNavigate();
    return (
       
       <div className=' flex flex-col justify-center items-center'>
             
            <img className='h-[100px] cursor-pointer' src={logoBlack} alt="" onClick={()=> navigate('/')} />
            <h2 className=' font-roundhand text-3xl'>Welcome To Musically</h2>

        </div>
    );
};

export default LogoHeader;