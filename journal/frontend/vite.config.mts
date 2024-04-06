import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [
        react(), 
        viteTsconfigPaths(),
        TanStackRouterVite()
    ],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3001, 
    },
})