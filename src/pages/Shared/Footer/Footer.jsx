
import logo from '../../../assets/logo.svg'

const Footer = () => {
    return (
        <div className='bg-[#17202D] text-white '>
            <footer className="footer max-w-6xl mx-auto p-10 bg-[#17202D] text-white ">
  <div>
    <img src={logo} alt="" />
    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a> 
    <a className="link link-hover">Design</a> 
    <a className="link link-hover">Marketing</a> 
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </div>
  
</footer>

<footer className="footer footer-center p-4 max-w-6xl mx-auto  bg-[#17202D] text-white border-t-2 border-white">
  <div className='w-full flex justify-between'>
    <p>Musically Music School By Ashik Ali Shanto</p>
    <p>Copyright © 2021. All rights reserved.</p>
  </div>
</footer>

        </div>
    );
};

export default Footer;