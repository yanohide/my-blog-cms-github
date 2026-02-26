import Image from "next/image";

type BlobImageProps = {
  src: string;
  alt?: string;
};

export function BlobImage({ src, alt = "" }: BlobImageProps) {
  return (
    <div className="flex-1 relative">
      <div className="relative w-full h-[400px] overflow-hidden urban-card">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* 都会的アクセント - 細いライン */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-urban-accent/50"
        aria-hidden
      />
    </div>
  );
}
