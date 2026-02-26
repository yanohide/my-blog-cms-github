export function VerticalText({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-[60px] right-[60px] text-2xl font-bold tracking-[0.2em] leading-[2]"
      style={{ writingMode: "vertical-rl" }}
    >
      {children}
    </div>
  );
}
