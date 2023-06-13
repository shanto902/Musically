import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="max-w-[1920px] mx-auto font-skia">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;