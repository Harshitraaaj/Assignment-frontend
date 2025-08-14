export default function NavItem({ label, link, onClick }) {
  return (
    <li>
      <a href={link} onClick={onClick} className="hover:underline ">
        {label}
      </a>
    </li>
  );
}
