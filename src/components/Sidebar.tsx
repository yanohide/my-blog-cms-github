import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Article & Event", href: "/#article" },
];

export function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 w-[250px] h-screen p-10 flex flex-col z-[100] box-border"
      style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif" }}
    >
      <Link href="/" className="text-[2rem] font-bold leading-[1.1] mb-[60px] text-wellbeing-logo">
        Art
        <br />
        for
        <br />
        Well-
        <br />
        Being
      </Link>
      <ul className="list-none p-0 m-0">
        {navItems.map((item) => (
          <li key={item.href} className="mb-5">
            <Link
              href={item.href}
              className="text-xl font-bold text-[#555] hover:text-wellbeing-text transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
