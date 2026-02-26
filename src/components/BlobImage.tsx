import Image from "next/image";

type BlobImageProps = {
  src: string;
  alt?: string;
};

export function BlobImage({ src, alt = "" }: BlobImageProps) {
  return (
    <div className="flex-1 relative">
      <div className="relative w-full h-[400px] overflow-hidden blob-shape shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* 装飾パーツ - カプセル */}
      <div
        className="absolute w-[60px] h-5 bg-wellbeing-accent-green border-2 border-[#333] rounded-[20px] top-[10%] -left-5 -rotate-[30deg]"
        aria-hidden
      />
      {/* 装飾パーツ - 丸 */}
      <div
        className="absolute w-6 h-6 bg-wellbeing-accent-blue border-2 border-[#333] rounded-full bottom-[10%] -right-2.5"
        aria-hidden
      />
    </div>
  );
}
