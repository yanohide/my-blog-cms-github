import { BlobImage } from "./BlobImage";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800";

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
        <h3 className="text-[#777] mb-2">About this project</h3>
        <h2 className="text-[2.5rem] font-bold mb-5 leading-tight">
          よく生きていくために。
          <br />
          心身の状態が変化しても、
          <br />
          自由な創作や表現を。
        </h2>
        <p className="leading-[1.8] mb-5">
          「Art for Well-being」は表現とケアとテクノロジーのこれからを考えるプロジェクトです。表現すること、表現に触れること、表現しあうことは、よく生きていくことに必要だとわたしたちは考えています。
        </p>
      </div>
      <BlobImage src={imageSrc} alt="Art for Well-being" />
    </section>
  );
}
