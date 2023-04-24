const logoUrl = new URL("../assets/images/logo.png", import.meta.url).href;

export default function Header() {
  return (
    <header className="rounded-t-2xl bg-[#182ac0] p-2 shadow-lg">
      <a href="/">
        <img src={logoUrl} alt="Tech Book Shop Logo" className="mx-auto" />
      </a>
    </header>
  );
}
