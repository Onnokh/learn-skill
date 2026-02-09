import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const previewAllowedHosts = process.env.PREVIEW_ALLOWED_HOSTS
  ? process.env.PREVIEW_ALLOWED_HOSTS.split(',')
      .map((host) => host.trim())
      .filter(Boolean)
  : process.env.COOLIFY_FQDN
    ? [process.env.COOLIFY_FQDN]
    : undefined

const config = defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  preview: previewAllowedHosts
    ? {
        allowedHosts: previewAllowedHosts,
      }
    : undefined,
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
