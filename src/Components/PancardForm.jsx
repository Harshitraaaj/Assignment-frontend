import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PanForm() {
  const [formData, setFormData] = useState({
    organisation: "",
    pan: "",
    panname: "",
    dob: "",
    consent: false,
    pincode: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    organisation: "",
    pan: "",
    panname: "",
    dob: "",
    consent: "",
    pincode: "",
  });

  const [panButton, setPanButton] = useState(true);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "pan") {
      // PAN Format: 5 letters, 4 digits, 1 letter
      const upperValue = value.toUpperCase();
      const panRegex = /^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/;
      if (panRegex.test(upperValue) || upperValue === "") {
        setFormData({ ...formData, [name]: upperValue });
      }
      if (errors.pan && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(upperValue)) {
        setErrors({ ...errors, pan: "" });
      }
    } else if (name === "pincode") {
      setFormData({ ...formData, pincode: value });

      // Auto-fetch city when pincode is 6 digits
      if (/^\d{6}$/.test(value)) {
        try {
          const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
          const data = res.data;
          if (data[0].Status === "Success") {
            setFormData((prev) => ({ ...prev, city: data[0].PostOffice[0].District }));
          } else {
            setFormData((prev) => ({ ...prev, city: "" }));
          }
        } catch (err) {
          console.error("Pincode API error:", err);
          setFormData((prev) => ({ ...prev, city: "" }));
        }
      } else {
        setFormData((prev) => ({ ...prev, city: "" }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      organisation: "",
      pan: "",
      panname: "",
      dob: "",
      consent: "",
      pincode: "",
    };

    if (!formData.organisation.trim()) {
      newErrors.organisation = "Organisation type is required";
      valid = false;
    }

    if (!formData.pan) {
      newErrors.pan = "PAN number is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format";
      valid = false;
    }

    if (!formData.panname.trim()) {
      newErrors.panname = "PAN holder name is required";
      valid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to the declarations.";
      valid = false;
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
      valid = false;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePanSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3000/PanValidation/Validate", {
        panNumber: formData.pan,
        organisation: formData.organisation,
        panHolderName: formData.panname,
        dob: formData.dob,
        pincode: formData.pincode,
        city: formData.city,
      });

      if (res.data.success) {
        setPanButton(false);
      } else {
        alert(res.data.message || "PAN validation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 mt-3">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200">
          <div className="bg-green-600 text-white font-medium px-4 py-3">
            PAN Verification
          </div>

          <form onSubmit={handlePanSubmit}>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Organisation */}
                <div>
                  <label className="block font-semibold mb-2">
                    3. Type of Organisation / संगठन के प्रकार
                  </label>
                  <select
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className={`w-full border ${errors.organisation ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  >
                    <option value="">-- Select Organisation Type --</option>
                    <option value="proprietorship">Proprietorship Firm / एकल स्वामित्व</option>
                    <option value="partnership">Partnership Firm / साझेदारी</option>
                    <option value="privateLimited">Private Limited Company</option>
                    <option value="publicLimited">Public Limited Company</option>
                    <option value="onePerson">One Person Company</option>
                    <option value="section8">Section 8 Company</option>
                    <option value="llp">Limited Liability Partnership (LLP)</option>
                    <option value="cooperative">Co-operative Society</option>
                    <option value="trust">Trust</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.organisation && (
                    <p className="text-red-500 text-sm mt-1">{errors.organisation}</p>
                  )}
                </div>

                {/* PAN */}
                <div>
                  <label className="block font-semibold mb-2">4.1 PAN / पैन</label>
                  <input
                    name="pan"
                    type="text"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="Your PAN No."
                    className={`w-full border ${errors.pan ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.pan && (
                    <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
                  )}
                </div>

                {/* PAN Name */}
                <div>
                  <label className="block font-semibold mb-2">4.1.1 Name of PAN Holder / पैन धारक का नाम</label>
                  <input
                    name="panname"
                    type="text"
                    value={formData.panname}
                    onChange={handleChange}
                    placeholder="PAN Holder Name"
                    className={`w-full border ${errors.panname ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.panname && (
                    <p className="text-red-500 text-sm mt-1">{errors.panname}</p>
                  )}
                </div>

                {/* DOB */}
                <div>
                  <label className="block font-semibold mb-2">4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निर्माण तिथि</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full border ${errors.dob ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block font-semibold mb-2">Pincode</label>
                  <input
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Pincode"
                    className={`w-full border ${errors.pincode ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block font-semibold mb-2">City</label>
                  <input
                    name="city"
                    type="text"
                    value={formData.city}
                    readOnly
                    placeholder="City will be auto-filled"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-2">
                <input
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  className={`mt-1 w-4 h-4 text-blue-600 ${errors.consent ? "border-red-500" : ""
                    }`}
                />
                <div>
                  <p className="text-sm">
                    I, the holder of the above PAN, hereby give my consent to Ministry of MSME, Government of India, for using my data/information available in the Income Tax Returns filed by me, and also the same available in the GST Returns and also from other Government organizations, for MSME classification and other official purposes, in pursuance of the MSMED Act, 2006.
                  </p>
                  {errors.consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                  )}
                </div>
              </div>
              {panButton && <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded shadow transition-colors duration-200 cursor-pointer"
                >
                  Validate PAN
                </button>
              </div>}
              {/* Submit Button */}

              {!panButton && <div className="my-10 p-2">
                <p className="text-green-700 text-md font-bold my-2">Your PAN has been successfully verified. Some fields of the form will be
                  disabled. Disabled fields will be automatically filled after verification from PAN data.
                  GSTIN (As per applicability of CGST Act 2017 and as notified by the ministry of MSME <a href="#">vide S.O. 1055(E) dated 05th March 2021) </a>
                  is required for Udyam Registration w.e.f. 01.04.2021
                  . You are advised to apply for GSTIN suitably to avoid any inconvenience.</p>

                <Link
                  to="/done"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 mt-7 rounded shadow transition-colors duration-200 inline-block text-center"
                >
                  Continue
                </Link>
              </div>}

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
