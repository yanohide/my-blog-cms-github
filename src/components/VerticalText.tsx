export function VerticalText({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-16 right-12 text-[13px] font-medium tracking-[0.35em] leading-[2.4] text-urban-muted/80"
      style={{ writingMode: "vertical-rl", fontFamily: "var(--font-serif-jp)" }}
    >
      {children}
    </div>
  );
}
