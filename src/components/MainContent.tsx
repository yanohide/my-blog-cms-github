import { VerticalText } from "./VerticalText";

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="ml-[250px] p-[60px] w-[calc(100%-250px)] box-border relative min-h-screen">
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
