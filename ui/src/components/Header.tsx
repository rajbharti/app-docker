const logoUrl = new URL("../assets/images/logo.png", import.meta.url).href;

export default function Header() {
  return (
    <header>
      <a href="/">
        <img src={logoUrl} alt="Tech Book Shop Logo" />
      </a>
    </header>
  );
}
