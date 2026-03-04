import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Article & Event", href: "/#article" },
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-[260px] h-screen px-12 py-16 flex flex-col z-[100] box-border bg-urban-bg border-r border-urban-border">
      <Link
        href="/"
        className="text-[1.85rem] font-semibold leading-[1.15] mb-[72px] text-urban-accent tracking-[0.02em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Art
        <br />
        for
        <br />
        Well-
        <br />
        Being
      </Link>
      <nav className="flex-1">
        <ul className="list-none p-0 m-0">
          {navItems.map((item) => (
            <li key={item.href} className="mb-6">
              <Link
                href={item.href}
                className="text-[13px] font-medium text-urban-muted hover:text-urban-accent transition-colors duration-200 tracking-[0.2em] uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-px bg-urban-border/60" />
    </aside>
  );
}
