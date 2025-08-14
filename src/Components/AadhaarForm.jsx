import { useState } from 'react';
import OtpForm from './OtpForm';
import PancardForm from './PancardForm'

export default function AadhaarForm() {
  const [formData, setFormData] = useState({
    aadhaar: '',
    name: '',
    consent: false
  });
  const [errors, setErrors] = useState({
    aadhaar: '',
    name: '',
    consent: ''
  });

  const [serverError, setServerError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpData, setOtpData] = useState(null); // store backend OTP data
  const [otpVerified, setOtpVerified] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'aadhaar') {
      // Allow only digits and limit to 12 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
      setFormData({ ...formData, [name]: digitsOnly });

      // Clear error when user types
      if (errors.aadhaar && digitsOnly.length === 12) {
        setErrors({ ...errors, aadhaar: '' });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      aadhaar: '',
      name: '',
      consent: ''
    };

    // Aadhaar validation
    if (!formData.aadhaar) {
      newErrors.aadhaar = 'Aadhaar number is required';
      valid = false;
    } else if (formData.aadhaar.length !== 12) {
      newErrors.aadhaar = 'Aadhaar must be exactly 12 digits';
      valid = false;
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'required';
      valid = false;
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must Agree Declerations.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://assignment-backend-production-478a.up.railway.app/AadharValidation/Validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setOtpData(data.otp);
        setShowOtpForm(true);
      } else {
        setServerError(
          `1) There is error in Aadhaar Validation/Authentication.\nError Code: ${data.code || 'Unknown'}\n2) ${data.message || 'Your Aadhaar has not been validated hence you cannot register Udyam.'}\n3) Please Visit Your Nearest Aadhaar Enrolment Centre.`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      

      <div className="bg-gray-50 min-h-fit py-10 px-4 mt-3">
        <div className="max-w-6xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200">
            {/* Blue Header */}
            <div className="bg-blue-600 text-white font-medium px-4 py-3">
              Aadhaar Verification With OTP
            </div>

            <form onSubmit={handleSubmit} >
              <div className="p-6 space-y-6">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">
                      1. Aadhaar Number/ आधार संख्या
                    </label>
                    <input
                      name="aadhaar"
                      type="text"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      placeholder="Your Aadhaar No"
                      className={`w-full border ${errors.aadhaar ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      inputMode="numeric"
                      maxLength={12}
                    />
                    {errors.aadhaar && (
                      <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">
                      2. Name of Entrepreneur/ उद्यमी का नाम
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name as per Aadhaar"
                      className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <ul className="flex flex-col justify-start list-disc text-gray-700 text-sm space-y-2 pl-5">
                  <li className="font-semibold">
                    Aadhaar number shall be required for Udyam Registration.
                  </li>
                  <li className="font-semibold">
                    The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of
                    the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).
                  </li>
                  <li className="font-semibold">
                    In case of a Company or a Limited Liability Partnership or a Cooperative Society
                    or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN (As per applicability
                    of CGST Act 2017 and as notified by the ministry of MSME{' '}
                    <a href="#" className="text-blue-600 no-underline font-normal hover:underline">
                      vide S.O. 1055(E) dated 05th March 2021
                    </a> and PAN along with its Aadhaar number.
                  </li>
                </ul>

                {/* Checkbox */}
                <div className="flex items-start space-x-2">
                  <input
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={`mt-1 w-4 h-4 text-blue-600 ${errors.consent ? 'border-red-500' : ''}`}
                  />
                  <div>
                    <p className="text-sm " >
                      I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India,
                      for using my Aadhaar number as allotted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India,
                      have informed me that my Aadhaar data will not be stored/shared.
                      / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।
                    </p>
                    {errors.consent && (
                      <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                    )}
                  </div>
                </div>

                {/* Button */}
                <div>
                  {!showOtpForm && !otpVerified && (
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded shadow transition-colors duration-200 cursor-pointer"
                    >
                      Validate & Generate OTP
                    </button>
                  )}
                </div>





              </div>

              {/* Aadhaar validation error from backend */}
              {serverError && (
                <div className="mt-2 text-red-600 font-semibold whitespace-pre-line mx-5 space-x-2">
                  {serverError}
                </div>
              )}

            </form>

            {/* OTP form appears only after Aadhaar success */}
            {showOtpForm && !otpVerified && (
              <div className="mt-6  pt-6">
                <OtpForm
                  aadhaarData={{ aadharNumber: formData.aadhaar }}
                  otp_G={otpData}
                  onSuccess={() => {
                    setShowOtpForm(false);
                    setOtpVerified(true);
                  }
                  }
                />
              </div>
            )}

            {/* Success message & PAN form */}
                {otpVerified && (
                 
                    <p className="mt-1 mb-9 mx-6 text-green-700 font-bold text-sm ">
                      Your Aadhaar has been successfully verified. You can continue Udyam Registration process.
                    </p>
                   
                  
                )}

          </div>

          {/* Success message & PAN form */}
                {otpVerified && (
                  <div className="mt-4">
                    
                    <PancardForm aadhaarData={{ aadharNumber: formData.aadhaar }} />
                  </div>
                )}

          {/* Bottom Note */}
          <div className="mt-6  whitespace-nowrap w-full" >
            <p
              className="inline-block text-blue-700 text-md font-large text-center w-full font-bold"
              style={{
                animation: 'marquee 40s linear infinite',

              }}
            >
              Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam Registration
            </p>
          </div>


        </div>
      </div>


    </>
  );
}
