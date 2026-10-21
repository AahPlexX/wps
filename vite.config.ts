import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import packageMetadata from './package.json' with { type: 'json' }

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
