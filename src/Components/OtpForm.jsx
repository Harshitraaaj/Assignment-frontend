import { useState } from "react";
import axios from "axios";

export default function OtpForm({ aadhaarData , otp_G , onSuccess }) {
    const [otp, setOtp] = useState("");
    

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/AadharValidation/otpval", {
                aadhaar: aadhaarData?.aadharNumber,
                otp,
            });
            if (res.data.success) {
                onSuccess();
            } else {
                alert(res.data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };
    


    return (
        <form onSubmit={handleOtpSubmit} className="space-y-4 mx-5 p-1">
            <label className="block font-semibold mb-2">
               Enter One Time Password(OTP) Code
            </label>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                className="border border-gray-200 p-2 w-full rounded-md "
            />
            <div className="flex justify-between">
                   <p>OTP has been sent *******978 </p>
                   <span> OTP : {otp_G}</span>
            </div>
         
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mb-8 cursor-pointer"
            >
                Validate
            </button>
            <div className="mx-4 "></div>
            
        </form>


    );


}
