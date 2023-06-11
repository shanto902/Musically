import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}

    <Outlet />
    <label htmlFor="my-drawer-2" className="btn btn-primary absolute top-3 left-3 drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><Link to="/dashboard">Home</Link></li>
      <li><Link>Reservation</Link></li>
      <li><Link>Payment History</Link></li>
      <li><Link>Add Review</Link></li>
      <li><Link>My Bookings</Link></li>
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;