'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemas from '@/sanity/schemas'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gr5bitvk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemas },
})

export default config
