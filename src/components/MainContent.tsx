import { VerticalText } from "./VerticalText";

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="ml-[260px] px-16 py-20 w-[calc(100%-260px)] max-w-[900px] box-border relative min-h-screen">
      <VerticalText>
        表現と
        <br />
        ケアと
        <br />
        テクノロジーの
        <br />
        これから
      </VerticalText>
      {children}
    </main>
  );
}
