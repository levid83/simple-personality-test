/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/img/personality.png" alt="Personality" height="50" />
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
