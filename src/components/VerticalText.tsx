export function VerticalText({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-[60px] right-[60px] text-sm font-medium tracking-[0.3em] leading-[2.2] text-urban-muted"
      style={{ writingMode: "vertical-rl" }}
    >
      {children}
    </div>
  );
}
