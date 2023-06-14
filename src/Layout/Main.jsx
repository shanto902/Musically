import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import imageBg from '../assets/footerImageBg.png'

const Main = () => {
    return (
        <div className="max-w-[1920px] mx-auto font-skia">
            <Header />
            <Outlet />
            <img className="w-full" src={imageBg} alt="" />
            <Footer />
        </div>
    );
};

export default Main;