import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/vitest-setup.ts'],
    testTimeout: 10000,
    coverage: {
      include: ['src/**'],
      exclude: ['src/tests/**', '**/*.d.ts'],
    },
  },
})
