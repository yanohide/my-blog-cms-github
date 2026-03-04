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
      className="flex flex-col md:flex-row items-center gap-16 mt-36"
    >
      <div className="flex-1">
        <p className="text-urban-muted text-[11px] tracking-[0.35em] uppercase mb-5">
          About this project
        </p>
        <h2
          className="text-[2rem] md:text-[2.5rem] font-semibold mb-6 leading-[1.3] text-urban-text tracking-[0.02em]"
          style={{ fontFamily: "var(--font-serif-jp)" }}
        >
          哲学をするために必要な素養
        </h2>
        <p className="leading-[1.95] text-urban-muted text-[15px] tracking-[0.01em]">
          「Art for Well-being」は表現とケアとテクノロジーのこれからを考えるプロジェクトです。表現すること、表現に触れること、表現しあうことは、よく生きていくことに必要だとわたしたちは考えています。
        </p>
      </div>
      <BlobImage src={imageSrc} alt="Art for Well-being" />
    </section>
  );
}
