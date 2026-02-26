import { BlobImage } from "./BlobImage";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200";

export function AboutSection({
  imageSrc = DEFAULT_IMAGE,
}: {
  imageSrc?: string;
}) {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center gap-[60px] mt-[150px]"
    >
      <div className="flex-1">
        <p className="text-urban-muted text-xs tracking-[0.3em] uppercase mb-4">
          About this project
        </p>
        <h2 className="text-[2rem] md:text-[2.5rem] font-bold mb-6 leading-tight text-urban-text tracking-tight">
          よく生きていくために。
          <br />
          心身の状態が変化しても、
          <br />
          自由な創作や表現を。
        </h2>
        <p className="leading-[1.9] text-urban-muted text-[15px]">
          「Art for Well-being」は表現とケアとテクノロジーのこれからを考えるプロジェクトです。表現すること、表現に触れること、表現しあうことは、よく生きていくことに必要だとわたしたちは考えています。
        </p>
      </div>
      <BlobImage src={imageSrc} alt="Art for Well-being" />
    </section>
  );
}
