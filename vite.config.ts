import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// Two static pages: the game and the founders' ledger. Same styles, same law.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        leaderboard: fileURLToPath(new URL('./leaderboard.html', import.meta.url)),
        agent: fileURLToPath(new URL('./agent.html', import.meta.url)),
      },
    },
  },
})
