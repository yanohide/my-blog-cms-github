import { createClient, type QueryParams } from "next-sanity";

const projectId =
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gr5bitvk").trim();
const dataset =
  (process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production").trim();

if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    "Invalid NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local (e.g. gr5bitvk). " +
      "Only a-z, 0-9 and dashes are allowed."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}) {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
    },
  });
}
