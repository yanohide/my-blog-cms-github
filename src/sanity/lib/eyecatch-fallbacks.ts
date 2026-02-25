/**
 * アイキャッチ画像が未設定の記事用のフォールバック画像（Unsplash）
 * 文学・エディトリアル風の画像を選定
 */
export const EYECATCH_FALLBACKS = [
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80", // 本・読書
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80", // 図書館
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80", // 本の山
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80", // 窓辺の読書
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80", // 本棚
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=80", // ノートとペン
  "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1200&q=80", // デスク
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80", // 夕暮れの窓
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80", // 本とコーヒー
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80", // 書斎
];

export function getEyecatchFallback(indexOrSlug: number | string): string {
  const index =
    typeof indexOrSlug === "string"
      ? indexOrSlug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
      : indexOrSlug;
  return EYECATCH_FALLBACKS[Math.abs(index) % EYECATCH_FALLBACKS.length];
}
