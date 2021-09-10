import Image from "next/image";
import personality from "../public/img/personality.png";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Image src={personality} alt="Personality" width="50" height="46" />
        <h2>
          <a href="#">Personality test</a>
        </h2>
      </div>

      <nav>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contacts</a>
        </li>
      </nav>
    </header>
  );
}
