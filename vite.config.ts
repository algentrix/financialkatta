import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

/** Serve dist/<route>/index.html for the canonical path, before the SPA fallback. */
function prerenderedRoutes(): Plugin {
  return {
    name: 'prerendered-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url
        if (!raw || raw === '/') return next()
        const queryAt = raw.indexOf('?')
        const pathname = queryAt === -1 ? raw : raw.slice(0, queryAt)
        const search = queryAt === -1 ? '' : raw.slice(queryAt)
        if (
          !pathname.startsWith('/') ||
          pathname.endsWith('/') ||
          pathname.includes('.') ||
          pathname.includes('..') ||
          pathname.includes('%')
        ) {
          return next()
        }
        const distDir = join(server.config.root, server.config.build.outDir)
        const file = join(distDir, pathname.slice(1), 'index.html')
        if (existsSync(file)) req.url = `${pathname}/index.html${search}`
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [prerenderedRoutes(), react()],
})
