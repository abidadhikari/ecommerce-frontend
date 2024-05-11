import React from "react";
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer(props: any) {
  return <>
  
  <div className="h-[440px] bg-black text-white flex justify-around py-20 font-sans" >
    <div >
      <p className="text-3xl font-medium pb-6">Exclusive</p>
      <p className="text-2xl pb-6">Subscribe</p>
      <p className="pb-4">Get 10% off of your first order</p>
      <form action="" className="relative">
        {/* <input type="email" placeholder="Enter your email" className="text-gray-400 font-light bg-black border border-solid rounded border-gray-400 p-3"/>
       <SendIcon className="ml-[-40px]"/> */}
       <div><input type="email" placeholder="Enter your email" className="text-gray-400 font-light bg-black border rounded border-gray-400 p-3"/></div>
       <div><SendIcon className="absolute bottom-3 right-7"/></div>
      </form>
    </div>
    <div>
      <p className="text-2xl pb-6">Support</p>
      <p className="pb-4">111 Koteshwor, Kathmandu,<br></br> KTM 44600, Nepal</p>
      <p className="pb-4">exclusive@gmail.com</p>
      <p>+88015-88888-9999</p>
    </div>
    <div>
      <p className="text-2xl pb-6">Account</p>
      <p className="pb-4">My Account</p>
      <p className="pb-4">Login / Register</p>
      <p className="pb-4">Cart</p>
      <p className="pb-4">Wishlist</p>
      <p>Shop</p>
    </div>
    <div>
      <p className="text-2xl pb-6">Quick Link</p>
      <p className="pb-4">Privacy Policy</p>
      <p className="pb-4">Terms of Use</p>
      <p className="pb-4">FAQ</p>
      <p>Contact</p>
    </div>
    <div>
      <p className="text-2xl pb-6">Download App</p>
      <p className="text-xs text-gray-300">Save $3 with App New user only</p>
      <div className="flex pt-3">
        <img src="../public/qrcode-default.png" alt="QR-code" className="h-24 w-24" />
        <div className="ml-4">
        <img src="google play.png" alt="googleplay" className="object-cover h-10 w-28 border-2 rounded border-gray-400"/>
        <img src="app store.png" alt="appstore" className="object-cover h-10 w-28 border-2 rounded border-gray-400 mt-4" />
        </div>
      </div>
      <div className="pt-7 flex justify-around">
        <div><FacebookIcon /></div>
        <div><XIcon /></div>
        <div><InstagramIcon /></div>
        <div><LinkedInIcon /></div>
      </div>
    </div>
  </div>
  <div className="bg-black text-gray-700 p-5 border-t border-gray-800 text-center">
     <p> &copy; Copyright Rimel 2024. All right reserved </p>
    </div>
  </>;
}

export default Footer;
