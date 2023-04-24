const logoUrl = new URL("../assets/images/logo.png", import.meta.url).href;

export default function Header() {
  return (
    <header className="p-2 bg-[#182ac0] rounded-t-2xl shadow-lg">
      <a href="/">
        <img src={logoUrl} alt="Tech Book Shop Logo" className="mx-auto" />
      </a>
    </header>
  );
}
