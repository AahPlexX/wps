import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

interface PackageMetadata {
  version: string
}

const packageMetadata = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8'),
) as PackageMetadata

function versionManifestPlugin(version: string): Plugin {
  return {
    name: 'wps-version-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: `${JSON.stringify({ version })}\n`,
      })
    },
  }
}

export default defineConfig({
  base: '/wps/',
  define: {
    __APP_VERSION__: JSON.stringify(packageMetadata.version),
  },
  plugins: [react(), tailwindcss(), versionManifestPlugin(packageMetadata.version)],
  build: {
    rollupOptions: {
      input: ['index.html', 'map/index.html'],
    },
  },
})
