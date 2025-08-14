import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavItem from "./NavItem";
import DropDownMenu from "./DropDownMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "NIC Code", link: "/about" },
    {
      label: "Useful Documents",
      dropdown: [
        { label: "Important", link: "/documents/important" },
        { label: "Udyam Registration Benefits", link: "/documents/benefits" },
        { label: "Site Highlights", link: "/highlights" },
        { label: "Circulars & Orders", link: "/circular" },
        { label: "Udyam Registration Sample form", link: "/sampleform" },
        { label: "Udyam Registration Bulletin", link: "/bulletin" },
        { label: "Metadata Compliance", link: "/compilance" },
      ],
    },
    {
      label: "Print / Verify",
      dropdown: [
        { label: "Print Udyam Certificate", link: "/print/certificate" },
        { label: "Verify Udyam Registration Number", link: "/print/verify" },
        { label: "Print UAM Certificate", link: "/print/certificate" },
        { label: "Print UAM Application", link: "/print/application" },
        { label: "Verify Udyog Aadhaar", link: "/verifyUdyog" },
        { label: "Forgot Udyam/UAM No.", link: "/forgotUdyam" },

      ],
    },

    {
      label: "Update details",
      dropdown: [
        { label: "Update/Cancel Udyam Registration", link: "/login/officer" },

      ],


    },
    {
      label: "Login",
      dropdown: [
        { label: "Officer's Login", link: "/login/officer" },
        { label: "EFC's Login", link: "/login/efc" },
        { label: "NSSH Officer's Login", link: "/login/nssh" },
        { label: "Udyami Login", link: "/login/udyami" },
      ],


    },

  ];

  return (
    <nav className="bg-[#4436C6] text-white px-6 py-3 flex justify-between lg:justify-around items-center relative">
      {/* Logo */}
      <img src="/MINISTRY_NAME.webp" alt="Logo" className="h-15 w-auto" />

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 ">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <DropDownMenu key={idx} label={item.label} items={item.dropdown} />
          ) : (
            <NavItem key={idx} label={item.label} link={item.link} />
          )
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button className="lg:hidden hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-15 left-1/2 transform -translate-x-1/2 w-[90%] h-[90vh] bg-white text-black rounded-md flex flex-col items-start px-10 gap-6 py-6 lg:hidden shadow-lg z-50">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <details key={idx} className="text-center hover:cursor-pointer">
                <summary>{item.label}</summary>
                <ul>
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <a href={sub.link}  onClick={() => setIsOpen(false)}>
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <NavItem
                key={idx}
                label={item.label}
                link={item.link}
                onClick={() => setIsOpen(false)}
                
              />
            )
          )}
        </ul>
      )}
    </nav>
  );
}
