import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDownMenu({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
    
      {open && (
        <ul className="absolute left-0 mt-2 top-8 bg-white text-black shadow-lg  w-56">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                className="block px-4 py-2  hover:bg-gray-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button className="flex items-center gap-1 hover:cursor-pointer hover:underline">
        {label} <ChevronDown size={16} className="hover:cursor-pointer"/>
      </button>
    </li>
  );
}
