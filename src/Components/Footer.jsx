import { Facebook, Instagram, X as Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0d1b3d] to-[#261873] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">UDYAM REGISTRATION</h2>
          <p>Ministry of MSME</p>
          <p>Udyog bhawan - New Delhi</p>
          <p className="mt-3">
            <span className="font-bold">Email:</span> champions@gov.in
          </p>
          <p className="mt-3 font-semibold">Contact Us</p>
          <p className="font-semibold">For Grievances / Problems</p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">› CHAMPIONS</li>
            <li className="flex items-center gap-2">› MSME Samadhaan</li>
            <li className="flex items-center gap-2">› MSME Sambandh</li>
            <li className="flex items-center gap-2">› MSME Dashboard</li>
            <li className="flex items-center gap-2">
              › Entrepreneurship Skill Development Programme (ESDP)
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Video</h3>
          <div className="aspect-video bg-black overflow-hidden">
            <video
              className="w-full h-full"
              src="https://res.cloudinary.com/dg0orrbeb/video/upload/v1755038216/udyam_v5480u.mp4"
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/30 max-w-7xl mx-auto"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-center md:text-left">
        <p>
          © Copyright<span className="font-semibold">Udyam Registration.</span>{" "}
          All Rights Reserved, Website Content Managed by Ministry of Micro Small and Medium Enterprises, GoI<br />
          Website hosted & managed by National Informatics Centre, Ministry of Communications and IT, Government of India

        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-300"><Twitter /></a>
          <a href="#" className="hover:text-gray-300"><Facebook /></a>
          <a href="#" className="hover:text-gray-300"><Instagram /></a>
        </div>
      </div>
    </footer>
  );
}
